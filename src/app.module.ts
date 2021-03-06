import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Config } from './config';
import { UsersModule } from './users/users.module';
import { CoreModule } from '@core/core.module';
import { AuthModule } from '@auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ClientsModule } from './clients/clients.module';
import { RegisterModule } from './register/register.module';
import { InteractionModule } from './interaction/interaction.module';
import { TokenStrategy } from '@auth/token.strategy';
import { AdditionalFieldsModule } from './additional-fields/additional-fields.module';
import { SettingModule } from './setting/setting.module';
import { SetupModule } from './setup/setup.module';
import { RolesModule } from './roles/roles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OAuthProvidersModule } from './oauth-providers/oauth-providers.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: Config.DB_URL,
            entities: [__dirname + '/**/*.entity{.ts,.js}']
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'admin/dist/admin'),
            serveRoot: '/admin'
        }),
        CoreModule,
        UsersModule,
        AuthModule,
        ProjectsModule,
        ClientsModule,
        RegisterModule,
        InteractionModule,
        AdditionalFieldsModule,
        SettingModule,
        SetupModule,
        RolesModule,
        OAuthProvidersModule
    ],
    controllers: [AppController],
    providers: [TokenStrategy],
})
export class AppModule { }
