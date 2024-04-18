import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessionInstructionsComponent } from './lession-instructions.component';

describe('LessionInstructionsComponent', () => {
  let component: LessionInstructionsComponent;
  let fixture: ComponentFixture<LessionInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessionInstructionsComponent]
    });
    fixture = TestBed.createComponent(LessionInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
