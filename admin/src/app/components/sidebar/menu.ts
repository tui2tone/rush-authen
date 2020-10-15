export class Menu {
    items: Menu[] = []
    name: string;
    link: string;
    icon: string;
    isCollapse: boolean = true;
    isInbox: boolean = false;
    isHeader: boolean = false
    permission: string;

    constructor(data: Object) {
        for (let key in data) {
            this[key] = data[key];
        }
    }
}