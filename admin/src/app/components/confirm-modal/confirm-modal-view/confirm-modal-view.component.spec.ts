import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmModalViewComponent } from './confirm-modal-view.component';

describe('ConfirmModalViewComponent', () => {
  let component: ConfirmModalViewComponent;
  let fixture: ComponentFixture<ConfirmModalViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmModalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
