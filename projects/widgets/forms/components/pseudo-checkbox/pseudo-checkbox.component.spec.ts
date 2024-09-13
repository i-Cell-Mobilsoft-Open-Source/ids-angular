import { PseudoCheckboxComponent } from './pseudo-checkbox.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('PseudoCheckboxComponent', () => {
  let component: PseudoCheckboxComponent;
  let fixture: ComponentFixture<PseudoCheckboxComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [PseudoCheckboxComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PseudoCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
