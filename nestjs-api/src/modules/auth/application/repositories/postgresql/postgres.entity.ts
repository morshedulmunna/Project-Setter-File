import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { UUID } from 'crypto'

@Entity('auth')
export class Auth {
    @ApiProperty({ description: 'The unique identifier for the auth record' })
    @PrimaryGeneratedColumn('uuid')
    id: UUID

    @ApiProperty({ description: 'The unique email address of the user' })
    @Column({ unique: true })
    email: string

    @ApiProperty({ description: 'The hashed password of the user' })
    @Column()
    password: string

    @ApiProperty({
        description: 'Whether the user email is verified',
        default: false,
    })
    @Column({ default: false })
    isVerified: boolean

    @ApiProperty({ description: 'Token used for password reset', nullable: true })
    @Column({ nullable: true })
    resetPasswordToken: string

    @ApiProperty({
        description: 'Expiration timestamp for password reset token',
        nullable: true,
    })
    @Column({ nullable: true })
    resetPasswordExpires: Date

    @ApiProperty({ description: 'Timestamp when the record was created' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date

    @ApiProperty({ description: 'Timestamp when the record was last updated' })
    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date
}
