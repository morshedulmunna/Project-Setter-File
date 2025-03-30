import { IsEmail, IsString, MinLength, Matches, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class EmailDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string
}

export class PasswordDto {
    @ApiProperty({ example: 'Password123!' })
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain uppercase, lowercase, number/special character',
    })
    @IsNotEmpty({ message: 'Password is required' })
    password: string
}

export class RegisterDto extends EmailDto {
    @ApiProperty({ example: 'Password123!' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string
}

export class LoginDto extends RegisterDto {}

export class ForgotPasswordDto extends EmailDto {}

export class ResetPasswordDto {
    @ApiProperty({ example: 'reset-token-xyz' })
    @IsString()
    @IsNotEmpty({ message: 'Token is required' })
    token: string

    @ApiProperty({ example: 'NewPassword123!' })
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain uppercase, lowercase, number/special character',
    })
    @IsNotEmpty({ message: 'New password is required' })
    newPassword: string
}

export interface VerifyEmailDto {
    token: string
}
