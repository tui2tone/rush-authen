import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './schemas/setting.entity';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Setting])
    ],
    controllers: [SettingController],
    providers: [SettingService],
    exports: [
        SettingService
    ]
})
export class SettingModule { }
