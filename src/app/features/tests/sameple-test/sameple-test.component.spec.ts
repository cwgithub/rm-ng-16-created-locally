import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamepleTestComponent } from './sameple-test.component';

describe('SamepleTestComponent', () => {
  let component: SamepleTestComponent;
  let fixture: ComponentFixture<SamepleTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SamepleTestComponent]
    });
    fixture = TestBed.createComponent(SamepleTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
