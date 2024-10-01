import { IdsFormFieldComponent } from './form-field.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('IdsFormFieldComponent', () => {
  let component: IdsFormFieldComponent;
  let fixture: ComponentFixture<IdsFormFieldComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [IdsFormFieldComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(IdsFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
