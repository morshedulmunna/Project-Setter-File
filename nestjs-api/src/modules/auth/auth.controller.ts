import { Controller, Post, Body, HttpException, HttpStatus, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Auth } from './auth.entity'
import { AuthService } from './application/services/auth.service'
import {
    RegisterSwagger,
    LoginSwagger,
    ForgotPasswordSwagger,
    ResetPasswordSwagger,
    VerifyEmailSwagger,
} from './swagger/auth.swagger'
import { API_VERSION } from 'src/core/utils/constant'

@ApiTags('Authentication')
@Controller({
    version: API_VERSION,
    path: 'auth',
})
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @RegisterSwagger()
    async register(@Body() registerDto: { email: string; password: string }): Promise<Auth> {
        try {
            return await this.authService.register(registerDto.email, registerDto.password)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('login')
    @LoginSwagger()
    async login(@Body() loginDto: { email: string; password: string }): Promise<{ token: string }> {
        try {
            return await this.authService.login(loginDto.email, loginDto.password)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
        }
    }

    @Post('forgot-password')
    @ForgotPasswordSwagger()
    async forgotPassword(@Body() forgotPasswordDto: { email: string }): Promise<{ message: string }> {
        try {
            await this.authService.forgotPassword(forgotPasswordDto.email)
            return { message: 'Reset password instructions sent to email' }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }

    @Post('reset-password')
    @ResetPasswordSwagger()
    async resetPassword(
        @Body() resetPasswordDto: { token: string; newPassword: string },
    ): Promise<{ message: string }> {
        try {
            await this.authService.resetPassword(resetPasswordDto.token, resetPasswordDto.newPassword)
            return { message: 'Password successfully reset' }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('verify')
    @VerifyEmailSwagger()
    async verifyEmail(@Query('token') token: string): Promise<{ message: string }> {
        try {
            await this.authService.verifyEmail(token)
            return { message: 'Email successfully verified' }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
