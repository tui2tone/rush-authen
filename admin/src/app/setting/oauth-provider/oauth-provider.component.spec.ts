import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthProviderComponent } from './oauth-provider.component';

describe('OauthProviderComponent', () => {
  let component: OauthProviderComponent;
  let fixture: ComponentFixture<OauthProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
