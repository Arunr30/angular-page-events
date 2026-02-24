import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveFormComponent } from './wave-form-component';

describe('WaveFormComponent', () => {
  let component: WaveFormComponent;
  let fixture: ComponentFixture<WaveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaveFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
