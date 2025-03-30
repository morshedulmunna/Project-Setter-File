import { Auth } from '../../auth.entity'

export interface IAuthService {
    register(email: string, password: string): Promise<Auth>

    login(email: string, password: string): Promise<{ token: string }>

    forgotPassword(email: string): Promise<void>

    resetPassword(token: string, newPassword: string): Promise<void>

    verifyEmail(token: string): Promise<void>
}
