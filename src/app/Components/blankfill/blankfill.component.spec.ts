import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankfillComponent } from './blankfill.component';

describe('BlankfillComponent', () => {
  let component: BlankfillComponent;
  let fixture: ComponentFixture<BlankfillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlankfillComponent]
    });
    fixture = TestBed.createComponent(BlankfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
