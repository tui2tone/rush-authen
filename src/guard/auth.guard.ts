import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TokenAuthGuard extends AuthGuard('bearer') {
    constructor(
        private readonly reflector: Reflector
    ) {
        super()
    }

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get<boolean>( "isPublic", context.getHandler() );

		if (isPublic) {
			return true;
        }
        
        return super.canActivate(context);
    }
}
