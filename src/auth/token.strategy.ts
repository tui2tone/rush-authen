import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super();
    }

    async validate(token: string) {
        try {
            const user = await this.authService.validateToken(token);
            if (!user) {
                throw new UnauthorizedException();
            }
            return user;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}
