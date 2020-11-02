import { Controller, Get } from '@nestjs/common';
import { Client } from './schemas/client.entity';
import { ClientsService } from './clients.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@decorators/public.decorator';

@Crud({
    model: {
        type: Client,
    }
})
@ApiTags('clients')
@Controller('clients')
export class ClientsController implements CrudController<Client> {
    get base(): CrudController<Client> {
        return this;
    }

    constructor(
        public service: ClientsService
    ) {

    }

    @Public()
    @Get()
    async getClient() {
        return this.service.repo.find()
    }
}
