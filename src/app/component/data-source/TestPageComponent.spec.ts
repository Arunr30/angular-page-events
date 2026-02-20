import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPageComponent } from './TestPageComponent';

describe('Response', () => {
  let component: Response;
  let fixture: ComponentFixture<Response>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Response);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
