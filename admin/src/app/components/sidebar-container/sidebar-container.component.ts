import { Component, OnInit, Input, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Menu } from '../sidebar/menu';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-sidebar-container',
    templateUrl: './sidebar-container.component.html',
    styleUrls: ['./sidebar-container.component.scss']
})
export class SidebarContainerComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('drawer') drawer: MatDrawer;
    @Input() menu: Menu[] = []
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(
        private sidebarService: SidebarService,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.sidebarService.setDrawer(this.drawer);
            if(!this.mobileQuery.matches) {
                this.sidebarService.open()
            }
        })
    }

}
