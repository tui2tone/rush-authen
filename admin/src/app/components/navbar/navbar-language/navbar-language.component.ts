import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Language } from './language';

@Component({
  selector: 'app-navbar-language',
  templateUrl: './navbar-language.component.html',
  styleUrls: ['./navbar-language.component.scss']
})
export class NavbarLanguageComponent implements OnInit {

  @Input() currentLanguage: Language;
  @Input() languages: Language[]
  @Output() onLanguageChange: EventEmitter<Language> = new EventEmitter();

  constructor(
  ) { }

  ngOnInit() {
  }

  changeLanguage(lang: Language) {
    this.onLanguageChange.emit(lang)
  }

}
