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

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: Config.DB_URL,
            entities: [__dirname + '/**/*.entity{.ts,.js}']
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
        SetupModule
    ],
    controllers: [AppController],
    providers: [TokenStrategy],
})
export class AppModule { }
