import { Client, ClientDto } from '@clients/schemas/client.entity';
import { Seeder } from 'typeorm-seeding';

const data: ClientDto[] = [{
    id: 1,
    name: 'RushAuthen',
    projectId: 1,
    clientId: '',
    clientSecret: '',
    redirectUris: []
}]

export default class CreateClients implements Seeder {
    public async run(factory, connection): Promise<any> {
        try {

            for (let i = 0; i < data.length; i++) {
                const item = data[i]
                const match = await Client.findOne(item.id)
                if (match) {
                    const keys = Object.keys(item).filter(m => m != 'id')
                    keys.map(key => {
                        match[key] = item[key]
                    })
                    await match.save()
                } else {
                    const newItem = new Client()
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