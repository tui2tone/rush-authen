import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ClientRedirectUri } from './client-redirect-uri.entity';
import { Project } from '@projects/schemas/project.entity';

export interface ClientDto {
    id?: number,
    name: string,
    clientId: string,
    clientSecret: string,
    projectId: number,
    redirectUris: string[]
}

@Entity("app_clients")
export class Client extends BaseEntity {
    @ApiProperty({
        example: 1
    })
    @PrimaryGeneratedColumn({})
    id?: number;

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
        default: 'web',
        nullable: true
    })
    applicationType?: string;

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: String,
        name: 'token_endpoint_auth_method',
        default: 'none',
        nullable: true
    })
    tokenEndpointAuthMethod?: string;

    @OneToMany(type => ClientRedirectUri, item => item.client, {
        cascade: true
    })
    redirectUris: ClientRedirectUri[];

    @Column({
        type: Number,
        name: 'project_id',
        nullable: true
    })
    projectId: number;
    @ManyToOne(type => Project)
    @JoinColumn({ name: 'project_id' })
    project?: Project;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt?: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt?: Date;
}