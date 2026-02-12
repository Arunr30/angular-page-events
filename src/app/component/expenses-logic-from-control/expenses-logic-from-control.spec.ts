import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesLogicFromControl } from './expenses-logic-from-control';

describe('ExpensesLogicFromControl', () => {
  let component: ExpensesLogicFromControl;
  let fixture: ComponentFixture<ExpensesLogicFromControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesLogicFromControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesLogicFromControl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
