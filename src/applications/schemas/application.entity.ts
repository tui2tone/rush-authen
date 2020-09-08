import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity("applications")
export class Application extends BaseEntity {
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

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}