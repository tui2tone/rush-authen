import { Controller, Get } from '@nestjs/common';
import { Public } from '@decorators/public.decorator';

@Controller('healthcheck')
export class HealthcheckController {

    @Public()
    @Get()
    async healthcheck() {
        return true;
    }
}
