import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './schemas/application.entity';

@Injectable()
export class ApplicationsService extends TypeOrmCrudService<Application> {
    constructor(@InjectRepository(Application) public repo: Repository<Application>) {
        super(repo);
    }
}