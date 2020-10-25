import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './schemas/setting.entity';
import { SettingDto } from './interfaces/setting.interface';

@Injectable()
export class SettingService extends TypeOrmCrudService<Setting> {
    constructor(@InjectRepository(Setting) public repo: Repository<Setting>) {
        super(repo);
    }

    async save(data: SettingDto) {
        return Promise.resolve()
    }
}