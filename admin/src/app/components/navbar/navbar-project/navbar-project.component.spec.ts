import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarProjectComponent } from './navbar-project.component';

describe('NavbarProjectComponent', () => {
  let component: NavbarProjectComponent;
  let fixture: ComponentFixture<NavbarProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
