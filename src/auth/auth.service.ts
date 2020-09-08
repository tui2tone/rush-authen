import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Hash } from '@utils/hash';
import { User } from '@users/schemas/user.entity';
import { UsersService } from '@users/users.service';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './schemas/session.entity';

@Injectable()
export class AuthService extends TypeOrmCrudService<Session> {
    constructor(
        @InjectRepository(Session)
        public repo: Repository<Session>,
        private usersService: UsersService
    ) {
        super(repo)
    }

    async validateToken(token: string): Promise<any> {
        return await this.getActiveToken(token)
    }

    async getActiveToken(token: string) {
        return await this.repo.findOne({ token })
    }

    async revokeToken(token: string) {
        return await this.repo.delete({ token })
    }

    async generateToken(user: User) {
        const token = Hash.generateToken(user)
        const session = await this.repo.save({
            token
        })
        return session
    }
}
