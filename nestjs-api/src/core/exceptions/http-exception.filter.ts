import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Response, Request } from 'express'
import { LoggerService } from '../utils/logger.service'
import { AppException } from './app.exception'
import { Reflector } from '@nestjs/core'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly logger: LoggerService,
        private readonly reflector: Reflector,
    ) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const startTime = process.hrtime()

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        // Get the raw error response
        let errorMessage = 'Internal server error'
        if (exception instanceof HttpException) {
            const response = exception.getResponse()
            errorMessage = typeof response === 'string' ? response : (response as any).message
        }

        const errorResponse = this.formatErrorResponse(exception, status, request)
        const error = errorResponse.error

        const diff = process.hrtime(startTime)
        const latency = (diff[0] * 1e9 + diff[1]) / 1e9

        // Safely get controller name

        const logMessage = {
            timestamp: new Date().toISOString(),
            message: errorResponse.error.message || 'Invalid message',
            service: '',
            controller: '',
            path: request.url,
            query: request.query,
            method: request.method,
            status,
            level: 'error',
            useragent: request.headers['user-agent'],
            ip: request.ip,
            latency,
            length: request.headers['content-length'],
            errorStack: error.stack || '',
            errorId: error.errorId,
            extra: {
                body: request.body,
                errorMessages: JSON.stringify(error.messages || []),
            },
        }

        this.logger.error(`${errorResponse.error.message}`, logMessage, 'ExceptionFilter')

        response.status(status).json({
            statusCode: status,
            errorType: errorResponse.errorType,
            errorId: error.errorId,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: errorMessage,
            error: errorMessage,
            extra: error.extra,
        })
    }

    private formatErrorResponse(exception: unknown, status: number, request: Request) {
        const defaultMessage = 'Internal server error'
        let message: any
        let errorType = 'UnhandledException'
        let errorId = AppException.generateErrorId()
        let extra = { body: request.body || {}, errorMessages: '[]' }

        if (exception instanceof AppException) {
            const errorResponse = exception.getResponse() as any
            errorType = exception.name

            message = {
                message: errorResponse.message,
                errorId: errorResponse.errorId,
                timestamp: errorResponse.timestamp,
                extra: errorResponse.extra || {},
                stack: exception.stack || '',
                messages: [],
            }
        } else if (exception instanceof HttpException) {
            const response = exception.getResponse()
            errorType = exception.name
            const errorMessage = typeof response === 'string' ? response : (response as any).message

            message = {
                message: errorMessage || defaultMessage,
                errorId,
                timestamp: new Date().toISOString(),
                extra: {
                    ...extra,
                    errorMessages: JSON.stringify([errorMessage]),
                },
                stack: exception.stack || '',
            }
        } else if (exception instanceof Error) {
            message = {
                message: exception.message || defaultMessage,
                errorId,
                timestamp: new Date().toISOString(),
                extra,
                stack: exception.stack || '',
                messages: [],
            }
        }

        return {
            statusCode: status,
            errorType,
            error: message,
        }
    }
}
