import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOutlineComponent } from './test-outline.component';

describe('TestOutlineComponent', () => {
  let component: TestOutlineComponent;
  let fixture: ComponentFixture<TestOutlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestOutlineComponent]
    });
    fixture = TestBed.createComponent(TestOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
