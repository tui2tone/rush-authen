import { Controller } from '@nestjs/common';
import { Client } from './schemas/client.entity';
import { ClientsService } from './clients.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

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
}
