import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsePageFour } from './response-page-four';

describe('ResponsePageFour', () => {
  let component: ResponsePageFour;
  let fixture: ComponentFixture<ResponsePageFour>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsePageFour]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsePageFour);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
