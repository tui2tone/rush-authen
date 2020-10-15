import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    private drawer: MatDrawer;
    public isOpen: boolean = false;

    constructor() { }

    public setDrawer(drawer: MatDrawer): void {
        this.drawer = drawer;
    }

    public toggle() {
        if (this.isOpen) {
            this.isOpen = false;
            this.drawer.close()
        } else {
            this.isOpen = true;
            this.drawer.open()
        }
    }

    public close() {
        if (this.isOpen) {
            this.isOpen = false;
        }
        this.drawer.close()
    }

    public open() {
        if (!this.isOpen) {
            this.isOpen = true;
        }
        this.drawer.open()
    }
}
