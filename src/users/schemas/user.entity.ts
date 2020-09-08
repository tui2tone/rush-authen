import { Entity, Column, Unique, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, AfterLoad, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity("users")
export class User extends BaseEntity {
    @ApiProperty({
        example: 1
    })
    @PrimaryGeneratedColumn({})
    id: number;

    @ApiProperty({
        example: "abc@gmail.com"
    })
    @Column({
        type: String,
        length: 55,
        unique: true
    })
    email: string;

    @ApiProperty({
        example: "xxxxxxx"
    })
    @Column({
        type: String,
        length: 55,
        unique: true,
        name: 'google_user_id'
    })
    googleUserId: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}