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
        RegisterModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
