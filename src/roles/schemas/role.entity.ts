import { Entity, Column, Unique, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn, AfterLoad, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { getColumnType } from '@utils/database/column-type';
import { Project } from '@projects/schemas/project.entity';

@Unique(["name", "projectId"])
@Entity("roles")
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn({})
    id: number;

    @Column({
        type: getColumnType('string')
    })
    name: string;

    @Column({
        type: getColumnType('number'),
        name: 'project_id',
        nullable: true
    })
    projectId: number;
    @ManyToOne(type => Project)
    @JoinColumn({ name: 'project_id' })
    project?: Project

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}