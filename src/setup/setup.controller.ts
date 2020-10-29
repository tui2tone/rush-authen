import { Public } from '@decorators/public.decorator';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SettingDto } from '@setting/interfaces/setting.interface';
import { Setting } from '@setting/schemas/setting.entity';
import { SettingService } from '@setting/setting.service';
import { Request, Response } from 'express';

@Controller('setup')
export class SetupController {

    constructor(
        private setting: SettingService
    ) {

    }

    @Public()
    @Get()
    getSetupPage(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const defaultSiteUrl = req.protocol + '://' + req.headers.host;
        return res.render('setup',
            {
                siteUrl: defaultSiteUrl,
                username: "admin"
            },
        );
    }

    @Public()
    @Post()
    async setup(
        @Req() req: Request,
        @Res() res: Response,
        @Body() payload: SettingDto
    ) {
        const { siteUrl } = payload
        try {
            const saved: Setting = await this.setting.save(payload)
            return res.render('setup-finish',
                {
                    siteUrl,
                    username: "admin"
                },
            );
        } catch (error) {
            console.error(error)
            return res.render('setup',
                {
                    siteUrl,
                    username: "admin",
                    error: error.message
                },
            );
        }
    }
}
