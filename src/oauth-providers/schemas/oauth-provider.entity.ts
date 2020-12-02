import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { getColumnType } from '@utils/database/column-type';

@Entity("oauth_providers")
export class OAuthProvider extends BaseEntity {
    @ApiProperty({
        example: 1
    })
    @PrimaryGeneratedColumn({})
    id: number;

    @ApiProperty({
        example: "app1"
    })
    @Column({
        type: getColumnType('string'),
        unique: true
    })
    method: string;

    @Column({
        type: getColumnType('string')
    })
    name: string;

    @Column({
        type: getColumnType('string'),
        nullable: true
    })
    authority: string;

    @Column({
        type: getColumnType('string'),
        name: 'redirect_uri',
        nullable: true
    })
    redirectUri: string;

    @Column({
        type: getColumnType('string'),
        name: 'response_type',
        nullable: true
    })
    responseType: string;

    @Column({
        type: getColumnType('string'),
        nullable: true
    })
    scope: string;

    @Column({
        type: getColumnType('boolean'),
        name: 'is_enabled',
        default: false
    })
    isEnabled: boolean;

    @Column({
        type: getColumnType('boolean'),
        name: 'is_supported',
        default: false
    })
    isSupported: boolean;

    @Column({
        type: getColumnType('boolean'),
        name: 'is_passwordless_enabled',
        default: false
    })
    isPasswordlessEnabled: boolean;

    @ApiProperty({
        example: "xxxxxxxxxxxxxxxxxxx"
    })
    @Column({
        type: getColumnType('string'),
        name: 'client_id',
        nullable: true
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
        type: getColumnType('int'),
        name: 'order_no',
        default: 0
    })
    orderNo: number;

    @Column({
        type: getColumnType('boolean'),
        default: false,
        name: 'is_password_less'
    })
    isPasswordLess: boolean;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}