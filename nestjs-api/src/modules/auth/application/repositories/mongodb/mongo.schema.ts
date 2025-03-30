import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Auth extends Document {
    @Prop({ required: true, unique: true })
    email: string

    @Prop()
    password: string

    @Prop()
    resetPasswordToken?: string

    @Prop()
    resetPasswordExpires?: Date
}

export const AuthSchema = SchemaFactory.createForClass(Auth)
