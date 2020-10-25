import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, Override } from '@nestjsx/crud';
import { Project } from './schemas/project.entity';
import { ProjectsService } from './projects.service';
import { ApiTags } from '@nestjs/swagger';
import { DatatableRequest } from '@decorators/datatable-request.decorator';
import { Public } from '@decorators/public.decorator';


@Crud({
    model: {
        type: Project,
    }
})
@ApiTags('projects')
@Controller('api/projects')
export class ProjectsController implements CrudController<Project> {
    get base(): CrudController<Project> {
        return this;
    }

    constructor(
        public service: ProjectsService
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
