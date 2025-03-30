import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigurationModule } from '../config/configuration.module'
import { ConfigurationService } from '../config/configuration.service'
import { LoggerModule } from '../logger/logger.module'
import { LoggerService } from '../logger/logger.service'
import { DataSource, DataSourceOptions } from 'typeorm'

@Module({
    imports: [
        ConfigurationModule,
        LoggerModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationModule, LoggerModule],
            useFactory: async (
                configService: ConfigurationService,
                loggerService: LoggerService,
            ): Promise<DataSourceOptions> => {
                const dbConfig = configService.database

                return {
                    type: 'postgres',
                    host: dbConfig.host,
                    port: dbConfig.port,
                    username: dbConfig.username,
                    password: dbConfig.password,
                    database: dbConfig.database,
                    schema: dbConfig.schema,
                    synchronize: dbConfig.synchronize,
                    logging: dbConfig.logging,
                    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
                    migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
                    logger: {
                        log: (level: string, message: string) => {
                            // loggerService.log(message, 'PostgreSQL')
                        },
                        logQuery: (query: string) => {
                            // loggerService.debug(`Query: ${query}`, 'PostgreSQL')
                        },
                        logQueryError: (error: string, query: string) => {
                            // loggerService.error(`Query error: ${error}`, { query }, 'PostgreSQL')
                        },
                        logQuerySlow: (time: number, query: string) => {
                            loggerService.warn(`Slow query (${time}ms): ${query}`, 'PostgreSQL')
                        },
                        logMigration: (message: string) => {
                            loggerService.log(`Migration: ${message}`, 'PostgreSQL')
                        },
                        logSchemaBuild: (message: string) => {
                            // loggerService.log(`Schema build: ${message}`, 'PostgreSQL')
                        },
                    },
                }
            },
            dataSourceFactory: async (options) => {
                if (!options) {
                    throw new Error('DataSourceOptions must be provided')
                }
                const dataSource = await new DataSource(options).initialize()
                const loggerService = new LoggerService()
                if (dataSource.isInitialized) {
                    loggerService.log('Database connection established successfully', 'PostgreSQL')
                }
                return dataSource
            },
            inject: [ConfigurationService, LoggerService],
        }),
    ],
    exports: [TypeOrmModule],
})
export class PostgresDatabaseModule {}
