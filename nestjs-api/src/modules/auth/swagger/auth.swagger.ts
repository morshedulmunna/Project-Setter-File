import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Auth } from '../auth.entity'

export const RegisterSwagger = () => {
    return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        ApiOperation({ summary: 'Register a new user' })(target, key, descriptor)
        ApiResponse({
            status: 201,
            description: 'User successfully registered',
            type: Auth,
        })(target, key, descriptor)
        ApiResponse({ status: 400, description: 'Bad request' })(target, key, descriptor)
        ApiBody({
            schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'User email address',
                    },
                    password: {
                        type: 'string',
                        description: 'User password',
                        minLength: 6,
                    },
                },
            },
        })(target, key, descriptor)
    }
}

export const LoginSwagger = () => {
    return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        ApiOperation({ summary: 'Login user' })(target, key, descriptor)
        ApiResponse({ status: 200, description: 'User successfully logged in' })(target, key, descriptor)
        ApiResponse({ status: 401, description: 'Unauthorized' })(target, key, descriptor)
        ApiBody({
            schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'User email address',
                    },
                    password: {
                        type: 'string',
                        description: 'User password',
                    },
                },
            },
        })(target, key, descriptor)
    }
}

export const ForgotPasswordSwagger = () => {
    return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        ApiOperation({ summary: 'Request password reset' })(target, key, descriptor)
        ApiResponse({ status: 200, description: 'Reset password email sent' })(target, key, descriptor)
        ApiResponse({ status: 404, description: 'User not found' })(target, key, descriptor)
        ApiBody({
            schema: {
                type: 'object',
                required: ['email'],
                properties: {
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'User email address',
                    },
                },
            },
        })(target, key, descriptor)
    }
}

export const ResetPasswordSwagger = () => {
    return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        ApiOperation({ summary: 'Reset password with token' })(target, key, descriptor)
        ApiResponse({ status: 200, description: 'Password successfully reset' })(target, key, descriptor)
        ApiResponse({ status: 400, description: 'Invalid or expired token' })(target, key, descriptor)
        ApiBody({
            schema: {
                type: 'object',
                required: ['token', 'newPassword'],
                properties: {
                    token: {
                        type: 'string',
                        description: 'Reset password token',
                    },
                    newPassword: {
                        type: 'string',
                        description: 'New password',
                        minLength: 6,
                    },
                },
            },
        })(target, key, descriptor)
    }
}

export const VerifyEmailSwagger = () => {
    return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        ApiOperation({ summary: 'Verify email address' })(target, key, descriptor)
        ApiResponse({ status: 200, description: 'Email successfully verified' })(target, key, descriptor)
        ApiResponse({ status: 400, description: 'Invalid verification token' })(target, key, descriptor)
    }
}
