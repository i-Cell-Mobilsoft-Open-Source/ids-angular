import { IDS_CHECKBOX_DEFAULT_CONFIG, IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY } from './checkbox-defaults';
import { IdsCheckboxComponent } from './checkbox.component';
import { IdsCheckBoxChangeEvent } from './types/checkbox-events.class';
import { IDS_CHECKBOX_PARENT } from './types/checkbox-parent';
import { IdsCheckboxState } from './types/checkbox-state.type';
import { IdsCheckboxVariant, IdsCheckboxVariantType } from './types/checkbox-variant.type';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, signal, Type, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsErrorMessageComponent, IdsHintMessageComponent, IdsValidators } from '@i-cell/ids-angular/forms';
import { axe } from 'jest-axe';

@Component({
  imports: [IdsCheckboxComponent],
  template: `
    <ids-checkbox
      [checked]="checked"
      [indeterminate]="indeterminate"
      [disabled]="disabled"
      [readonly]="readonly"
      [required]="required"
      [size]="size"
      [variant]="variant"
      [value]="value"
      [name]="name"
      [tabIndex]="tabIndex"
      [aria-label]="ariaLabel"
      [aria-labelledby]="ariaLabelledby"
      [aria-describedby]="ariaDescribedby"
      [id]="checkboxId"
      (change)="onChange($event)"
      (indeterminateChange)="onIndeterminateChange($event)"
    >
      Accept terms
    </ids-checkbox>
  `,
})
class BasicHostComponent {
  public checkbox = viewChild.required(IdsCheckboxComponent);
  public checked = false;
  public indeterminate = false;
  public disabled = false;
  public readonly = false;
  public required = false;
  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsCheckboxVariantType = IdsCheckboxVariant.SURFACE;
  public value: unknown = undefined;
  public name: string | null = null;
  public tabIndex: number | string = 0;
  public ariaLabel = '';
  public ariaLabelledby: string | null = null;
  public ariaDescribedby = '';
  public checkboxId: string | undefined = undefined;
  public onChange = jest.fn<void, [IdsCheckBoxChangeEvent]>();
  public onIndeterminateChange = jest.fn<void, [boolean]>();
}

@Component({
  imports: [
    IdsCheckboxComponent,
    ReactiveFormsModule,
    IdsErrorMessageComponent,
    IdsHintMessageComponent,
  ],
  template: `
    <ids-checkbox [formControl]="control" [readonly]="readonly" [indeterminate]="indeterminate">
      Agree
      <ids-hint-message>Hint text</ids-hint-message>
      <ids-error-message>Error text</ids-error-message>
    </ids-checkbox>
  `,
})
class ReactiveHostComponent {
  public checkbox = viewChild.required(IdsCheckboxComponent);
  public control = new FormControl<boolean | null>(false);
  public readonly = false;
  public indeterminate = false;
}

@Component({
  imports: [
    IdsCheckboxComponent,
    IdsHintMessageComponent,
  ],
  template: `
    <ids-checkbox>
      Plain
      <ids-hint-message>Plain hint</ids-hint-message>
    </ids-checkbox>
  `,
})
class PlainHintHostComponent {}

@Component({
  imports: [
    IdsCheckboxComponent,
    FormsModule,
  ],
  template: `
    <ids-checkbox [required]="required" [(ngModel)]="model">Agree</ids-checkbox>
  `,
})
class NgModelHostComponent {
  public ngModel = viewChild.required(NgModel);
  public model = false;
  public required = false;
}

@Component({
  imports: [
    IdsCheckboxComponent,
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form">
      <ids-checkbox formControlName="accepted" [required]="true">Agree</ids-checkbox>
    </form>
  `,
})
class FormControlNameHostComponent {
  public form = new FormGroup({ accepted: new FormControl(false) });
}

const fakeParent = {
  size: signal<IdsSizeType | null>(null),
  variant: signal<IdsCheckboxVariantType | null>(null),
};

@Component({
  imports: [IdsCheckboxComponent],
  providers: [{ provide: IDS_CHECKBOX_PARENT, useValue: fakeParent }],
  template: `
    <ids-checkbox>Child</ids-checkbox>
  `,
})
class ParentHostComponent {}

const customTabIndex = 5;
const numericValue = 42;

let element: HTMLElement;

async function render<T>(fixture: ComponentFixture<T>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

async function setup<T>(hostType: Type<T>): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({
    imports: [hostType],
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(hostType);
  element = fixture.nativeElement as HTMLElement;
  await render(fixture);
  return fixture;
}

function nativeInput(): HTMLInputElement {
  return element.querySelector<HTMLInputElement>('input')!;
}

function checkboxElement(): HTMLElement {
  return element.querySelector<HTMLElement>('ids-checkbox')!;
}

function touchTarget(): HTMLElement {
  return element.querySelector<HTMLElement>('.ids-checkbox__touch-target')!;
}

describe('IdsCheckboxComponent rendering', () => {
  let fixture: ComponentFixture<BasicHostComponent>;
  let host: BasicHostComponent;

  beforeEach(async() => {
    fixture = await setup(BasicHostComponent);
    host = fixture.componentInstance;
  });

  it('should create with the default configuration', () => {
    expect(host.checkbox()).toBeTruthy();
    expect(checkboxElement().classList.contains('ids-checkbox')).toBe(true);
    expect(checkboxElement().classList.contains('ids-checkbox-compact')).toBe(true);
    expect(checkboxElement().classList.contains('ids-checkbox-surface')).toBe(true);
    expect(checkboxElement().classList.contains('ids-checkbox-disabled')).toBe(false);
  });

  it('should render a native checkbox input', () => {
    expect(nativeInput().type).toBe('checkbox');
  });

  it('should render the projected label', () => {
    expect(element.querySelector('.ids-checkbox__label')?.textContent?.trim()).toBe('Accept terms');
  });

  it('should generate a unique id and derive the input id from it', () => {
    expect(checkboxElement().id).toMatch(/^ids-checkbox-\d+$/);
    expect(nativeInput().id).toBe(`${checkboxElement().id}-input`);
  });

  it('should use the provided id', async() => {
    host.checkboxId = 'custom-checkbox';
    await render(fixture);

    expect(checkboxElement().id).toBe('custom-checkbox');
    expect(nativeInput().id).toBe('custom-checkbox-input');
  });

  it.each([
    IdsSize.COMPACT,
    IdsSize.COMFORTABLE,
  ])('should apply the %s size class', async(size) => {
    host.size = size;
    await render(fixture);

    expect(checkboxElement().classList.contains(`ids-checkbox-${size}`)).toBe(true);
  });

  it.each(Object.values(IdsCheckboxVariant))('should apply the %s variant class', async(variant) => {
    host.variant = variant;
    await render(fixture);

    expect(checkboxElement().classList.contains(`ids-checkbox-${variant}`)).toBe(true);
  });

  it('should add the disabled class when disabled', async() => {
    host.disabled = true;
    await render(fixture);

    expect(checkboxElement().classList.contains('ids-checkbox-disabled')).toBe(true);
  });

  it('should add the disabled class when readonly', async() => {
    host.readonly = true;
    await render(fixture);

    expect(checkboxElement().classList.contains('ids-checkbox-disabled')).toBe(true);
  });

  it('should pass the name and a string value to the native input', async() => {
    host.name = 'terms';
    host.value = 'yes';
    await render(fixture);

    expect(nativeInput().name).toBe('terms');
    expect(nativeInput().value).toBe('yes');
  });

  it('should not pass a non string value to the native input', async() => {
    host.value = numericValue;
    await render(fixture);

    expect(nativeInput().value).not.toBe(String(numericValue));
  });
});

describe('IdsCheckboxComponent states', () => {
  let fixture: ComponentFixture<BasicHostComponent>;
  let host: BasicHostComponent;

  beforeEach(async() => {
    fixture = await setup(BasicHostComponent);
    host = fixture.componentInstance;
  });

  it('should be unchecked by default without icons', () => {
    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
    expect(nativeInput().checked).toBe(false);
    expect(element.querySelector('ids-icon')).toBeNull();
  });

  it('should reflect the checked input with a done icon', async() => {
    host.checked = true;
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
    expect(nativeInput().checked).toBe(true);
    expect(nativeInput().classList.contains('ids-checkbox--selected')).toBe(true);
    expect(element.querySelector('ids-icon[fontIcon="done"]')).not.toBeNull();
  });

  it('should reflect the indeterminate input with a remove icon', async() => {
    host.indeterminate = true;
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.INDETERMINATE);
    expect(nativeInput().indeterminate).toBe(true);
    expect(element.querySelector('ids-icon[fontIcon="remove"]')).not.toBeNull();
  });

  it('should prefer the indeterminate state over the checked state', async() => {
    host.checked = true;
    host.indeterminate = true;
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.INDETERMINATE);
  });

  it('should become unchecked when the checked input is cleared', async() => {
    host.checked = true;
    await render(fixture);
    host.checked = false;
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
  });

  it('should become unchecked when only the indeterminate input is cleared', async() => {
    host.indeterminate = true;
    await render(fixture);
    host.indeterminate = false;
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
  });

  it('should render the required marker when required', async() => {
    expect(element.querySelector('.ids-form-field__required-marker')).toBeNull();

    host.required = true;
    await render(fixture);

    expect(element.querySelector('.ids-form-field__required-marker')).not.toBeNull();
    expect(nativeInput().required).toBe(true);
  });
});

describe('IdsCheckboxComponent user interaction', () => {
  let fixture: ComponentFixture<BasicHostComponent>;
  let host: BasicHostComponent;

  beforeEach(async() => {
    fixture = await setup(BasicHostComponent);
    host = fixture.componentInstance;
  });

  it('should check when the input is clicked and emit the change event', async() => {
    host.value = 'yes';
    await render(fixture);

    nativeInput().click();
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
    expect(nativeInput().checked).toBe(true);
    expect(host.onChange).toHaveBeenCalledTimes(1);
    expect(host.onChange).toHaveBeenCalledWith(expect.objectContaining({
      source: host.checkbox(),
      checked: true,
      value: 'yes',
    }));
  });

  it('should uncheck when the input is clicked twice', async() => {
    nativeInput().click();
    nativeInput().click();
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
    expect(host.onChange).toHaveBeenLastCalledWith(expect.objectContaining({ checked: false }));
  });

  it('should become checked and emit indeterminateChange when clicked while indeterminate', async() => {
    host.indeterminate = true;
    await render(fixture);

    nativeInput().click();
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
    expect(nativeInput().indeterminate).toBe(false);
    expect(host.onIndeterminateChange).toHaveBeenCalledWith(false);
  });

  it('should not emit indeterminateChange when it was not indeterminate', () => {
    nativeInput().click();

    expect(host.onIndeterminateChange).not.toHaveBeenCalled();
  });

  it('should toggle once when the label is clicked', async() => {
    element.querySelector<HTMLElement>('.ids-checkbox__label')!.click();
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
    expect(host.onChange).toHaveBeenCalledTimes(1);
  });

  it('should toggle when the label wrapper is clicked', async() => {
    element.querySelector<HTMLElement>('.ids-checkbox__label-wrapper')!.click();
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
  });

  it('should toggle and focus the input when the touch target is clicked', async() => {
    touchTarget().click();
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
    expect(document.activeElement).toBe(nativeInput());
  });
});

describe('IdsCheckboxComponent readonly and disabled interaction', () => {
  let fixture: ComponentFixture<BasicHostComponent>;
  let host: BasicHostComponent;

  beforeEach(async() => {
    fixture = await setup(BasicHostComponent);
    host = fixture.componentInstance;
  });

  it('should keep a checked readonly checkbox checked', async() => {
    host.checked = true;
    host.readonly = true;
    await render(fixture);

    nativeInput().click();

    expect(nativeInput().checked).toBe(true);
    expect(host.onChange).not.toHaveBeenCalled();
  });

  it('should keep an unchecked readonly checkbox unchecked', async() => {
    host.readonly = true;
    await render(fixture);

    nativeInput().click();

    expect(nativeInput().checked).toBe(false);
    expect(host.onChange).not.toHaveBeenCalled();
  });

  it('should keep an indeterminate readonly checkbox indeterminate', async() => {
    host.indeterminate = true;
    host.readonly = true;
    await render(fixture);

    nativeInput().click();

    expect(nativeInput().indeterminate).toBe(true);
    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.INDETERMINATE);
  });

  it('should not react to the input click handler when disabled', async() => {
    host.disabled = true;
    await render(fixture);

    host.checkbox().onInputClick();

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
    expect(host.onChange).not.toHaveBeenCalled();
  });

  it('should not toggle or focus through the touch target when disabled', async() => {
    host.disabled = true;
    await render(fixture);

    touchTarget().click();

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
    expect(document.activeElement).not.toBe(nativeInput());
  });

  it('should not toggle or focus through the touch target when readonly', async() => {
    host.readonly = true;
    await render(fixture);

    touchTarget().click();

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
    expect(document.activeElement).not.toBe(nativeInput());
  });
});

describe('IdsCheckboxComponent public API', () => {
  let fixture: ComponentFixture<BasicHostComponent>;
  let host: BasicHostComponent;

  beforeEach(async() => {
    fixture = await setup(BasicHostComponent);
    host = fixture.componentInstance;
  });

  it('should toggle between unchecked and checked', () => {
    host.checkbox().toggle();
    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);

    host.checkbox().toggle();
    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
  });

  it('should become checked when toggled while indeterminate', async() => {
    host.indeterminate = true;
    await render(fixture);

    host.checkbox().toggle();

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
  });

  it('should select and deselect', () => {
    host.checkbox().select();
    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);

    host.checkbox().deselect();
    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
  });

  it('should focus the native input', () => {
    host.checkbox().focus();

    expect(document.activeElement).toBe(nativeInput());
  });

  it('should update the disabled state through setDisabledState', async() => {
    host.checkbox().setDisabledState!(true);
    await render(fixture);

    expect(host.checkbox().disabled()).toBe(true);
    expect(nativeInput().disabled).toBe(true);
  });

  it('should mark the control as touched asynchronously on blur', async() => {
    const onTouched = jest.fn();
    host.checkbox().registerOnTouched(onTouched);

    nativeInput().dispatchEvent(new Event('blur'));
    await fixture.whenStable();

    expect(onTouched).toHaveBeenCalledTimes(1);
  });

  it('should not change its state on blur when no touched callback is registered', async() => {
    nativeInput().dispatchEvent(new Event('blur'));
    await fixture.whenStable();

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
  });
});

describe('IdsCheckboxComponent parent configuration', () => {
  beforeEach(() => {
    fakeParent.size.set(null);
    fakeParent.variant.set(null);
  });

  it('should use the size and variant of the parent when provided', async() => {
    fakeParent.size.set(IdsSize.COMFORTABLE);
    fakeParent.variant.set(IdsCheckboxVariant.DARK);
    await setup(ParentHostComponent);

    expect(checkboxElement().classList.contains('ids-checkbox-comfortable')).toBe(true);
    expect(checkboxElement().classList.contains('ids-checkbox-dark')).toBe(true);
  });

  it('should fall back to its own size and variant when the parent has none', async() => {
    await setup(ParentHostComponent);

    expect(checkboxElement().classList.contains('ids-checkbox-compact')).toBe(true);
    expect(checkboxElement().classList.contains('ids-checkbox-surface')).toBe(true);
  });
});

describe('IdsCheckboxComponent reactive forms', () => {
  let fixture: ComponentFixture<ReactiveHostComponent>;
  let host: ReactiveHostComponent;

  beforeEach(async() => {
    fixture = await setup(ReactiveHostComponent);
    host = fixture.componentInstance;
  });

  it('should write the control value to the checkbox', async() => {
    host.control.setValue(true);
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
    expect(nativeInput().checked).toBe(true);
  });

  it('should write a falsy control value as unchecked', async() => {
    host.control.setValue(true);
    host.control.setValue(null);
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
  });

  it('should keep the indeterminate state when a value is written', async() => {
    host.indeterminate = true;
    await render(fixture);

    host.control.setValue(true);
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.INDETERMINATE);
  });

  it('should update the control value and dirty state when clicked', async() => {
    nativeInput().click();
    await render(fixture);

    expect(host.control.value).toBe(true);
    expect(host.control.dirty).toBe(true);
  });

  it('should mark the control as touched on blur', async() => {
    nativeInput().dispatchEvent(new Event('blur'));
    await render(fixture);

    expect(host.control.touched).toBe(true);
  });

  it('should disable the checkbox when the control is disabled', async() => {
    host.control.disable();
    await render(fixture);

    expect(nativeInput().disabled).toBe(true);
    expect(host.checkbox().disabled()).toBe(true);
  });
});

describe('IdsCheckboxComponent required validators', () => {
  let fixture: ComponentFixture<ReactiveHostComponent>;
  let host: ReactiveHostComponent;

  beforeEach(async() => {
    fixture = await setup(ReactiveHostComponent);
    host = fixture.componentInstance;
  });

  async function applyValidator(validator: ValidatorFn | null): Promise<void> {
    host.control.setValidators(validator);
    host.control.updateValueAndValidity();
    await render(fixture);
  }

  it('should not be required without a required validator', () => {
    expect(nativeInput().required).toBe(false);
    expect(element.querySelector('.ids-form-field__required-marker')).toBeNull();
  });

  it.each([
    [
      'Validators.required',
      Validators.required,
    ],
    [
      'Validators.requiredTrue',
      Validators.requiredTrue,
    ],
    [
      'IdsValidators.required',
      IdsValidators.required,
    ],
    [
      'IdsValidators.requiredTrue',
      IdsValidators.requiredTrue,
    ],
    [
      'IdsValidators.requiredFalse',
      IdsValidators.requiredFalse,
    ],
  ])('should be required with %s on the control', async(_name, validator) => {
    await applyValidator(validator);

    expect(nativeInput().required).toBe(true);
    expect(element.querySelector('.ids-form-field__required-marker')).not.toBeNull();
  });

  it('should not be required with an unrelated validator', async() => {
    await applyValidator(Validators.nullValidator);

    expect(nativeInput().required).toBe(false);
  });
});

describe('IdsCheckboxComponent required input with other directives', () => {
  it('should throw when the required input is used with formControlName', async() => {
    await TestBed.configureTestingModule({
      imports: [FormControlNameHostComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(FormControlNameHostComponent);

    expect(() => fixture.detectChanges()).toThrow(/formControlName/);
  });

  it('should add requiredTrue to the ngModel control when required', async() => {
    const fixture = await setup(NgModelHostComponent);
    await render(fixture);
    fixture.componentInstance.required = true;
    await render(fixture);
    await render(fixture);

    const control = fixture.componentInstance.ngModel().control;
    expect(control.hasValidator(Validators.requiredTrue)).toBe(true);
    expect(control.invalid).toBe(true);
    expect(nativeInput().required).toBe(true);
  });

  it('should remove requiredTrue from the ngModel control when no longer required', async() => {
    const fixture = await setup(NgModelHostComponent);
    fixture.componentInstance.required = true;
    await render(fixture);
    await render(fixture);
    fixture.componentInstance.required = false;
    await render(fixture);
    await render(fixture);

    expect(fixture.componentInstance.ngModel().control.hasValidator(Validators.requiredTrue)).toBe(false);
  });

  it('should update the ngModel value when clicked', async() => {
    const fixture = await setup(NgModelHostComponent);
    await render(fixture);

    nativeInput().click();
    await render(fixture);

    expect(fixture.componentInstance.model).toBe(true);
  });
});

describe('IdsCheckboxComponent messages', () => {
  let fixture: ComponentFixture<ReactiveHostComponent>;
  let host: ReactiveHostComponent;

  beforeEach(async() => {
    fixture = await setup(ReactiveHostComponent);
    host = fixture.componentInstance;
  });

  function messageContainer(): HTMLElement | null {
    return element.querySelector('.ids-checkbox__message-container');
  }

  it('should show the hint when the control is valid', () => {
    expect(messageContainer()?.textContent).toContain('Hint text');
    expect(messageContainer()?.textContent).not.toContain('Error text');
  });

  it('should show the hint while an invalid control is untouched and pristine', async() => {
    host.control.setValidators(Validators.requiredTrue);
    host.control.updateValueAndValidity();
    await render(fixture);

    expect(messageContainer()?.textContent).toContain('Hint text');
  });

  it('should show the error when an invalid control is touched', async() => {
    host.control.setValidators(Validators.requiredTrue);
    host.control.updateValueAndValidity();
    host.control.markAsTouched();
    await render(fixture);

    expect(messageContainer()?.textContent).toContain('Error text');
    expect(messageContainer()?.textContent).not.toContain('Hint text');
  });

  it('should show the error when an invalid control is dirty', async() => {
    host.control.setValidators(IdsValidators.requiredFalse);
    host.control.updateValueAndValidity();
    await render(fixture);

    nativeInput().click();
    await render(fixture);

    expect(host.control.touched).toBe(false);
    expect(messageContainer()?.textContent).toContain('Error text');
  });

  it('should show the hint instead of the error when disabled', async() => {
    host.control.setValidators(Validators.requiredTrue);
    host.control.updateValueAndValidity();
    host.control.markAsTouched();
    host.control.disable();
    await render(fixture);

    expect(messageContainer()?.textContent).toContain('Hint text');
  });

  it('should show the hint instead of the error when readonly', async() => {
    host.control.setValidators(Validators.requiredTrue);
    host.control.updateValueAndValidity();
    host.control.markAsTouched();
    host.readonly = true;
    await render(fixture);

    expect(messageContainer()?.textContent).toContain('Hint text');
  });

  it('should have no axe violations with the hint', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations with the error', async() => {
    host.control.setValidators(Validators.requiredTrue);
    host.control.updateValueAndValidity();
    host.control.markAsTouched();
    await render(fixture);

    expect(await axe(element)).toHaveNoViolations();
  });
});

describe('IdsCheckboxComponent messages without a control', () => {
  it('should show the hint without a form control', async() => {
    await setup(PlainHintHostComponent);

    expect(element.querySelector('.ids-checkbox__message-container')?.textContent).toContain('Plain hint');
  });

  it('should not render the message container without messages', async() => {
    await setup(BasicHostComponent);

    expect(element.querySelector('.ids-checkbox__message-container')).toBeNull();
  });
});

describe('IdsCheckboxComponent accessibility', () => {
  let fixture: ComponentFixture<BasicHostComponent>;
  let host: BasicHostComponent;

  beforeEach(async() => {
    fixture = await setup(BasicHostComponent);
    host = fixture.componentInstance;
  });

  it('should have no axe violations by default', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });

  it.each([
    [
      'checked',
      'checked',
    ],
    [
      'indeterminate',
      'indeterminate',
    ],
    [
      'disabled',
      'disabled',
    ],
    [
      'readonly',
      'readonly',
    ],
    [
      'required',
      'required',
    ],
  ] as const)('should have no axe violations when %s', async(_name, property) => {
    host[property] = true;
    await render(fixture);

    expect(await axe(element)).toHaveNoViolations();
  });

  it.each(Object.values(IdsCheckboxVariant))('should have no axe violations with the %s variant', async(variant) => {
    host.variant = variant;
    await render(fixture);

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should associate the label with the native input', () => {
    const label = element.querySelector('label')!;

    expect(label.htmlFor).toBe(nativeInput().id);
  });
});

describe('IdsCheckboxComponent accessibility attributes', () => {
  let fixture: ComponentFixture<BasicHostComponent>;
  let host: BasicHostComponent;

  beforeEach(async() => {
    fixture = await setup(BasicHostComponent);
    host = fixture.componentInstance;
  });

  it.each([
    [
      false,
      false,
      'false',
    ],
    [
      true,
      false,
      'true',
    ],
    [
      false,
      true,
      'mixed',
    ],
  ])('should expose aria-checked for checked %p and indeterminate %p as %s', async(checked, indeterminate, expected) => {
    host.checked = checked;
    host.indeterminate = indeterminate;
    await render(fixture);

    expect(nativeInput().getAttribute('aria-checked')).toBe(expected);
  });

  it('should expose aria-readonly only as true when readonly', async() => {
    expect(nativeInput().getAttribute('aria-readonly')).toBe('false');

    host.readonly = true;
    await render(fixture);

    expect(nativeInput().getAttribute('aria-readonly')).toBe('true');
  });

  it('should forward aria-label to the native input and not keep it on the host', async() => {
    host.ariaLabel = 'Terms checkbox';
    await render(fixture);

    expect(nativeInput().getAttribute('aria-label')).toBe('Terms checkbox');
    expect(checkboxElement().hasAttribute('aria-label')).toBe(false);
  });

  it('should not set aria-label when it is empty', () => {
    expect(nativeInput().hasAttribute('aria-label')).toBe(false);
  });

  it('should forward aria-labelledby to the native input and not keep it on the host', async() => {
    host.ariaLabelledby = 'external-label';
    await render(fixture);

    expect(nativeInput().getAttribute('aria-labelledby')).toBe('external-label');
    expect(checkboxElement().hasAttribute('aria-labelledby')).toBe(false);
  });

  it('should forward aria-describedby to the native input', async() => {
    host.ariaDescribedby = 'description-id';
    await render(fixture);

    expect(nativeInput().getAttribute('aria-describedby')).toBe('description-id');
  });

  it('should be reachable with the tab key by default', () => {
    expect(nativeInput().tabIndex).toBe(0);
  });

  it('should use a custom tab index', async() => {
    host.tabIndex = customTabIndex;
    await render(fixture);

    expect(nativeInput().tabIndex).toBe(customTabIndex);
  });

  it('should remove the input from the tab order when disabled', async() => {
    host.disabled = true;
    await render(fixture);

    expect(nativeInput().tabIndex).toBe(-1);
    expect(nativeInput().disabled).toBe(true);
  });

  it('should keep a readonly input reachable with the tab key', async() => {
    host.readonly = true;
    await render(fixture);

    expect(nativeInput().tabIndex).toBe(0);
  });

  it('should hide the decorative icons from assistive technologies', async() => {
    host.checked = true;
    await render(fixture);

    expect(element.querySelector('.ids-checkbox__icon')?.getAttribute('aria-hidden')).toBe('true');
    expect(element.querySelector('ids-icon')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should be focusable programmatically', () => {
    host.checkbox().focus();

    expect(document.activeElement).toBe(nativeInput());
  });
});

describe('IdsCheckboxComponent lifecycle', () => {
  it('should skip syncing the native indeterminate state when the input is not available', async() => {
    await TestBed.configureTestingModule({
      imports: [IdsCheckboxComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(IdsCheckboxComponent);
    (fixture.componentInstance as { indeterminate: unknown }).indeterminate = undefined;

    await render(fixture);

    expect((fixture.nativeElement as HTMLElement).querySelector('input')?.indeterminate).toBe(false);
  });
});

describe('IdsCheckboxComponent default configuration', () => {
  it('should use the factory defaults', () => {
    expect(IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY()).toEqual({
      size: IdsSize.COMPACT,
      variant: IdsCheckboxVariant.SURFACE,
    });
  });

  it('should provide the factory defaults through the injection token', () => {
    TestBed.configureTestingModule({});

    expect(TestBed.inject(IDS_CHECKBOX_DEFAULT_CONFIG)).toEqual(IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY());
  });

  it('should apply a partial custom default configuration', async() => {
    await TestBed.configureTestingModule({
      imports: [IdsCheckboxComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: IDS_CHECKBOX_DEFAULT_CONFIG,
          useValue: { variant: IdsCheckboxVariant.DARK },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(IdsCheckboxComponent);
    await render(fixture);

    expect(fixture.componentInstance.variant()).toBe(IdsCheckboxVariant.DARK);
    expect(fixture.componentInstance.size()).toBe(IdsSize.COMPACT);
  });
});
