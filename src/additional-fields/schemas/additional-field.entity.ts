import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { getColumnType } from '@utils/database/column-type';

@Unique(['group', 'name'])
@Entity("additional-fields")
export class AdditionalField extends BaseEntity {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({
        type: getColumnType('string')
    })
    group: string;

    @Column({
        type: getColumnType('string')
    })
    name: string;

    @Column({
        type: getColumnType('string'),
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