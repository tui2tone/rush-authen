import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Unique(['group', 'name'])
@Entity("additional-fields")
export class AdditionalField extends BaseEntity {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({
        type: String
    })
    group: string;

    @Column({
        type: String
    })
    name: string;

    @Column({
        type: String,
        nullable: true
    })
    description: string;

    @Column({
        type: Boolean,
        default: false
    })
    isSynced: boolean;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}