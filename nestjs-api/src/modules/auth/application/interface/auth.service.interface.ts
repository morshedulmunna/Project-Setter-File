import { ApiResponse } from 'src/core/utils/response.util'
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from '../../auth.dto'
import { Auth } from '../repositories/postgresql/postgres.entity'

export interface IAuthService {
    register(registerDto: RegisterDto): Promise<ApiResponse<Auth>>

    login(loginDto: LoginDto): Promise<{ token: string }>

    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void>

    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>

    verifyEmail(verifyEmailDto: { token: string }): Promise<void>
}
