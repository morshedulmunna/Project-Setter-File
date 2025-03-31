import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { LoggerService } from '../logger/logger.service'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: LoggerService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const startTime = Date.now()

        res.on('finish', () => {
            const duration = Date.now() - startTime
            const logDetails = {
                method: req.method,
                url: req.originalUrl,
                statusCode: res.statusCode,
                duration: `${duration}ms`,
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                body: req.body,
                query: req.query,
                headers: req.headers,
                params: req.params,
                cookies: req.cookies,
                hostname: req.hostname,
                protocol: req.protocol,
                path: req.path,
            }
            try {
                // this.logger.log(JSON.stringify(logDetails), 'HTTP')
            } catch (error) {
                // this.logger.error('Logger error:', error) // Use logger service for error logging
            }
        })

        next()
    }
}
