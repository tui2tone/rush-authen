import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override } from '@nestjsx/crud';
import { Application } from './schemas/application.entity';
import { ApplicationsService } from './applications.service';
import { ApiTags } from '@nestjs/swagger';
import { DatatableRequest } from '@decorators/datatable-request.decorator';
import { Public } from '@decorators/public.decorator';


@Crud({
    model: {
        type: Application,
    }
})
@ApiTags('applications')
@Controller('api/applications')
export class ApplicationsController implements CrudController<Application> {
    get base(): CrudController<Application> {
        return this;
    }

    constructor(
        public service: ApplicationsService
    ) {

    }

    @Override()
    async getMany(
        @DatatableRequest({
            fields: ['name'],
        }) req: CrudRequest
    ) {
        return await this.base.getManyBase(req);
    }

    @Public()
    @Get('/config')
    async getConfig() {
        return this.service.repo.metadata.ownColumns.map(column => {
            return {
                type: column.type || "string",
                name: column.propertyName,
                required: !column.isNullable
            }
        }).filter(m => !(["id", "createdAt", "updatedAt"].includes(m.name)))
    }
}
