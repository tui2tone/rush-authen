import { Client } from '@clients/schemas/client.entity';
import { Config } from '@config/index';
import { Public } from '@decorators/public.decorator';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Project } from '@projects/schemas/project.entity';
import { Role } from '@roles/schemas/role.entity';
import { SettingDto } from '@setting/interfaces/setting.interface';
import { Setting } from '@setting/schemas/setting.entity';
import { User } from '@users/schemas/user.entity';
import { Request, Response } from 'express';
import { nanoid } from 'nanoid'
import { getConnection, getManager } from "typeorm";
import { Hash } from '@utils/hash';
import { SettingService } from '@setting/setting.service';
const defaultName = "Administrator"

@Controller('setup')
export class SetupController {

    constructor(
        private setting: SettingService
    ) {

    }

    @Public()
    @Get('initialize')
    setupData(
        @Req() req: Request
    ) {
        const defaultSiteUrl = req.protocol + '://' + req.headers.host;
        return {
            siteUrl: defaultSiteUrl,
            siteName: defaultName,
            username: "admin"
        }
    }

    @Public()
    @Get()
    getSetupPage(
        @Res() res: Response,
    ) {
        return res.render('index',
            {
                locals: {
                    uid: '',
                    project: '',
                }
            },
        );
    }

    @Public()
    @Post()
    async setup(
        @Body() payload: SettingDto
    ) {
        const { siteUrl, siteName, username, password } = payload
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Check Exist
            const exist = await this.setting.repo.findOne()
            if (exist) {
                return exist
            }
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
                uuid: nanoid(),
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

            return setting
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error(error)
            return {}
        } finally {
            await queryRunner.release();
        }
    }
}
