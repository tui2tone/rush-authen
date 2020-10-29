import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { getColumnType } from '@utils/database/column-type';
@Entity("settings")
export class Setting extends BaseEntity {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({
        type: getColumnType('string'),
        unique: true
    })
    name: string;

    @Column({
        type: getColumnType('string'),
        name: 'site_url',
        nullable: true
    })
    siteUrl: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}