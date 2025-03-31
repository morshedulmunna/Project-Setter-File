import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common'
import * as winston from 'winston'
import 'winston-daily-rotate-file'

import LokiTransport from 'winston-loki'

@Injectable()
export class LoggerService implements NestLoggerService {
    private logger: winston.Logger

    constructor() {
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'debug',
            format: winston.format.combine(
                winston.format.json({
                    space: 0,
                    deterministic: false,
                }),
            ),
            transports: [
                new winston.transports.DailyRotateFile({
                    dirname: 'logs',
                    filename: 'error-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: '14d',
                }),
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
                }),
                new LokiTransport({
                    host: process.env.LOKI_HOST || 'http://localhost:3100',
                    json: true,
                    labels: {
                        job: 'freshbuy-api',
                        environment: process.env.NODE_ENV || 'development',
                    },
                    format: winston.format.combine(
                        winston.format((info) => {
                            // ✅ Ensure the message is a valid JSON object
                            if (typeof info.message === 'string') {
                                try {
                                    info.message = JSON.parse(info.message) // Convert to object if possible
                                } catch (error) {}
                            }
                            return info
                        })(),
                        winston.format.json(), // Ensure logs are properly formatted
                    ),
                }),
            ],
        })
    }

    log(message: string | Record<string, any>, context?: unknown) {
        this.logger.info(this.formatMessage(message), { context })
    }

    error(message: string | Record<string, any>, trace?: unknown, context?: unknown) {
        this.logger.error(this.formatMessage(message), { trace, context })
    }

    warn(message: string | Record<string, any>, context?: unknown) {
        this.logger.warn(this.formatMessage(message), { context })
    }

    debug(message: string | Record<string, any>, context?: unknown) {
        this.logger.debug(this.formatMessage(message), { context })
    }

    verbose(message: string | Record<string, any>, context?: unknown) {
        this.logger.verbose(this.formatMessage(message), { context })
    }

    private formatMessage(message: string | Record<string, any>): string {
        return typeof message === 'string' ? message : JSON.stringify(message)
    }
}
