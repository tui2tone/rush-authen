import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Config } from './config';
import { UsersModule } from './users/users.module';
import { CoreModule } from '@core/core.module';
import { AuthModule } from '@auth/auth.module';
import { ApplicationsModule } from './applications/applications.module';
import { ClientsModule } from './clients/clients.module';
import { RegisterModule } from './register/register.module';
import { InteractionModule } from './interaction/interaction.module';
import { TokenStrategy } from '@auth/token.strategy';

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
        ApplicationsModule,
        ClientsModule,
        RegisterModule,
        InteractionModule
    ],
    controllers: [AppController],
    providers: [TokenStrategy],
})
export class AppModule { }
