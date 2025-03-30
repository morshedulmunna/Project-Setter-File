import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Root')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): { message: string } {
        return { message: 'FreshBuy API is running' }
    }

    @Get('favicon.ico')
    getFavicon(): void {
        return
    }

    @Get('health')
    checkHealth(): { status: string } {
        return { status: 'ok' }
    }
}
