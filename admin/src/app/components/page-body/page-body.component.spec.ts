import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageBodyComponent } from './page-body.component';

describe('PageBodyComponent', () => {
  let component: PageBodyComponent;
  let fixture: ComponentFixture<PageBodyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
