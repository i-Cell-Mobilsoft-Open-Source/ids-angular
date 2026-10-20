import { IdsSelectComponent } from './select.component';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IdsFormFieldComponent, IdsOptionComponent } from '@i-cell/ids-angular/forms';

@Component({
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsSelectComponent,
    IdsOptionComponent,
  ],
  template: `
    <ids-form-field>
      <ids-select ngModel="a">
        <ids-option value="a">A</ids-option>
        <ids-option value="b">B</ids-option>
      </ids-select>
    </ids-form-field>
  `,
})
class TestHostComponent {}

describe('IdsSelectComponent', () => {
  let component: IdsSelectComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(IdsSelectComponent)).componentInstance as IdsSelectComponent;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
