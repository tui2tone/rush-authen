import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BtnSuccessComponent } from './btn-success.component';

describe('BtnSuccessComponent', () => {
  let component: BtnSuccessComponent;
  let fixture: ComponentFixture<BtnSuccessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
