import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './schemas/setting.entity';
import { SettingDto } from './interfaces/setting.interface';
import { RolesService } from '@roles/roles.service';
import { UsersService } from '@users/users.service';

@Injectable()
export class SettingService extends TypeOrmCrudService<Setting> {
    constructor(
        @InjectRepository(Setting) public repo: Repository<Setting>,
        private role: RolesService,
        private user: UsersService
    ) {
        super(repo);
    }

    async save(data: SettingDto): Promise<Setting> {
        let setting = await this.get()
        if (setting) {
            setting.siteUrl = data.siteUrl;
            await setting.save()
        } else {
            setting = await this.repo.save({
                name: 'site',
                ...data
            })
        }
        return Promise.resolve(setting)
    }

    async get() {
        return await this.repo.findOne({
            name: 'setup'
        })
    }

    async isSetuped() {
        return await this.repo.findOne()
    }
}