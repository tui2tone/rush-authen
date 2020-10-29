import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './schemas/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role]),
    ],
    providers: [RolesService],
    controllers: [RolesController],
    exports: [
        RolesService
    ]
})
export class RolesModule { }
