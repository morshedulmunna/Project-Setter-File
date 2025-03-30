import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigurationService } from '../config/configuration.service'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigurationService) => ({
                type: 'postgres',
                host: configService.database.host,
                port: configService.database.port,
                username: configService.database.username,
                password: configService.database.password,
                database: configService.database.database,
                schema: configService.database.schema,
                synchronize: configService.database.synchronize,
                logging: configService.database.logging,
                // ssl: configService.database.ssl,
                autoLoadEntities: true,
                entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
            }),
            inject: [ConfigurationService],
        }),
    ],
})
export class DatabaseModule {
    private static instance: DatabaseModule

    constructor() {
        if (DatabaseModule.instance) {
            return DatabaseModule.instance
        }
        DatabaseModule.instance = this
    }

    public static getInstance(): DatabaseModule {
        if (!DatabaseModule.instance) {
            DatabaseModule.instance = new DatabaseModule()
        }
        return DatabaseModule.instance
    }
}
