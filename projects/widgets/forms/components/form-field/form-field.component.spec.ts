import { IdsFormFieldComponent } from './form-field.component';

import { IdsInputDirective } from '../input/input.directive';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsInputDirective,
  ],
  template: `
    <ids-form-field>
      <input idsInput ngModel />
    </ids-form-field>
  `,
})
class TestHostComponent {
}

describe('IdsFormFieldComponent', () => {
  let component: IdsFormFieldComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(IdsFormFieldComponent)).componentInstance as IdsFormFieldComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
