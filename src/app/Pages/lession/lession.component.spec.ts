import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessionComponent } from './lession.component';

describe('LessionComponent', () => {
  let component: LessionComponent;
  let fixture: ComponentFixture<LessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessionComponent]
    });
    fixture = TestBed.createComponent(LessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
