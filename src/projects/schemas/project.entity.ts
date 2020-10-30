import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { getColumnType } from '@utils/database/column-type';

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
        type: getColumnType('string'),
        unique: true
    })
    name: string;

    @ApiProperty({
        example: "app1"
    })
    @Column({
        type: getColumnType('string'),
        nullable: true,
    })
    description: string;

    @ApiProperty({
        example: "false"
    })
    @Column({
        type: Boolean,
        name: "is_primary",
        default: false
    })
    isPrimary: boolean;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}