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
        type: getColumnType('boolean'),
        default: false
    })
    isActive: boolean;

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
        default: false
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