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
        unique: true
    })
    email: string;

    @ApiProperty({
        example: "Charuwit Nod."
    })
    @Column({
        type: String
    })
    name: string;

    @ApiProperty({
        example: "tui2tone"
    })
    @Column({
        type: String,
        unique: true
    })
    username: string;

    @Column({
        type: String,
        name: "crypted_password"
    })
    cryptedPassword: string;

    @ApiProperty({
        example: "xxxxxxx"
    })
    @Column({
        type: String,
        name: 'google_user_id',
        nullable: true
    })
    googleUserId: string;

    password?: string;
    confirmPassword?: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}