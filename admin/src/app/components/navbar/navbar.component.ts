import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Profile } from 'src/app/store/profile/profile.interface';
import { Observable, Subscription } from 'rxjs';
import { ProfileSelectors } from 'src/app/store/profile';
import { AuthState } from 'src/app/store/auth';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    profile$: Observable<Profile>;
    isSidebarOpen: boolean = true;
    constructor(
        private store$: Store<AuthState.State>,
        private sidebarService: SidebarService
    ) { }

    ngOnInit() {
        this.profile$ = this.store$.select(ProfileSelectors.selectFindProfiles)
    }

    toggleSidebar() {
        this.sidebarService.toggle()
        this.isSidebarOpen = this.sidebarService.isOpen
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 1000)
    }

}
