import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Auth } from './application/repositories/postgresql/postgres.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './application/services/auth.service'
import { LoggerService } from 'src/core/logger/logger.service'
import { ConfigurationService } from 'src/core/config/configuration.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthSchema } from './application/repositories/mongodb/mongo.schema'
import { AuthMongoRepository } from './application/repositories/mongodb/mongo.repository'
import { AuthPostgresRepository } from './application/repositories/postgresql/postgres.repository'
@Module({
    imports: [TypeOrmModule.forFeature([Auth]), MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }])],
    providers: [AuthService, LoggerService, AuthPostgresRepository, AuthMongoRepository, ConfigurationService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
