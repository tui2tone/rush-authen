import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatetimepickerComponent } from './datetimepicker.component';

describe('DatetimepickerComponent', () => {
  let component: DatetimepickerComponent;
  let fixture: ComponentFixture<DatetimepickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
