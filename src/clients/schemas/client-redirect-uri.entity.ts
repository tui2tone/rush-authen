import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from './client.entity';

@Entity("app_client_redirect_uris")
export class ClientRedirectUri extends BaseEntity {
    @ApiProperty({
        example: 1
    })
    @PrimaryGeneratedColumn({})
    id: number;

    @ApiProperty({
        example: "http://localhost:4000/callback"
    })
    @Column({
        type: String,
        nullable: false,
        name: 'redirect_uri'
    })
    redirectUri: string;

    @Column({
        type: Number,
        name: 'client_id',
        nullable: true
    })
    clientId: number;
    @ManyToOne(type => Client, form => form.redirectUris, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'client_id'
    })
    client: Client;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}