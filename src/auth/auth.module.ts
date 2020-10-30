import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CoreModule } from '@core/core.module';
import { UsersModule } from '@users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './schemas/session.entity';
import { GoogleService } from './google/google.service';
import { ClientsModule } from '@clients/clients.module';
import { ProjectsModule } from '@projects/projects.module';
import { SettingModule } from '@setting/setting.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Session]),
        CoreModule,
        UsersModule,
        ProjectsModule,
        SettingModule,
        ClientsModule
    ],
    controllers: [AuthController],
    providers: [AuthService, GoogleService],
    exports: [
        AuthService
    ]
})
export class AuthModule { }
