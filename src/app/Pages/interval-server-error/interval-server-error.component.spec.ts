import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalServerErrorComponent } from './interval-server-error.component';

describe('IntervalServerErrorComponent', () => {
  let component: IntervalServerErrorComponent;
  let fixture: ComponentFixture<IntervalServerErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntervalServerErrorComponent]
    });
    fixture = TestBed.createComponent(IntervalServerErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
