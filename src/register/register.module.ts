import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UsersModule } from '@users/users.module';

@Module({
    imports: [
        UsersModule
    ],
    providers: [RegisterService],
    controllers: [RegisterController],
    exports: [
        RegisterService
    ]
})
export class RegisterModule { }
