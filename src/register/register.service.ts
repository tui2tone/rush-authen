import { Injectable } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { RegisterDto } from './interfaces/register.interface';
import { Hash } from '@utils/hash';
import { Config } from '@config/index';

@Injectable()
export class RegisterService {
    constructor(
        private user: UsersService
    ) { }
    
    async register(data: RegisterDto) {
        try {
            data.cryptedPassword = Hash.sha256(data.password, Config.PASSWORD_SECRET)
            const created = await this.user.repo.save(data)
            return created
        } catch (error) {
            throw error
        }
    }
}
