import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { User } from './schemas/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(User) public repo: Repository<User>) {
        super(repo);
    }
}