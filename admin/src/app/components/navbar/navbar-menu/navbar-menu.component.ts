import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'src/app/store/profile/profile.interface';
import { Language } from '../navbar-language/language';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment as ENV } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthState } from 'src/app/store/auth';

@Component({
    selector: 'app-navbar-menu',
    templateUrl: './navbar-menu.component.html',
    styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {

    @Input() mobile: boolean = false;
    @Input() profile: Profile;
    currentLanguage: Language;
    languages: Language[] = []

    round$: Observable<any>;

    constructor(
        private store: Store<AuthState.State>,
        private translateService: TranslateService,
        private http: HttpClient
    ) { }

    async ngOnInit() {
        this.languages = (await this.http.get('/languages').toPromise()) as Language[]
        this.getCurrentLanguage();
    }

    getCurrentLanguage() {
        let defaultLang: string = localStorage.getItem('defaultLang');
        if (!defaultLang) {
            localStorage.setItem('defaultLang', 'en');
            defaultLang = 'en'
        }
        this.currentLanguage = this.languages.find((item) => item.code === defaultLang);
    }

    onLanguageChange(lang: Language) {
        localStorage.setItem('defaultLang', lang.code);
        this.translateService.use(lang.code);
        this.getCurrentLanguage();
    }

    previewFromUrl(source) {
        return ENV.apiUrl + source;
    }
}
