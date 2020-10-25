import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity("projects")
export class Project extends BaseEntity {
    @ApiProperty({
        example: 1
    })
    @PrimaryGeneratedColumn({})
    id: number;

    @ApiProperty({
        example: "app1"
    })
    @Column({
        type: String,
        unique: true
    })
    name: string;

    @ApiProperty({
        example: "app1"
    })
    @Column({
        type: String,
        nullable: true,
    })
    description: string;

    @ApiProperty({
        example: "false"
    })
    @Column({
        type: Boolean,
        default: false
    })
    removeable: boolean;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}