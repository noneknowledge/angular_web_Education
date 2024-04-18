import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrambledComponent } from './scrambled.component';

describe('ScrambledComponent', () => {
  let component: ScrambledComponent;
  let fixture: ComponentFixture<ScrambledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrambledComponent]
    });
    fixture = TestBed.createComponent(ScrambledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
