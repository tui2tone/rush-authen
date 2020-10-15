import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalViewComponent } from './confirm-modal-view.component';

describe('ConfirmModalViewComponent', () => {
  let component: ConfirmModalViewComponent;
  let fixture: ComponentFixture<ConfirmModalViewComponent>;

  beforeEach(async(() => {
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
