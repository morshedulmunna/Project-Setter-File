import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HttpExceptionFilter } from './core/exceptions/http-exception.filter'
import { ConfigurationModule } from './core/config/configuration.module'
import { LoggerModule } from './core/logger/logger.module'
import { LoggerService } from './core/logger/logger.service'
import { AuthModule } from './modules/auth/auth.module'
import { PostgresDatabaseModule } from './core/database/postgres.module'
import { MongoModule } from './core/database/mongo.module'

@Module({
    imports: [ConfigurationModule, MongoModule, PostgresDatabaseModule, LoggerModule, AuthModule],
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
