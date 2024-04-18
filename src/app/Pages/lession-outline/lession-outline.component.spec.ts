import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessionOutlineComponent } from './lession-outline.component';

describe('LessionOutlineComponent', () => {
  let component: LessionOutlineComponent;
  let fixture: ComponentFixture<LessionOutlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessionOutlineComponent]
    });
    fixture = TestBed.createComponent(LessionOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
