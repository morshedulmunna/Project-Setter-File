import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AppException } from './core/exceptions/app.exception'
import { Response } from './core/utils/response.util'

@Injectable()
export class AppService {
    getHello(): any {
        return { message: 'Server running.........', timestamp: new Date().toISOString(), status: 'success' }
    }
}
