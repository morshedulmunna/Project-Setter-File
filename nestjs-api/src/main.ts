import { NestFactory } from '@nestjs/core'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { AppModule } from './app.module'
import { ConfigurationService } from './core/config/configuration.service'
import { setupSwagger } from './core/config/swagger.config'
import { LoggerService } from './core/logger/logger.service'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigurationService)

    // Route to handle favicon.ico requests
    app.getHttpAdapter()
        .getInstance()
        .get('/favicon.ico', (_req: any, res: any) => res.status(204).send())

    app.enableCors({
        origin: ['http://localhost:3000', 'https://api.example.com', 'https://example.com'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })

    // Enable versioning
    app.enableVersioning({
        type: VersioningType.URI,
    })

    // Global prefix
    app.setGlobalPrefix(`/${configService.apiPrefix}`)

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

    // Start the application
    const port = configService.port
    await app.listen(port)
    console.log(`Application is running on: http://localhost:${port}/${configService.apiPrefix}`)
    console.log(`Swagger is running on: http://localhost:${port}/${configService.apiPrefix}/docs`)
}

bootstrap()
