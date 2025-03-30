import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common'
import * as winston from 'winston'
import 'winston-daily-rotate-file'

@Injectable()
export class LoggerService implements NestLoggerService {
    private logger: winston.Logger

    constructor() {
        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.DailyRotateFile({
                    dirname: 'logs',
                    filename: 'error-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    level: 'error',
                    maxFiles: '14d',
                }),
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
                }),
            ],
        })
    }

    log(message: string, context?: unknown) {
        this.logger.info(message, { context })
    }

    error(message: string, trace?: unknown, context?: unknown) {
        this.logger.error(message, { trace, context })
    }

    warn(message: string, context?: unknown) {
        this.logger.warn(message, { context })
    }

    debug(message: string, context?: unknown) {
        this.logger.debug(message, { context })
    }

    verbose(message: string, context?: unknown) {
        this.logger.verbose(message, { context })
    }
}
