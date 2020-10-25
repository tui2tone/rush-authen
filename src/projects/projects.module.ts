import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './schemas/project.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project])
    ],
    providers: [ProjectsService],
    controllers: [ProjectsController],
    exports: [
        ProjectsService
    ]
})
export class ProjectsModule { }
