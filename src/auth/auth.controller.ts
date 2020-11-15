import { Controller, Body, Post, HttpStatus, HttpException, Delete, Get, Req, Res, Param } from '@nestjs/common';
import { UserPasswordSigninDto, GoogleAuthPayload } from './interfaces/auth-payload.interface';
import { AuthService } from './auth.service';
import { Public } from '@decorators/public.decorator';
import { CurrentSession } from '@decorators/current-session.decorator';
import { Session } from './schemas/session.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoogleService } from './google/google.service';
import { Request, Response } from 'express';
import { AuthProvider } from '@utils/auth-provider';
import * as queryString from 'query-string'
import { ClientsService } from '@clients/clients.service';
import { OAuthProvidersService } from '@oauth-providers/oauth-providers.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private service: AuthService,
        private google: GoogleService,
        private client: ClientsService,
        private provider: OAuthProvidersService
    ) { }

    @Public()
    @Post(':uid/login')
    @ApiOperation({ summary: 'Signin via username/password' })
    @ApiResponse({ status: 200, description: 'Signin Successfully' })
    @ApiResponse({ status: 400, description: 'Something error' })
    async signinPassword (
        @Body() payload: UserPasswordSigninDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        return await this.service.signinPassword(req, res, payload)
    }

    @Public()
    @Get(':uid')
    async getSigninSession(
        @Req() req: Request,
        @Res() res: Response,
        @Param('uid') uid: string
    ) {
        const details = await AuthProvider.interactionDetails(req, res);
        const { prompt, params, session } = details;

        const client = await AuthProvider.Client.find(params.client_id);
        const appClient = await this.client.findOne({
            clientId: client.clientId
        }, {
            relations: ["project"]
        })

        const providers = await this.provider.repo.find({
            isEnabled: true
        })

        if (prompt.name === 'login') {
            return res.render('login',
                {
                    uid,
                    project: appClient.project.name,
                    providers: JSON.stringify(providers)
                },
            );
        }
        if (prompt.name === "consent") {
            return res.render('consent',
                {
                    uid,
                    project: appClient.project.name
                },
            );
        }

        if(prompt.name === "invalid_request") {

        }

        return res.redirect(`${params.redirect_uri}?${queryString.stringify({
            ...params
        })}`)
    }

    @Public()
    @Post('google')
    async googleAuthen(
        @Body() body: GoogleAuthPayload
    ) {
        return await this.google.authen(body)
    }
}
