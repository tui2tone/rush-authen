import { Module } from '@nestjs/common';
import { SettingModule } from '@setting/setting.module';
import { SetupController } from './setup.controller';

@Module({
    imports: [
        SettingModule
    ],
    controllers: [SetupController]
})
export class SetupModule { }
