import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesParent } from './expenses-parent';

describe('ExpensesParent', () => {
  let component: ExpensesParent;
  let fixture: ComponentFixture<ExpensesParent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesParent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesParent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
