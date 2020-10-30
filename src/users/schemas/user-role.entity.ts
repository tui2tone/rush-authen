import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, Unique, PrimaryColumn, ManyToOne, JoinColumn, AfterLoad } from 'typeorm';
import { Role } from '@roles/schemas/role.entity';
import { User } from './user.entity';
import { getColumnType } from '@utils/database/column-type';

@Entity("user_roles")
export class UserRole {
    @PrimaryGeneratedColumn({
    })
    id?: number;

    @Column({
        type: getColumnType('number'),
        name: 'user_id',
        nullable: true
    })
    userId?: number;
    @ManyToOne(type => User, user => user.roles, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'user_id'
    })
    user?: User;

    @Column({
        type: getColumnType('number'),
        name: 'role_id'
    })
    roleId: number;
    @ManyToOne(type => Role)
    @JoinColumn({ name: 'role_id' })
    role?: Role;
}