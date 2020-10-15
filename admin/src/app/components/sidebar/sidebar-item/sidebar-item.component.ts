import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Menu } from '../menu';

@Component({
    selector: 'app-sidebar-item',
    templateUrl: './sidebar-item.component.html',
    styleUrls: ['./sidebar-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidebarItemComponent implements OnInit {
    @Input() item: Menu;
    @Input() level: number = 1;
    @Output() onToggle: EventEmitter<any> = new EventEmitter();
    constructor(
    ) { }

    ngOnInit() { }

    onToggleMenu() {
        this.item.isCollapse = true;
        this.onToggle.emit(this.item.name);
    }

    hasSubMenu() {
        return this.item.items && this.item.items.length > 0
    }

    onClickedOutside() {
        this.item.isCollapse = true;
        this.onToggle.emit(this.item.name);
    }
}
