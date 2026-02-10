import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsePagethree } from './response-pagethree';

describe('ResponsePagethree', () => {
  let component: ResponsePagethree;
  let fixture: ComponentFixture<ResponsePagethree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsePagethree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsePagethree);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
