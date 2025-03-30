import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('')
    getWelcome(): any {
        return this.appService.getHello()
    }

    @Get('health')
    checkHealth(): { status: string } {
        return { status: 'ok' }
    }
}
