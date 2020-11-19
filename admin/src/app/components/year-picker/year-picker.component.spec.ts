import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { YearPickerComponent } from './year-picker.component';

describe('YearPickerComponent', () => {
  let component: YearPickerComponent;
  let fixture: ComponentFixture<YearPickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ YearPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
