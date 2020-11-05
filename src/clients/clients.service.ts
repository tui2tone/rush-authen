import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@utils/crud-typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './schemas/client.entity';
import { throwError } from 'rxjs';
import { nanoid } from 'nanoid'

@Injectable()
export class ClientsService extends TypeOrmCrudService<Client> {
    constructor(@InjectRepository(Client) public repo: Repository<Client>) {
        super(repo);
    }


    async createOne(req, dto: Client): Promise<Client> {
        try {
            await this.beforeSave(dto)
            const data = await super.createOne(req, dto)
            await this.afterSave(data)
            return data
        } catch (error) {
            throwError(error)
        }
    }

    async updateOne(req, dto: Client): Promise<Client> {
        try {
            await this.beforeSave(dto)
            delete dto.projectId
            const data = await super.updateOne(req, dto)
            await this.afterSave(data)
            return data
        } catch (error) {
            throwError(error)
        }
    }

    async replaceOne(req, dto: Client): Promise<Client> {
        try {
            await this.beforeSave(dto)
            delete dto.projectId
            const data = await super.replaceOne(req, dto)
            await this.afterSave(data)
            return data
        } catch (error) {
            throwError(error)
        }
    }

    async beforeSave(dto: Client) {
        if (!dto.clientId) {
            // Generate Client ID
            dto.clientId = nanoid();
        }

        if (!dto.clientSecret) {
            // Generate Client Secret
            dto.clientSecret = nanoid();
        }
        return Promise.resolve()
    }

    async afterSave(dto: Client) {
        return Promise.resolve()
    }
}