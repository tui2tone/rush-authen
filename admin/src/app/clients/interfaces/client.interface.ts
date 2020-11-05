import { ProjectDto } from '../../projects/interfaces/project.interface';

export interface ClientDto {
    id: number,
    name: string,
    appId: string,
    clientId: string,
    clientSecret: string,
    projectId: number,
    isActive: boolean,
    project?: ProjectDto
}