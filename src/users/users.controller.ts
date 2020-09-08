import { Controller } from '@nestjs/common';
import { User } from './schemas/user.entity'
import { CrudController, Crud } from '@nestjsx/crud';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

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
}
