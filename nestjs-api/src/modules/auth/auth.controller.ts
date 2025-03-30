import { Controller, Post, Body, HttpException, HttpStatus, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './application/services/auth.service'
import {
    RegisterSwagger,
    LoginSwagger,
    ForgotPasswordSwagger,
    ResetPasswordSwagger,
    VerifyEmailSwagger,
} from './swagger/auth.swagger'
import { API_VERSION } from 'src/core/utils/constant'
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './auth.dto'
import { AppException } from 'src/core/exceptions/app.exception'
import { ApiResponse } from 'src/core/utils/response.util'
import { Auth } from './application/repositories/postgresql/postgres.entity'

@ApiTags('Authentication')
@Controller({
    version: API_VERSION,
    path: 'auth',
})
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @RegisterSwagger()
    async register(@Body() registerDto: RegisterDto): Promise<ApiResponse<Auth>> {
        try {
            return await this.authService.register(registerDto)
        } catch (error) {
            throw new AppException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('login')
    @LoginSwagger()
    async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        try {
            return await this.authService.login(loginDto)
        } catch (error) {
            throw new AppException(error.message, HttpStatus.UNAUTHORIZED)
        }
    }

    @Post('forgot-password')
    @ForgotPasswordSwagger()
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
        try {
            await this.authService.forgotPassword(forgotPasswordDto)
            return { message: 'Reset password instructions sent to email' }
        } catch (error) {
            throw new AppException(error.message, HttpStatus.NOT_FOUND)
        }
    }

    @Post('reset-password')
    @ResetPasswordSwagger()
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
        try {
            await this.authService.resetPassword(resetPasswordDto)
            return { message: 'Password successfully reset' }
        } catch (error) {
            throw new AppException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('verify')
    @VerifyEmailSwagger()
    async verifyEmail(@Query('token') token: string): Promise<{ message: string }> {
        try {
            await this.authService.verifyEmail({ token })
            return { message: 'Email successfully verified' }
        } catch (error) {
            throw new AppException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
