import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormContainerComponent } from './form-container.component';

describe('FormContainerComponent', () => {
  let component: FormContainerComponent;
  let fixture: ComponentFixture<FormContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
