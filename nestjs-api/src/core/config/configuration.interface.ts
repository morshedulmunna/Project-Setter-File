export interface PostgresDatabaseConfig {
    host: string
    port: number
    username: string
    password: string
    database: string
    schema: string
    synchronize: boolean
    logging: boolean
    ssl: boolean
    maxConnections: number
    minConnections: number
    retryAttempts: number
    retryDelay: number
}

export interface JwtConfig {
    secret: string
    expiresIn: string
}

export interface SwaggerConfig {
    title: string
    description: string
    version: string
    path: string
}

export interface AppConfig {
    port: number
    nodeEnv: string
    apiPrefix: string
    database: PostgresDatabaseConfig
    jwt: JwtConfig
    swagger: SwaggerConfig
}
