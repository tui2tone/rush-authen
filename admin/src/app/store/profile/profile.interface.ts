export class Profile {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImgUrl?: string;

    constructor(data: Object) {
        for (let key in data) {
            this[key] = data[key];
        }
    }
}