import { Entity, Column, Unique, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, AfterLoad, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { getColumnType } from '@utils/database/column-type';
import { UserRole } from './user-role.entity';

@Entity("users")
export class User extends BaseEntity {
    @ApiProperty({
        example: 1
    })
    @PrimaryGeneratedColumn({})
    id: number;

    @ApiProperty({
        example: "abc@gmail.com"
    })
    @Column({
        type: getColumnType('string'),
        unique: true
    })
    email: string;

    @ApiProperty({
        example: "abc@gmail.com"
    })
    @Column({
        type: getColumnType('string'),
        unique: true
    })
    uuid: string;

    @ApiProperty({
        example: "Charuwit"
    })
    @Column({
        type: getColumnType('string'),
        name: 'first_name',
        nullable: true
    })
    firstName: string;

    @ApiProperty({
        example: "Nodthaisong"
    })
    @Column({
        type: getColumnType('string'),
        name: 'last_name',
        nullable: true
    })
    lastName: string;

    @ApiProperty({
        example: "tui2tone"
    })
    @Column({
        type: getColumnType('string'),
        unique: true
    })
    username: string;

    @Column({
        type: getColumnType('string'),
        name: "crypted_password",
        nullable: true
    })
    cryptedPassword: string;

    @Column({
        type: getColumnType('boolean'),
        name: "is_owner",
        default: false
    })
    isOwner: boolean;

    @ApiProperty({
        example: "tui2tone"
    })
    @Column({
        type: getColumnType('string'),
        nullable: true
    })
    profileImgUrl: string;

    @ApiProperty({
        example: "xxxxxxx"
    })
    @Column({
        type: getColumnType('string'),
        name: 'google_user_id',
        nullable: true
    })
    googleUserId: string;

    password?: string;
    confirmPassword?: string;

    @OneToMany(type => UserRole, userRole => userRole.user, {
        cascade: true
    })
    roles: UserRole[];

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

    fullName?: string;

    @AfterLoad()
    setMetaData() {
         this.fullName = `${this.firstName || ''} ${this.lastName || ''}`.trim()
    }
}