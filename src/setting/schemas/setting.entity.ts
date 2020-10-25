import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity("settings")
export class Setting extends BaseEntity {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({
        type: String,
        unique: true
    })
    name: string;

    @Column({
        type: String,
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