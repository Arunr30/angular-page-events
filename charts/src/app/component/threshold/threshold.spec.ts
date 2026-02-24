import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Threshold } from './threshold';

describe('Threshold', () => {
  let component: Threshold;
  let fixture: ComponentFixture<Threshold>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Threshold]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Threshold);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
