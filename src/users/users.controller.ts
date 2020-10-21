import { Controller, Get } from '@nestjs/common';
import { User } from './schemas/user.entity'
import { CrudController, Crud } from '@nestjsx/crud';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@decorators/public.decorator';

@Crud({
    model: {
        type: User,
    }
})
@ApiTags('users')
@Controller('users')
export class UsersController implements CrudController<User> {
    get base(): CrudController<User> {
        return this;
    }

    constructor(
        public service: UsersService
    ) {

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
        }).filter(m => !(["id", "createdAt", "updatedAt", "googleUserId", "cryptedPassword"].includes(m.name)))
    }
}
