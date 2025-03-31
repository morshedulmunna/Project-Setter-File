import { Controller, Get, Res } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

@ApiTags('Root')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): { message: string } {
        return { message: 'FreshBuy API is running' }
    }

    @Get('favicon.ico')
    getFavicon(@Res() res: Response) {
        return res.status(204).send()
    }

    @Get('health')
    checkHealth(): { status: string } {
        return { status: 'ok' }
    }
}
