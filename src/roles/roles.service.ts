import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './schemas/role.entity';

@Injectable()
export class RolesService extends TypeOrmCrudService<Role> {
    constructor(@InjectRepository(Role) public repo: Repository<Role>) {
        super(repo);
    }
}