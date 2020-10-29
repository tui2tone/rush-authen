import { Entity, Column, Unique, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, AfterLoad, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { getColumnType } from '@utils/database/column-type';

@Entity("roles")
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({
        type: getColumnType('string'),
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