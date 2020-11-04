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
import { ActivatedRoute, Router } from '@angular/router';
import Config from 'src/app/constants';
import { RouteDataService } from 'src/app/services/route-data.service';
import { distinctUntilChanged } from 'rxjs/operators';

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

    settingTabs: Object = {
        site: 0,
        providers: 1
    }
    selectedSettingTab: number = 0
    subscriber: Subscription[] = [];
    title: string = null;
    menu: string = null;

    constructor(
        private store: Store<AuthState.State>,
        private sidebarService: SidebarService,
        private paramService: ParamsService,
        private router: Router,
        private routeDataService: RouteDataService
    ) { }

    ngOnInit() {
        this.profile = this.store.select(ProfileSelectors.selectFindProfiles)

        this.subscriber.push(this.paramService.params.subscribe((params) => {
            if (params && params.projectId) {
                this.menu = 'project';
                this.project.patchValue(params.projectId, { emitEvent: false })
            } else {
                this.menu = null;
                this.project.reset(null, { emitEvent: false })
            }
        }))

        this.subscriber.push(this.project.valueChanges.subscribe((projectId) => {
            if (projectId) {
                this.router.navigate([Config.APP_URL.PROJECT, projectId])
            }
        }))

        this.subscriber.push(this.routeDataService.data.subscribe((data) => {
            if (data && data.title) {
                this.title = data.title
            } else {
                this.title = null;
            }

            if (data && data.menu) {
                this.menu = data.menu
            } else {
                this.menu = null;
            }
        }))

        this.subscriber.push(
            this.router.events.pipe(distinctUntilChanged()).subscribe((res) => {
                this.setActiveTab()
            })
        )
        this.setActiveTab()
    }

    setActiveTab() {

        const keys = Object.keys(this.tabs)
        keys.map((item) => {
            const projectUrl = `/projects/${this.project.value}/${item}`
            if (this.router.url.indexOf(projectUrl) > -1) {
                if (this.selectedTab != this.tabs[item]) {
                    this.selectedTab = this.tabs[item]
                }
            }
        })

        const settingKeys = Object.keys(this.settingTabs)
        settingKeys.map((item) => {
            const settingUrl = `/setting/${item}`
            if (this.router.url.indexOf(settingUrl) > -1) {
                if (this.selectedSettingTab != this.settingTabs[item]) {
                    this.selectedSettingTab = this.settingTabs[item]
                }
            }
        })
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
        const getTab = tab.tab.textLabel;
        this.router.navigate([Config.APP_URL.PROJECT, this.project.value, getTab])
    }


    selectedSettingTabChange(tab: MatTabChangeEvent) {
        const getTab = tab.tab.textLabel;
        this.router.navigate([Config.APP_URL.SETTING, getTab])
    }

}
