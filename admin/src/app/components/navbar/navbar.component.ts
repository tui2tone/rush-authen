import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Profile } from 'src/app/store/profile/profile.interface';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { ProfileSelectors } from 'src/app/store/profile';
import { AuthState } from 'src/app/store/auth';
import { Store } from '@ngrx/store';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { ParamsService } from 'src/app/services/params.service';
import { Router } from '@angular/router';
import Config from 'src/app/constants';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    profile: Observable<Profile>;
    project: FormControl = new FormControl(null);

    isSidebarOpen: boolean = true;

    tabs: Object = {
        stats: 0,
        users: 1,
        roles: 2,
        clients: 3,
        setting: 4
    }
    selectedTab: number = 0
    subscriber: Subscription[] = [];
    isShowProject: boolean = false;

    constructor(
        private store: Store<AuthState.State>,
        private sidebarService: SidebarService,
        private paramService: ParamsService,
        private router: Router
    ) { }

    ngOnInit() {
        this.profile = this.store.select(ProfileSelectors.selectFindProfiles)

        this.subscriber.push(this.paramService.params.subscribe((params) => {
            if (params && params.projectId) {
                this.isShowProject = true;
                this.project.patchValue(params.projectId, { emitEvent: false })
            } else {
                this.isShowProject = false;
                this.project.reset(null, { emitEvent: false })
            }
        }))

        this.subscriber.push(this.project.valueChanges.subscribe((projectId) => {
            if (projectId) {
                this.router.navigate([Config.APP_URL.PROJECT, projectId])
            }
        }))
    }

    ngOnDestroy() {
        this.subscriber.map(m => m.unsubscribe())
    }

    toggleSidebar() {
        this.sidebarService.toggle()
        this.isSidebarOpen = this.sidebarService.isOpen
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 1000)
    }

    selectedTabChange(tab: MatTabChangeEvent) {
    }

}
