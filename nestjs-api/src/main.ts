import { NestFactory } from '@nestjs/core'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { AppModule } from './app.module'
import { ConfigurationService } from './core/config/configuration.service'
import { setupSwagger } from './core/config/swagger.config'
import { API_VERSION } from './core/utils/constant'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigurationService)

    app.enableCors({
        origin: ['http://localhost:3000', 'https://api.example.com', 'https://example.com'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })

    // Global prefix
    app.setGlobalPrefix(`/v${API_VERSION}/${configService.apiPrefix}`)

    // Setup Swagger
    setupSwagger(app)

    // Global pipes
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    )

    // // Enable versioning using version from config
    // app.enableVersioning({
    //     type: VersioningType.URI,
    //     defaultVersion: API_VERSION,
    // })

    // Start the application
    const port = configService.port
    await app.listen(port)
    console.log(`Application  is running on: http://localhost:${port}/v${API_VERSION}/${configService.apiPrefix}`)
    console.log(`Swagger is running on: http://localhost:${port}/${configService.apiPrefix}/docs`)
}

bootstrap()
