import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Auth } from './mongo.schema'

@Injectable()
export class AuthMongoRepository {
    constructor(
        @InjectModel(Auth.name)
        private readonly model: Model<Auth>,
    ) {}

    async findByEmail(email: string): Promise<Auth | null> {
        return this.model.findOne({ email }).exec()
    }

    async findByResetToken(token: string): Promise<Auth | null> {
        return this.model.findOne({ resetPasswordToken: token }).exec()
    }

    async create(data: Partial<Auth>): Promise<Auth> {
        const user = new this.model(data)
        return user.save()
    }

    async save(user: Auth): Promise<Auth | null> {
        return this.model.findByIdAndUpdate(user._id, user, { new: true }).exec() as Promise<Auth | null>
    }
}
