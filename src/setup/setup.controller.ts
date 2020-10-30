import { ClientsService } from '@clients/clients.service';
import { Client } from '@clients/schemas/client.entity';
import { Config } from '@config/index';
import { Public } from '@decorators/public.decorator';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ProjectsService } from '@projects/projects.service';
import { Project } from '@projects/schemas/project.entity';
import { RolesService } from '@roles/roles.service';
import { Role } from '@roles/schemas/role.entity';
import { SettingDto } from '@setting/interfaces/setting.interface';
import { Setting } from '@setting/schemas/setting.entity';
import { SettingService } from '@setting/setting.service';
import { User } from '@users/schemas/user.entity';
import { UsersService } from '@users/users.service';
import { Request, Response } from 'express';
import { nanoid } from 'nanoid'
import { getConnection, getManager } from "typeorm";
import { Hash } from '@utils/hash';
const defaultName = "Authenticator"

@Controller('setup')
export class SetupController {

    constructor(
        private setting: SettingService,
        private project: ProjectsService,
        private client: ClientsService,
        private role: RolesService,
        private user: UsersService
    ) {

    }

    @Public()
    @Get()
    getSetupPage(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const defaultSiteUrl = req.protocol + '://' + req.headers.host;
        return res.render('setup',
            {
                siteUrl: defaultSiteUrl,
                siteName: defaultName,
                username: "admin"
            },
        );
    }

    @Public()
    @Post()
    async setup(
        @Req() req: Request,
        @Res() res: Response,
        @Body() payload: SettingDto
    ) {
        const { siteUrl, siteName, username, password } = payload
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Setting
            const setting = Object.assign(new Setting(), {
                name: 'site',
                siteUrl,
                siteName
            });
            await queryRunner.manager.save(setting);

            // Default Project
            const project = Object.assign(new Project(), {
                name: siteName || defaultName,
                isPrimary: true
            });
            await queryRunner.manager.save(project);

            // Default Client
            const client = Object.assign(new Client(), {
                projectId: project.id,
                name: siteName || defaultName,
                clientId: nanoid(),
                clientSecret: nanoid(),
                redirectUris: [{
                    redirectUri: `${siteUrl}/admin/auth/callback`
                }]
            });
            await queryRunner.manager.save(client);

            // Default Role
            const role = Object.assign(new Role(), {
                projectId: project.id,
                name: "Owner"
            });
            await queryRunner.manager.save(role);

            // Default User
            const user = Object.assign(new User(), {
                name: username,
                username,
                email: '',
                cryptedPassword: Hash.sha256(password, Config.PASSWORD_SECRET),
                roles: [
                    {
                        roleId: role.id
                    }
                ]
            });
            await queryRunner.manager.save(user);
            
            await queryRunner.commitTransaction();

            return res.render('setup-finish',
                {
                    siteUrl,
                    username: "admin"
                },
            );
        } catch (error) {
            console.error(error)
            await queryRunner.rollbackTransaction();
            return res.render('setup',
                {
                    siteUrl,
                    siteName: siteName || defaultName,
                    username: username || "admin",
                    error: error.message
                },
            );
        } finally {
            await queryRunner.release();
        }
    }
}
