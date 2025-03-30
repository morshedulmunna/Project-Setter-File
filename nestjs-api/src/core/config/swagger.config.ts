import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigurationService } from './configuration.service'
import { API_VERSION } from '../utils/constant'
import * as fs from 'fs'
import * as yaml from 'js-yaml'
import * as path from 'path'

export function setupSwagger(app: INestApplication): void {
    const configService = app.get(ConfigurationService)
    const swaggerConfig = configService.swagger

    const config = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .setExternalDoc('OpenAPI JSON', `/${configService.apiPrefix}/${swaggerConfig.path}-json`)

        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth',
        )
        .addServer(`http://localhost:5000/`, 'Local server')
        .addServer(`https://api.example.com/`, 'Production server')
        .build()

    const document = SwaggerModule.createDocument(app, config)

    // Generate YAML file
    const yamlDoc = yaml.dump(document)
    const docsPath = path.join(process.cwd(), 'docs')

    if (!fs.existsSync(docsPath)) {
        fs.mkdirSync(docsPath, { recursive: true })
    }

    fs.writeFileSync(path.join(docsPath, 'swagger.yml'), yamlDoc)

    SwaggerModule.setup(`${configService.apiPrefix}/${swaggerConfig.path}`, app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            displayOperationId: true,
            defaultModelsExpandDepth: 3,
            defaultModelExpandDepth: 3,
            docExpansion: 'list',
            showExtensions: true,
            showCommonExtensions: true,
            tryItOutEnabled: true,
        },
        customSiteTitle: swaggerConfig.title,
    })
}
