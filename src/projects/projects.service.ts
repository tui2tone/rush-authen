import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './schemas/project.entity';

@Injectable()
export class ProjectsService extends TypeOrmCrudService<Project> {
    constructor(@InjectRepository(Project) public repo: Repository<Project>) {
        super(repo);
    }
}