import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './schemas/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitService } from './init/init.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Client])
    ],
    providers: [ClientsService, InitService],
    controllers: [ClientsController],
    exports: [
        ClientsService
    ]
})
export class ClientsModule { }
