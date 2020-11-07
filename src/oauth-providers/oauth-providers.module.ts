import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthProvidersController } from './oauth-providers.controller';
import { OAuthProvidersService } from './oauth-providers.service';
import { OAuthProvider } from './schemas/oauth-provider.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([OAuthProvider])
    ],
    controllers: [OAuthProvidersController],
    providers: [OAuthProvidersService],
    exports: [
        OAuthProvidersService
    ]
})
export class OAuthProvidersModule { }
