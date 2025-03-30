import { Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { ConfigurationService } from './configuration.service'

@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env', '.env.local', '.env.development', '.env.production'],
        }),
    ],
    providers: [ConfigurationService],
    exports: [ConfigurationService],
})
export class ConfigurationModule {}
