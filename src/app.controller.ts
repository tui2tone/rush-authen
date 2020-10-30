import { ClientsService } from '@clients/clients.service';
import { Public } from '@decorators/public.decorator';
import { Controller, Get, Res } from '@nestjs/common';
import { ProjectsService } from '@projects/projects.service';
import { SettingService } from '@setting/setting.service';
import { Response } from 'express';

@Controller()
export class AppController {
    constructor(
        private setting: SettingService,
        private project: ProjectsService,
        private client: ClientsService
    ) {
    }

    @Public()
    @Get()
    async base(
        @Res() res: Response
    ) {
        const setuped = await this.setting.get()
        if (setuped) {
            return res.redirect(`/admin`)
        } else {
            return res.redirect(`/setup`)
        }
    }

    @Public()
    @Get('api/oauth-config')
    async configAdmin(
    ) {
        const setuped = await this.setting.get()
        const project = await this.project.findOne({
            isPrimary: true
        })
        const client = await this.client.findOne({
            projectId: project.id
        }, {
            relations: [
                'redirectUris'
            ]
        })
        return {
            authority: setuped.siteUrl + '/oauth',
            client_id: client.clientId,
            redirect_uri: client.redirectUris[0].redirectUri,
            response_type: 'code',
            scope: 'openid email',
            automaticSilentRenew: true,
            accessTokenExpiringNotificationTime: 4,
            filterProtocolClaims: true,
            loadUserInfo: true
        }
    }
}
