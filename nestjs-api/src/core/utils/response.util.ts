import { ConfigurationService } from '../config/configuration.service'

/**
 * Generic interface for API responses following REST best practices
 */
export interface ApiResponse<T> {
    status: number
    message: string
    data?: T
    meta: {
        timestamp: string
        response_time: number
        pagination?: {
            currentPage: number
            pageSize: number
            totalItems: number
            totalPages: number
        }
    }
}

export class Response {
    private static startTime: [number, number] // Using hrtime format

    constructor(private readonly configService: ConfigurationService) {}

    static startTimer() {
        this.startTime = process.hrtime() // Store high-resolution start time
    }

    static getResponseTime(): number {
        if (!this.startTime) return 0
        const elapsed = process.hrtime(this.startTime)
        return elapsed[0] * 1e6 + elapsed[1] / 1e3 // Convert to microseconds
    }

    static success<T>(data: T, message = 'Success', status = 200): ApiResponse<T> {
        return {
            status,
            message,
            data,
            meta: {
                timestamp: new Date().toISOString(),
                response_time: this.getResponseTime(),
            },
        }
    }

    static paginate<T>(
        data: T[],
        total: number,
        page: number,
        pageSize: number,
        message = 'Success',
    ): ApiResponse<T[]> {
        return {
            status: 200,
            message,
            data,
            meta: {
                timestamp: new Date().toISOString(),
                response_time: this.getResponseTime(),
                pagination: {
                    currentPage: page,
                    pageSize,
                    totalItems: total,
                    totalPages: Math.ceil(total / pageSize),
                },
            },
        }
    }
}
