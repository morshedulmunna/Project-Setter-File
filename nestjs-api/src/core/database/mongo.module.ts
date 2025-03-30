import { Module, OnApplicationShutdown } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Connection, connect } from 'mongoose'
import { ConfigurationModule } from '../config/configuration.module'
import { ConfigurationService } from '../config/configuration.service'
import { LoggerModule } from '../logger/logger.module'
import { LoggerService } from '../logger/logger.service'

@Module({
    imports: [
        ConfigurationModule,
        LoggerModule,
        MongooseModule.forRootAsync({
            imports: [ConfigurationModule, LoggerModule],
            useFactory: async (configService: ConfigurationService, loggerService: LoggerService) => {
                const uri = configService.mongoUri

                return {
                    uri,
                    connectionFactory: (connection: Connection) => {
                        connection.on('connected', () => {
                            loggerService.log('✅ MongoDB connected successfully', 'MongoDB')
                        })

                        connection.on('error', (error) => {
                            loggerService.error(`MongoDB connection error ❌: ${error.message}`, error, 'MongoDB')
                        })

                        connection.on('disconnected', () => {
                            loggerService.warn('⚠️ MongoDB connection lost', 'MongoDB')
                        })

                        connection.on('reconnected', () => {
                            loggerService.log('🔄 MongoDB reconnected', 'MongoDB')
                        })

                        return connection
                    },
                }
            },
            inject: [ConfigurationService, LoggerService],
        }),
    ],
    exports: [MongooseModule],
})
export class MongoModule implements OnApplicationShutdown {
    constructor(private readonly loggerService: LoggerService) {}

    async onApplicationShutdown() {
        const mongoose = await import('mongoose')

        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close()
            this.loggerService.log('🔴 MongoDB connection closed', 'MongoDB')
        }
    }
}
