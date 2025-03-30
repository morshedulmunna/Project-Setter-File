import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HttpExceptionFilter } from './core/exceptions/http-exception.filter'
import { ConfigurationModule } from './core/config/configuration.module'
import { DatabaseModule } from './core/database/database.module'
import { LoggerService } from './core/utils/logger.service'
import { AuthModule } from './modules/auth/auth.module'

@Module({
    imports: [ConfigurationModule, DatabaseModule, AuthModule],
    controllers: [AppController],
    providers: [
        AppService,
        LoggerService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
