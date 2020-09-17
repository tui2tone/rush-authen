import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '@users/schemas/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity("app_sessions")
export class Session extends BaseEntity {
    @ApiProperty({
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: Number,
        name: "user_id"
    })
    userId: number;
    @ManyToOne(type => User, item => item.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ApiProperty({
        example: "xxxxx"
    })
    @Column({
        name: 'token',
        type: String,
        length: 100
    })
    token: string;

    @ApiProperty({
        example: "xxxxx"
    })
    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @ApiProperty({
        example: "xxxxx"
    })
    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

}