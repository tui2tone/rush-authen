import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, AfterLoad } from 'typeorm';
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

    @Column({
        type: getColumnType('string'),
        name: 'site_name',
        nullable: true
    })
    siteName: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

    redirectUri?: string;

    @AfterLoad()
    setRedirectUri() {
        this.redirectUri = `${this.siteUrl}/auth/handler`
    }
}