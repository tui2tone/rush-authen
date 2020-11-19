import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BtnSecondaryComponent } from './btn-secondary.component';

describe('BtnSecondaryComponent', () => {
  let component: BtnSecondaryComponent;
  let fixture: ComponentFixture<BtnSecondaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
