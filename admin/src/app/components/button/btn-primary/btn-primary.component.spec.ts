import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BtnPrimaryComponent } from './btn-primary.component';

describe('BtnPrimaryComponent', () => {
  let component: BtnPrimaryComponent;
  let fixture: ComponentFixture<BtnPrimaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnPrimaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
