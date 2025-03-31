import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common'
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
import { LoggerMiddleware } from './core/middlewares/logger.middleware'

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
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).exclude('health', 'metrics').forRoutes('*')
    }
}
