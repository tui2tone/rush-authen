import { ClientsModule } from '@clients/clients.module';
import { Module } from '@nestjs/common';
import { ProjectsModule } from '@projects/projects.module';
import { RolesModule } from '@roles/roles.module';
import { SettingModule } from '@setting/setting.module';
import { UsersModule } from '@users/users.module';
import { SetupController } from './setup.controller';

@Module({
    imports: [
        SettingModule,
        ProjectsModule,
        ClientsModule,
        UsersModule,
        RolesModule
    ],
    controllers: [SetupController]
})
export class SetupModule { }
