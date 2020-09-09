import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto } from './interfaces/register.interface';
import { RegisterService } from './register.service';
import { Public } from '@decorators/public.decorator';

@Controller('register')
export class RegisterController {

    constructor(
        private service: RegisterService
    ) {}

    @Public()
    @Post()
    async register(
        @Body() payload: RegisterDto
    ) {
        return await this.service.register(payload);
    }
}
