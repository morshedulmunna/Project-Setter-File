import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Auth } from './postgres.entity'

@Injectable()
export class AuthPostgresRepository {
    constructor(
        @InjectRepository(Auth)
        private readonly repository: Repository<Auth>,
    ) {}

    async findByEmail(email: string): Promise<Auth | null> {
        return this.repository.findOne({ where: { email } })
    }

    async findByResetToken(token: string): Promise<Auth | null> {
        return this.repository.findOne({ where: { resetPasswordToken: token } })
    }

    async create(data: Partial<Auth>): Promise<Auth> {
        const user = this.repository.create(data)
        return this.repository.save(user)
    }

    async save(user: Auth): Promise<Auth> {
        return this.repository.save(user)
    }
}
