import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayMonthPickerComponent } from './day-month-picker.component';

describe('DayMonthPickerComponent', () => {
  let component: DayMonthPickerComponent;
  let fixture: ComponentFixture<DayMonthPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayMonthPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayMonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
