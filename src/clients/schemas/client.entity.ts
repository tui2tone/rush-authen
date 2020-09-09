import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ClientRedirectUri } from './client-redirect-uri.entity';

@Entity("app_clients")
export class Client extends BaseEntity {
    @ApiProperty({
        example: 1
    })
    @PrimaryGeneratedColumn({})
    id: number;

    @ApiProperty({
        example: "web client"
    })
    @Column({
        type: String,
        unique: true
    })
    name: string;

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: String,
        name: 'client_id'
    })
    clientId: string;

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: String,
        name: 'client_secret'
    })
    clientSecret: string;

    @OneToMany(type => ClientRedirectUri, item => item.client, {
        cascade: true
    })
    redirectUris: ClientRedirectUri[];

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}