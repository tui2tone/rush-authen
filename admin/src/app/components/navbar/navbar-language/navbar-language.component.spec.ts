import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLanguageComponent } from './navbar-language.component';

describe('NavbarLanguageComponent', () => {
  let component: NavbarLanguageComponent;
  let fixture: ComponentFixture<NavbarLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
