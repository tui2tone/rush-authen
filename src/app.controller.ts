import { Public } from '@decorators/public.decorator';
import { Controller, Get, Res } from '@nestjs/common';
import { SettingService } from '@setting/setting.service';
import { Response } from 'express';

@Controller()
export class AppController {
    constructor(
        private setting: SettingService
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
}
