import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AppException } from './core/exceptions/app.exception'
import { Response } from './core/utils/response.util'

@Injectable()
export class AppService {
    getHello(): any {
        // throw new AppException('Testing Error', 800)
        // return Response.success({ message: 'Server running.........' })
        return { message: 'Server running.........', timestamp: new Date().toISOString(), status: 'success' }
    }
}
