import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AppConfig, PostgresDatabaseConfig, JwtConfig, SwaggerConfig } from './configuration.interface'

@Injectable()
export class ConfigurationService {
    constructor(private configService: ConfigService) {}

    get port(): number {
        return this.configService.get<number>('PORT', 3000)
    }

    get nodeEnv(): string {
        return this.configService.get<string>('NODE_ENV', 'development')
    }

    get apiPrefix(): string {
        return this.configService.get<string>('API_PREFIX', 'api')
    }

    get database(): PostgresDatabaseConfig {
        return {
            host: this.configService.get<string>('DB_HOST', 'localhost'),
            port: this.configService.get<number>('DB_PORT', 5432),
            username: this.configService.get<string>('DB_USERNAME', 'postgres'),
            password: this.configService.get<string>('DB_PASSWORD', 'postgres'),
            database: this.configService.get<string>('DB_DATABASE', 'nest_db'),
            schema: this.configService.get<string>('DB_SCHEMA', 'public'),
            synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE', !this.isProduction),
            logging: this.configService.get<boolean>('DB_LOGGING', this.isDevelopment),
            ssl: this.configService.get<boolean>('DB_SSL', false),
            maxConnections: this.configService.get<number>('DB_MAX_CONNECTIONS', 100),
            minConnections: this.configService.get<number>('DB_MIN_CONNECTIONS', 1),
            retryAttempts: this.configService.get<number>('DB_RETRY_ATTEMPTS', 10),
            retryDelay: this.configService.get<number>('DB_RETRY_DELAY', 3000),
        }
    }

    get typeOrmConfig(): TypeOrmModuleOptions {
        const dbConfig = this.database

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
            ssl: dbConfig.ssl,
            autoLoadEntities: true,
            entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
            // pool: {
            //   max: dbConfig.maxConnections,
            //   min: dbConfig.minConnections,
            // },
            retryAttempts: dbConfig.retryAttempts,
            retryDelay: dbConfig.retryDelay,
        }
    }

    get jwt(): JwtConfig {
        return {
            secret: this.configService.get<string>('JWT_SECRET', 'your-secret-key'),
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '1d'),
        }
    }

    get isDevelopment(): boolean {
        return this.nodeEnv === 'development'
    }

    get isProduction(): boolean {
        return this.nodeEnv === 'production'
    }

    get isTest(): boolean {
        return this.nodeEnv === 'test'
    }

    get swagger(): SwaggerConfig {
        return {
            title: this.configService.get<string>('SWAGGER_TITLE', 'API Documentation'),
            description: this.configService.get<string>('SWAGGER_DESCRIPTION', 'This isAPI documentation'),
            version: this.configService.get<string>('SWAGGER_VERSION', '1.0'),
            path: this.configService.get<string>('SWAGGER_PATH', 'docs'),
        }
    }
}
