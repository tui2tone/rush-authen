import { Project } from '@projects/schemas/project.entity';
import { Seeder } from 'typeorm-seeding';

const data = [{
    id: 1,
    name: 'RushAuthen',
    removeable: false
}]

export default class CreateProjects implements Seeder {
    public async run(factory, connection): Promise<any> {
        try {

            for (let i = 0; i < data.length; i++) {
                const item = data[i]
                const match = await Project.findOne(item.id)
                if (match) {
                    const keys = Object.keys(item).filter(m => m != 'id')
                    keys.map(key => {
                        match[key] = item[key]
                    })
                    await match.save()
                } else {
                    const newItem = new Project()
                    newItem.id = item.id

                    const keys = Object.keys(item).filter(m => m != 'id')
                    keys.map(key => {
                        newItem[key] = item[key]
                    })
                    await newItem.save()
                }
            }
            return Promise.resolve()
        } catch (error) {
            return Promise.resolve(error)
        }
    }
}