import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'
import { AuthService } from './auth.service'
import { Auth } from '../../auth.entity'
import { LoggerService } from 'src/core/utils/logger.service'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

describe('AuthService', () => {
    let service: AuthService
    let repository: Repository<Auth>
    let configService: ConfigService
    let logger: LoggerService

    const mockRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    }

    const mockConfigService = {
        get: jest.fn(),
    }

    const mockLoggerService = {
        log: jest.fn(),
        warn: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(Auth),
                    useValue: mockRepository,
                },
                {
                    provide: ConfigService,
                    useValue: mockConfigService,
                },
                {
                    provide: LoggerService,
                    useValue: mockLoggerService,
                },
            ],
        }).compile()

        service = module.get<AuthService>(AuthService)
        repository = module.get<Repository<Auth>>(getRepositoryToken(Auth))
        configService = module.get<ConfigService>(ConfigService)
        logger = module.get<LoggerService>(LoggerService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('register', () => {
        it('should register a new user successfully', async () => {
            const email = 'test@test.com'
            const password = 'password123'
            const hashedPassword = 'hashedPassword'
            const mockUser = { id: 1, email, password: hashedPassword }

            mockRepository.findOne.mockResolvedValue(null)
            mockRepository.create.mockReturnValue(mockUser)
            mockRepository.save.mockResolvedValue(mockUser)
            jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never)

            const result = await service.register(email, password)

            expect(result).toEqual(mockUser)
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { email } })
            expect(bcrypt.hash).toHaveBeenCalledWith(password, 10)
            expect(mockRepository.create).toHaveBeenCalled()
            expect(mockRepository.save).toHaveBeenCalled()
            expect(logger.log).toHaveBeenCalledWith('User registered successfully', {
                email,
            })
        })

        it('should throw BadRequestException if user already exists', async () => {
            const email = 'test@test.com'
            const password = 'password123'

            mockRepository.findOne.mockResolvedValue({ id: 1, email })

            await expect(service.register(email, password)).rejects.toThrow(BadRequestException)
            expect(logger.warn).toHaveBeenCalledWith('Registration failed - user already exists', { email })
        })
    })

    describe('login', () => {
        it('should login user successfully', async () => {
            const email = 'test@test.com'
            const password = 'password123'
            const hashedPassword = 'hashedPassword'
            const mockUser = {
                id: 1,
                email,
                password: hashedPassword,
                isVerified: true,
            }
            const mockToken = 'jwt_token'

            mockRepository.findOne.mockResolvedValue(mockUser)
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never)
            jest.spyOn(jwt, 'sign').mockReturnValue(mockToken as never)
            mockConfigService.get.mockReturnValue('jwt_secret')

            const result = await service.login(email, password)

            expect(result).toEqual({ token: mockToken })
            expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { email } })
            expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword)
            expect(jwt.sign).toHaveBeenCalled()
            expect(logger.log).toHaveBeenCalledWith('User logged in successfully', {
                email,
            })
        })

        it('should throw NotFoundException if user not found', async () => {
            const email = 'test@test.com'
            const password = 'password123'

            mockRepository.findOne.mockResolvedValue(null)

            await expect(service.login(email, password)).rejects.toThrow(NotFoundException)
            expect(logger.warn).toHaveBeenCalledWith('Login failed - user not found', { email })
        })

        it('should throw BadRequestException if password is invalid', async () => {
            const email = 'test@test.com'
            const password = 'password123'
            const mockUser = {
                id: 1,
                email,
                password: 'hashedPassword',
                isVerified: true,
            }

            mockRepository.findOne.mockResolvedValue(mockUser)
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never)

            await expect(service.login(email, password)).rejects.toThrow(BadRequestException)
            expect(logger.warn).toHaveBeenCalledWith('Login failed - invalid password', { email })
        })

        it('should throw BadRequestException if email is not verified', async () => {
            const email = 'test@test.com'
            const password = 'password123'
            const mockUser = {
                id: 1,
                email,
                password: 'hashedPassword',
                isVerified: false,
            }

            mockRepository.findOne.mockResolvedValue(mockUser)
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never)

            await expect(service.login(email, password)).rejects.toThrow(BadRequestException)
            expect(logger.warn).toHaveBeenCalledWith('Login failed - email not verified', { email })
        })
    })

    describe('forgotPassword', () => {
        it('should process forgot password request', async () => {
            const email = 'test@test.com'
            const mockUser = { id: 1, email }

            mockRepository.findOne.mockResolvedValue(mockUser)

            await service.forgotPassword(email)

            expect(logger.log).toHaveBeenCalledWith('Processing forgot password request', { email })
        })
    })
})
