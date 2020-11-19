import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfiniteListComponent } from './infinite-list.component';

describe('InfiniteListComponent', () => {
  let component: InfiniteListComponent;
  let fixture: ComponentFixture<InfiniteListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
