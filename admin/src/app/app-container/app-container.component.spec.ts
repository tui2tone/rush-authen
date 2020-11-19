import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppContainerComponent } from './app-container.component';

describe('AppContainerComponent', () => {
  let component: AppContainerComponent;
  let fixture: ComponentFixture<AppContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
