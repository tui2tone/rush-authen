import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CoreModule } from '@core/core.module';
import { UsersModule } from '@users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './schemas/session.entity';
import { ClientsModule } from '@clients/clients.module';
import { ProjectsModule } from '@projects/projects.module';
import { SettingModule } from '@setting/setting.module';
import { OAuthProvidersModule } from '@oauth-providers/oauth-providers.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Session]),
        CoreModule,
        UsersModule,
        ProjectsModule,
        SettingModule,
        ClientsModule,
        OAuthProvidersModule
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [
        AuthService
    ]
})
export class AuthModule { }
