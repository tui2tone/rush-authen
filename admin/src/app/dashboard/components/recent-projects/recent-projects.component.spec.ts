import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecentProjectsComponent } from './recent-projects.component';

describe('RecentProjectsComponent', () => {
  let component: RecentProjectsComponent;
  let fixture: ComponentFixture<RecentProjectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
