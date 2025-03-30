import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Auth } from './auth.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './application/services/auth.service'
import { LoggerService } from 'src/core/utils/logger.service'

@Module({
    imports: [TypeOrmModule.forFeature([Auth])],
    providers: [AuthService, LoggerService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
