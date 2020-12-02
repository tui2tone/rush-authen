import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingModule } from '@setting/setting.module';
import { OAuthProvidersController } from './oauth-providers.controller';
import { OAuthProvidersService } from './oauth-providers.service';
import { OAuthProvider } from './schemas/oauth-provider.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([OAuthProvider]),
        SettingModule
    ],
    controllers: [OAuthProvidersController],
    providers: [OAuthProvidersService],
    exports: [
        OAuthProvidersService
    ]
})
export class OAuthProvidersModule { }
