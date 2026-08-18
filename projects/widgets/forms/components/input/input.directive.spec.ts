import { IdsInputDirective } from './input.directive';

import { IdsFormFieldComponent } from '../form-field/form-field.component';

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

describe('IdsInputDirective', () => {
  let directive: IdsInputDirective;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    directive = fixture.debugElement.query(By.directive(IdsInputDirective)).injector.get(IdsInputDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
