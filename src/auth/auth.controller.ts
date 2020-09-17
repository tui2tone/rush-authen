import { Controller, Body, Post, HttpStatus, HttpException, Delete, Get, Req, Res } from '@nestjs/common';
import { UserPasswordSigninDto, GoogleAuthPayload } from './interfaces/auth-payload.interface';
import { AuthService } from './auth.service';
import { Public } from '@decorators/public.decorator';
import { CurrentSession } from '@decorators/current-session.decorator';
import { Session } from './schemas/session.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoogleService } from './google/google.service';
import { Request, Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private service: AuthService,
        private google: GoogleService
    ) { }

    // @Get()
    // @ApiOperation({ summary: 'Get current session via token or cookie' })
    // @ApiResponse({ status: 200 })
    // async getAuth(
    //     @CurrentSession() session: Session
    // ): Promise<Session> {
    //     return await this.service.repo.findOne({})
    // }

    @Public()
    @Get(':uid')
    async getSigninSession(
        @Req() req: Request,
        @Res() res: Response
    ) {
        return res.render('login',
            { message: 'Hello world!' },
        );
    }

    @Public()
    @Post('signin')
    @ApiOperation({ summary: 'Signin via username/password' })
    @ApiResponse({ status: 200, description: 'Signin Successfully' })
    @ApiResponse({ status: 400, description: 'Something error' })
    async signinPassword (
        @Body() payload: UserPasswordSigninDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const session = await this.service.signinPassword(req, res, payload)
        res.send(session);
    }

    @Public()
    @Post('google')
    async googleAuthen(
        @Body() body: GoogleAuthPayload
    ) {
        return await this.google.authen(body)
    }
}
