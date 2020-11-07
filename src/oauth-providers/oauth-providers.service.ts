import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { Repository } from 'typeorm';
import { OAuthProvider } from './schemas/oauth-provider.entity';

@Injectable()
export class OAuthProvidersService extends TypeOrmCrudService<OAuthProvider> {
    constructor(@InjectRepository(OAuthProvider) public repo: Repository<OAuthProvider>) {
        super(repo);
    }
}
