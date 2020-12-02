import { Public } from '@decorators/public.decorator';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SettingService } from '@setting/setting.service';
import { OAuthProviderMethods } from './oauth-provider.constants';
import { OAuthProvidersService } from './oauth-providers.service';
import { OAuthProvider } from './schemas/oauth-provider.entity';

@Crud({
    model: {
        type: OAuthProvider,
    }
})
@Controller('api/oauth-providers')
export class OAuthProvidersController implements CrudController<OAuthProvider> {
    get base(): CrudController<OAuthProvider> {
        return this;
    }

    constructor(
        public service: OAuthProvidersService,
        private setting: SettingService
    ) {

    }

    @Public()
    @Get('available')
    async getAvailableProviders() {
        return await this.service.repo.find({
            isEnabled: true
        })
    }

    @Get('methods')
    async allMethods() {
        // Setup Method Records
        const allMethods = await this.service.repo.find({})
        const setting = await this.setting.repo.findOne()
        for (let i = 0; i < OAuthProviderMethods.length; i++) {
            const item = OAuthProviderMethods[i]
            const matched = allMethods.find(m => m.method === item.method)
            if (!matched) {
                await this.service.repo.save({
                    name: item.name,
                    method: item.method,
                    orderNo: item.orderNo,
                    isEnabled: false,
                    authority: item.authority,
                    scope: item.scope,
                    responseType: item.responseType,
                    redirectUri: setting.redirectUri
                })
            } else {
                matched.name = item.name;
                matched.orderNo = item.orderNo;
                await matched.save();
            }
        }
        const data = await this.service.repo.find({
            where: {
                isSupported: true
            },
            order: {
                orderNo: 'ASC'
            }
        })
        return {
            data,
            total: data.length
        }
    }
}
