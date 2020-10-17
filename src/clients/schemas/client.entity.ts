import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ClientRedirectUri } from './client-redirect-uri.entity';
import { Application } from '@applications/schemas/application.entity';

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
        name: 'client_secret',
        nullable: true
    })
    clientSecret: string;

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: String,
        name: 'application_type',
        nullable: true
    })
    applicationType: string;

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: String,
        name: 'token_endpoint_auth_method',
        nullable: true
    })
    tokenEndpointAuthMethod: string;
    
    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: String,
        name: 'client_secret_jwt',
        nullable: true
    })
    clientSecretJwt: string;

    @OneToMany(type => ClientRedirectUri, item => item.client, {
        cascade: true
    })
    redirectUris: ClientRedirectUri[];

    @Column({
        type: Number,
        name: 'application_id'
    })
    applicationId: number;
    @ManyToOne(type => Application)
    @JoinColumn({ name: 'application_id' })
    application: Application;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}