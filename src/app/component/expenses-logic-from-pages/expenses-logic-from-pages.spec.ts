import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesLogicFromPages } from './expenses-logic-from-pages';

describe('ExpensesLogicFromPages', () => {
  let component: ExpensesLogicFromPages;
  let fixture: ComponentFixture<ExpensesLogicFromPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesLogicFromPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesLogicFromPages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
