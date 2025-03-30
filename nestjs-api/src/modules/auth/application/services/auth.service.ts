import { Injectable, NotFoundException, BadRequestException, HttpStatus } from '@nestjs/common'
import { IAuthService } from '../interface/auth.service.interface'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto'
import { LoggerService } from 'src/core/logger/logger.service'
import { AppException } from 'src/core/exceptions/app.exception'
import { ApiResponse, Response } from 'src/core/utils/response.util'
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto, VerifyEmailDto } from '../../auth.dto'
import { ConfigurationService } from 'src/core/config/configuration.service'
import { Auth } from '../repositories/postgresql/postgres.entity'
import { AuthPostgresRepository } from '../repositories/postgresql/postgres.repository'
@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private readonly authRepository: AuthPostgresRepository,
        private readonly configService: ConfigurationService,
        private readonly logger: LoggerService,
    ) {}

    async register(registerDto: RegisterDto): Promise<ApiResponse<Auth>> {
        const existingUser = await this.authRepository.findByEmail(registerDto.email)

        if (existingUser) {
            throw new AppException('User already exists', HttpStatus.CONFLICT, { email: registerDto.email })
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10)
        const savedUser = await this.authRepository.create({
            email: registerDto.email,
            password: hashedPassword,
        })

        this.logger.log('User registered successfully', { email: registerDto.email })
        return Response.success(savedUser, 'User registered successfully', HttpStatus.CREATED)
    }

    login(loginDto: LoginDto): Promise<{ token: string }> {
        throw new Error('Method not implemented.')
    }
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        throw new Error('Method not implemented.')
    }
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
        throw new Error('Method not implemented.')
    }
    verifyEmail(verifyEmailDto: { token: string }): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
