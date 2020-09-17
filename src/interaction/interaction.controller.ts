import { Controller, Get, Req, Res } from '@nestjs/common';
import { Public } from '@decorators/public.decorator';
import { AuthProvider } from '@utils/auth-provider';
import { Request, Response } from 'express';

@Controller('interaction')
export class InteractionController {

    @Public()
    @Get(':uid')
    async getSession(
        @Req() req: Request,
        @Res() res: Response
    ): Promise<any> {
        try {
            const details = await AuthProvider.interactionDetails(req, res);
            console.log('see what else is available to you for interaction views', details);
            const { uid, prompt, params } = details;

            const client = await AuthProvider.Client.find(params.client_id);

            if (prompt.name === 'login') {
                return {
                    client,
                    uid,
                    details: prompt.details,
                    params,
                    title: 'Sign-in',
                    flash: undefined,
                };
            }

            return {
                client,
                uid,
                details: prompt.details,
                params,
                title: 'Authorize',
            };
        } catch (err) {
            return null
        }
    }
}
