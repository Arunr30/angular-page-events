import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsePagetwo } from './response-pagetwo';

describe('ResponsePagetwo', () => {
  let component: ResponsePagetwo;
  let fixture: ComponentFixture<ResponsePagetwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsePagetwo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsePagetwo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
