import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisConfig } from '../config';

@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: RedisConfig.HOST,
            port: RedisConfig.PORT,
        })
    ],
    exports: [
        CacheModule
    ]
})
export class CoreModule { }
