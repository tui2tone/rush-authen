import { Public } from '@decorators/public.decorator';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SettingDto } from '@setting/interfaces/setting.interface';
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
        return res.render('setup-page',
            {
                siteUrl: "http://localhost:3000",
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
        try {
            const saved = await this.setting.save(payload)
            return res.render('setup-finish-page',
                {
                    siteUrl: "http://localhost:3000"
                },
            );
        } catch (error) {
            
        }
    }
}
