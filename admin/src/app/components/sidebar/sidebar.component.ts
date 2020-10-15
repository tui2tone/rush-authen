import { Component, OnInit, Input } from '@angular/core';
import { Menu } from './menu';
import { AuthState } from 'src/app/store/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Input() menu: Menu[] = []
    @Input() isOpened: Boolean = false;

    constructor(
        private store$: Store<AuthState.State>
    ) { }

    ngOnInit() {
        // this.profile = this.store$.select(ProfileSelectors.selectFindProfiles)
    }

    previewFromUrl(source) {
        // return ENV.apiUrl + source;
    }
}
