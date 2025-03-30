import { Secret } from './../../../../../node_modules/@types/jsonwebtoken/index.d'
import { Injectable, NotFoundException, BadRequestException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Auth } from '../../auth.entity'
import { IAuthService } from '../interface/auth.service.interface'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto'
import { ConfigService } from '@nestjs/config'
import { LoggerService } from 'src/core/utils/logger.service'
import { AppException } from 'src/core/exceptions/app.exception'

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        private readonly configService: ConfigService,
        private readonly logger: LoggerService,
    ) {}

    async register(email: string, password: string): Promise<Auth> {
        const existingUser = await this.authRepository.findOne({
            where: { email },
        })

        if (existingUser) {
            throw new AppException('User already exists', HttpStatus.CONFLICT, { email })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = crypto.randomBytes(32).toString('hex')

        const user = this.authRepository.create({
            email,
            password: hashedPassword,
            verificationToken,
        })

        const savedUser = await this.authRepository.save(user)
        this.logger.log('User registered successfully', { email })
        return savedUser
    }

    async login(email: string, password: string): Promise<{ token: string }> {
        this.logger.log('Attempting login', { email })

        const user = await this.authRepository.findOne({ where: { email } })
        if (!user) {
            this.logger.warn('Login failed - user not found', { email })
            throw new NotFoundException('User not found')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            this.logger.warn('Login failed - invalid password', { email })
            throw new BadRequestException('Invalid password')
        }

        if (!user.isVerified) {
            this.logger.warn('Login failed - email not verified', { email })
            throw new BadRequestException('Email not verified')
        }

        const token = jwt.sign({ userId: user.id }, this.configService.get('JWT_SECRET') || '', {
            expiresIn: '24h',
        })

        this.logger.log('User logged in successfully', { email })
        return { token }
    }

    async forgotPassword(email: string): Promise<void> {
        this.logger.log('Processing forgot password request', { email })

        const user = await this.authRepository.findOne({ where: { email } })
        if (!user) {
            this.logger.warn('Forgot password failed - user not found', { email })
            throw new NotFoundException('User not found')
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetExpires = new Date()
        resetExpires.setHours(resetExpires.getHours() + 1)

        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = resetExpires
        await this.authRepository.save(user)

        this.logger.log('Reset password token generated successfully', { email })
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        this.logger.log('Attempting to reset password')

        const user = await this.authRepository.findOne({
            where: { resetPasswordToken: token },
        })

        if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
            this.logger.warn('Reset password failed - invalid or expired token')
            throw new BadRequestException('Invalid or expired reset token')
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.resetPasswordToken = ''
        user.resetPasswordExpires = new Date(0)
        await this.authRepository.save(user)

        this.logger.log('Password reset successfully', { email: user.email })
    }

    async verifyEmail(token: string): Promise<void> {
        this.logger.log('Attempting to verify email')

        const user = await this.authRepository.findOne({
            where: { verificationToken: token },
        })

        if (!user) {
            this.logger.warn('Email verification failed - invalid token')
            throw new BadRequestException('Invalid verification token')
        }

        user.isVerified = true
        user.verificationToken = ''
        await this.authRepository.save(user)

        this.logger.log('Email verified successfully', { email: user.email })
    }
}
