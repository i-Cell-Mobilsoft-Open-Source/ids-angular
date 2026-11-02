import { IdsFormFieldComponent } from './form-field.component';

import { IdsLabelDirective } from '../../directives/label.directive';
import { IdsInputDirective } from '../input/input.directive';
import { IdsErrorDefinitionDirective } from '../message/error-message/error-definition.directive';
import { IdsErrorMessageComponent } from '../message/error-message/error-message.component';

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
      <input idsInput ngModel="value" />
    </ids-form-field>
  `,
})
class TestHostComponent {}

@Component({
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsInputDirective,
    IdsLabelDirective,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
  ],
  template: `
    <ids-form-field>
      <ids-label>Name</ids-label>
      @if (showHelp) {
        <button idsLabelSuffix type="button" (click)="helpClicks = helpClicks + 1">Help</button>
      }
      <input idsInput required ngModel="" />
      <ids-error-message>
        <ids-error-def code="required">Name is required</ids-error-def>
      </ids-error-message>
    </ids-form-field>
  `,
})
class LabelSuffixTestHostComponent {
  public showHelp = true;
  public helpClicks = 0;
}

describe('Form field label suffix', () => {
  let fixture: ComponentFixture<LabelSuffixTestHostComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({ imports: [LabelSuffixTestHostComponent] }).compileComponents();
    fixture = TestBed.createComponent(LabelSuffixTestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('projects interactive help beside the label without focusing the input', () => {
    const root = fixture.nativeElement as HTMLElement;
    const label = root.querySelector('label')!;
    const button = root.querySelector('button')!;
    const input = root.querySelector('input')!;
    expect(button.parentElement).toBe(label.parentElement);
    expect(button.parentElement?.className).toBe('ids-form-field__label-wrapper');
    expect(label.contains(button)).toBe(false);
    expect(label.htmlFor).toBe(input.id);
    expect(root.querySelector('.ids-form-field__infix')?.contains(button)).toBe(false);

    button.click();
    expect(fixture.componentInstance.helpClicks).toBe(1);
    expect(document.activeElement).not.toBe(input);
  });

  it('keeps help available while displaying a validation error', async() => {
    const root = fixture.nativeElement as HTMLElement;
    root.querySelector('input')!.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(root.querySelector('.ids-form-field__message-container')?.textContent).toContain('Name is required');
    expect(root.querySelector('button[idsLabelSuffix]')).toBeTruthy();
  });

  it('removes and restores the suffix slot when help is toggled', () => {
    const root = fixture.nativeElement as HTMLElement;
    fixture.componentInstance.showHelp = false;
    fixture.detectChanges();
    expect(root.querySelector('[idsLabelSuffix]')).toBeNull();
    expect(root.querySelector('label')?.textContent).toContain('Name');

    fixture.componentInstance.showHelp = true;
    fixture.detectChanges();
    expect(root.querySelector('button[idsLabelSuffix]')).toBeTruthy();
  });
});

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

  it('keeps the field and messages outside the label wrapper when no suffix is provided', () => {
    const field = (fixture.nativeElement as HTMLElement).querySelector('ids-form-field')!;
    expect(Array.from(field.children, (child) => child.className)).toEqual([
      'ids-form-field__label-wrapper',
      'ids-form-field__field-wrapper',
      'ids-form-field__subscript-wrapper',
    ]);
    expect(field.querySelector('.ids-form-field__label-wrapper > label')).toBeTruthy();
    expect(field.querySelector('[idsLabelSuffix]')).toBeNull();
  });
});
