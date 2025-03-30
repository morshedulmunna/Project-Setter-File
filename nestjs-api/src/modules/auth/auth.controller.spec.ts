import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './application/services/auth.service'
import { HttpException } from '@nestjs/common'

describe('AuthController', () => {
    let controller: AuthController
    let authService: AuthService

    const mockAuthService = {
        register: jest.fn(),
        login: jest.fn(),
        forgotPassword: jest.fn(),
        resetPassword: jest.fn(),
        verifyEmail: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile()

        controller = module.get<AuthController>(AuthController)
        authService = module.get<AuthService>(AuthService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('register', () => {
        it('should register a new user successfully', async () => {
            const registerDto = { email: 'test@test.com', password: 'password123' }
            const expectedResult = {
                id: 1,
                email: registerDto.email,
                isVerified: false,
            }

            mockAuthService.register.mockResolvedValue(expectedResult)

            const result = await controller.register(registerDto)

            expect(result).toBe(expectedResult)
            expect(authService.register).toHaveBeenCalledWith(registerDto.email, registerDto.password)
        })

        it('should throw HttpException when registration fails', async () => {
            const registerDto = { email: 'test@test.com', password: 'password123' }

            mockAuthService.register.mockRejectedValue(new Error('User already exists'))

            await expect(controller.register(registerDto)).rejects.toThrow(HttpException)
        })
    })

    describe('login', () => {
        it('should login user successfully', async () => {
            const loginDto = { email: 'test@test.com', password: 'password123' }
            const expectedResult = { token: 'jwt_token' }

            mockAuthService.login.mockResolvedValue(expectedResult)

            const result = await controller.login(loginDto)

            expect(result).toBe(expectedResult)
            expect(authService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password)
        })

        it('should throw HttpException when login fails', async () => {
            const loginDto = { email: 'test@test.com', password: 'wrong_password' }

            mockAuthService.login.mockRejectedValue(new Error('Invalid password'))

            await expect(controller.login(loginDto)).rejects.toThrow(HttpException)
        })
    })

    describe('forgotPassword', () => {
        it('should process forgot password request successfully', async () => {
            const forgotPasswordDto = { email: 'test@test.com' }

            mockAuthService.forgotPassword.mockResolvedValue(undefined)

            const result = await controller.forgotPassword(forgotPasswordDto)

            expect(result).toEqual({
                message: 'Reset password instructions sent to email',
            })
            expect(authService.forgotPassword).toHaveBeenCalledWith(forgotPasswordDto.email)
        })
    })

    describe('resetPassword', () => {
        it('should reset password successfully', async () => {
            const resetPasswordDto = {
                token: 'reset_token',
                newPassword: 'new_password',
            }

            mockAuthService.resetPassword.mockResolvedValue(undefined)

            const result = await controller.resetPassword(resetPasswordDto)

            expect(result).toEqual({ message: 'Password successfully reset' })
            expect(authService.resetPassword).toHaveBeenCalledWith(resetPasswordDto.token, resetPasswordDto.newPassword)
        })
    })

    describe('verifyEmail', () => {
        it('should verify email successfully', async () => {
            const token = 'verification_token'

            mockAuthService.verifyEmail.mockResolvedValue(undefined)

            const result = await controller.verifyEmail(token)

            expect(result).toEqual({ message: 'Email successfully verified' })
            expect(authService.verifyEmail).toHaveBeenCalledWith(token)
        })
    })
})
