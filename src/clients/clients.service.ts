import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './schemas/client.entity';

@Injectable()
export class ClientsService extends TypeOrmCrudService<Client> {
    constructor(@InjectRepository(Client) public repo: Repository<Client>) {
        super(repo);
    }
}