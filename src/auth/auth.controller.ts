import { Controller, Body, Post, HttpStatus, HttpException, Delete, Get } from '@nestjs/common';
import { AuthPayload, UserPasswordSigninDto, GoogleAuthPayload } from './interfaces/auth-payload.interface';
import { AuthService } from './auth.service';
import { Public } from '@decorators/public.decorator';
import { AuthorizationToken } from '@decorators/authorization-token.decorator';
import { CurrentSession } from '@decorators/current-session.decorator';
import { Session } from './schemas/session.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoogleService } from './google/google.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private service: AuthService,
        private google: GoogleService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get current session via token or cookie' })
    @ApiResponse({ status: 200 })
    async getAuth(
        @CurrentSession() session: Session
    ): Promise<Session> {
        return await this.service.repo.findOne({})
    }
    
    @Post()
    @ApiOperation({ summary: 'Signin via username/password' })
    @ApiResponse({ status: 200, description: 'Signin Successfully' })
    @ApiResponse({ status: 400, description: 'Something error' })
    async authen(
        @Body() payload: UserPasswordSigninDto
    ): Promise<Session> {
        return await this.service.repo.save({})
    }

    @Public()
    @Post('google')
    async googleAuthen(
        @Body() body: GoogleAuthPayload
    ) {
        return await this.google.authen(body)
    }
}
