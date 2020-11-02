import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, AfterLoad } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@projects/schemas/project.entity';
import { getColumnType } from '@utils/database/column-type';

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
        type: getColumnType('string'),
        unique: true
    })
    name: string;

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: getColumnType('string'),
        name: 'client_id'
    })
    clientId: string;

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: getColumnType('string'),
        name: 'client_secret',
        nullable: true
    })
    clientSecret: string;

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: getColumnType('string'),
        name: 'application_type',
        default: 'web',
        nullable: true
    })
    applicationType?: string;

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: getColumnType('string'),
        name: 'token_endpoint_auth_method',
        default: 'none',
        nullable: true
    })
    tokenEndpointAuthMethod?: string;

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: getColumnType('array'),
        name: 'redirect_uris',
        nullable: true
    })
    redirectUris?: string[];

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: getColumnType('array'),
        name: 'grant_types',
        nullable: true
    })
    grantTypes?: string[];

    @Column({
        type: getColumnType('number'),
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