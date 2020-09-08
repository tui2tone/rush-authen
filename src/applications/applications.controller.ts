import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Application } from './schemas/application.entity';
import { ApplicationsService } from './applications.service';
import { ApiTags } from '@nestjs/swagger';


@Crud({
    model: {
        type: Application,
    }
})
@ApiTags('applications')
@Controller('applications')
export class ApplicationsController implements CrudController<Application> {
    get base(): CrudController<Application> {
        return this;
    }

    constructor(
        public service: ApplicationsService
    ) {

    }
}
