export class Profile {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    role: any;
    roles: any[];
    company: any;

    constructor(data: Object) {
        for (let key in data) {
            this[key] = data[key];
        }
    }
}