import { HttpException, HttpStatus } from '@nestjs/common'

export class AppException extends HttpException {
    constructor(
        message: string,
        statusCode: number = HttpStatus.BAD_REQUEST,
        private readonly extra?: Record<string, any>,
    ) {
        const errorId = AppException.generateErrorId()
        super(
            {
                statusCode,
                message,
                error: 'APP_ERROR',
                errorId,
                timestamp: new Date().toISOString(),
                extra: extra || {},
            },
            statusCode,
        )
    }

    static generateErrorId(): string {
        return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 15)}-${process.pid}-${Math.floor(Math.random() * 1000)}`
    }
}
