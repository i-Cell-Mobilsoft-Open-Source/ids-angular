import { IDS_FORM_FIELD_DEFAULT_CONFIG, IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY } from './form-field-defaults';
import { IdsFormFieldComponent } from './form-field.component';
import { IDS_FORM_FIELD_CONTROL } from './tokens/form-field-control';
import { IdsFormFieldVariantType } from './types/form-field-variant.type';

import { IdsFormFieldActionDirective } from '../../directives/form-field-action.directive';
import { IdsLabelDirective } from '../../directives/label.directive';
import { IdsPrefixDirective } from '../../directives/prefix.directive';
import { IdsSuffixDirective } from '../../directives/suffix.directive';
import { IdsValidators } from '../../validators';
import { IdsFieldsetRowComponent } from '../fieldset/fieldset-row/fieldset-row.component';
import { IdsFieldsetComponent } from '../fieldset/fieldset.component';
import { IdsInputDirective } from '../input/input.directive';
import { IdsErrorDefinitionDirective } from '../message/error-message/error-definition.directive';
import { IdsErrorMessageComponent } from '../message/error-message/error-message.component';
import { IdsHintMessageComponent } from '../message/hint-message/hint-message.component';
import { IdsSuccessMessageComponent } from '../message/success-message/success-message.component';

import { Component, Directive, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { axe } from 'jest-axe';

@Component({
  imports: [
    ReactiveFormsModule,
    IdsFormFieldComponent,
    IdsFormFieldActionDirective,
    IdsInputDirective,
    IdsLabelDirective,
    IdsPrefixDirective,
    IdsSuffixDirective,
    IdsIconComponent,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    IdsSuccessMessageComponent,
  ],
  template: `
    <ids-form-field [size]="size" [variant]="variant">
      <ids-label>Name</ids-label>
      @if (showHelp) {
        <button idsLabelSuffix type="button" (click)="helpClicks = helpClicks + 1">Help</button>
      }
      @if (leadingIcon) {
        <ids-icon idsLeadingIcon fontIcon="search" />
      }
      @if (prefix) {
        <span idsPrefix>$</span>
      }
      <input
        idsInput
        [formControl]="control"
        [required]="required"
        [readonly]="readonly"
        [canHandleSuccessState]="canHandleSuccessState"
      />
      @if (suffix) {
        <span idsSuffix>kg</span>
      }
      @if (trailingIcon) {
        <ids-icon idsTrailingIcon fontIcon="close" />
      }
      @if (action) {
        <button idsFormFieldAction type="button">Clear</button>
      }
      @if (showError) {
        <ids-error-message>
          <ids-error-def code="required">Name is required</ids-error-def>
        </ids-error-message>
      }
      @if (showSuccess) {
        <ids-success-message>Looks good</ids-success-message>
      }
      @if (showHint) {
        <ids-hint-message>Hint text</ids-hint-message>
      }
    </ids-form-field>
  `,
})
class TestHostComponent {
  public field = viewChild.required(IdsFormFieldComponent);
  public control = new FormControl<string | null>('');
  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsFormFieldVariantType = 'surface';
  public required = false;
  public readonly = false;
  public canHandleSuccessState = false;
  public showHelp = false;
  public helpClicks = 0;
  public leadingIcon = false;
  public prefix = false;
  public suffix = false;
  public trailingIcon = false;
  public action = false;
  public showError = false;
  public showSuccess = false;
  public showHint = false;
}

@Component({
  imports: [
    ReactiveFormsModule,
    IdsFieldsetComponent,
    IdsFieldsetRowComponent,
    IdsFormFieldComponent,
    IdsInputDirective,
    IdsLabelDirective,
  ],
  template: `
    <fieldset idsFieldset legend="Group" size="comfortable" variant="light">
      <ids-fieldset-row>
        <ids-form-field size="compact" variant="surface">
          <ids-label>Name</ids-label>
          <input idsInput [formControl]="control" />
        </ids-form-field>
      </ids-fieldset-row>
    </fieldset>
  `,
})
class FieldsetHostComponent {
  public control = new FormControl('');
}

@Directive({
  selector: 'input[testControl]',
  providers: [
    {
      provide: IDS_FORM_FIELD_CONTROL,
      useExisting: TestControlDirective,
    },
  ],
})
class TestControlDirective {
  public id = signal('custom-control');
  public ngControl = signal(null);
  public disabled = signal<boolean | undefined>(undefined);
  public readonly = signal<boolean | undefined>(undefined);
  public required = signal<boolean | undefined>(undefined);
  public hasErrorState = signal<boolean | undefined>(undefined);
  public hasSuccessState = signal<boolean | undefined>(undefined);
}

@Component({
  imports: [
    IdsFormFieldComponent,
    IdsLabelDirective,
    TestControlDirective,
  ],
  template: `
    <ids-form-field>
      <ids-label>Custom</ids-label>
      <input testControl />
    </ids-form-field>
  `,
})
class CustomControlHostComponent {}

@Component({
  imports: [
    ReactiveFormsModule,
    IdsFormFieldComponent,
    IdsInputDirective,
    IdsLabelDirective,
  ],
  template: `
    <ids-form-field>
      <ids-label>Name</ids-label>
      <input idsInput [disabled]="true" [formControl]="control" />
    </ids-form-field>
  `,
})
class DisabledAttributeHostComponent {
  public control = new FormControl('');
}

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function renderFixture<T>(target: ComponentFixture<T>): Promise<void> {
  target.detectChanges();
  await target.whenStable();
  target.detectChanges();
}

async function render(): Promise<void> {
  await renderFixture(fixture);
  await renderFixture(fixture);
}

async function create(overrides: Partial<TestHostComponent> = {}): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  Object.assign(host, overrides);
  await render();
}

function field(): HTMLElement {
  return element.querySelector<HTMLElement>('ids-form-field')!;
}

function input(): HTMLInputElement {
  return element.querySelector<HTMLInputElement>('input')!;
}

function label(): HTMLLabelElement {
  return element.querySelector<HTMLLabelElement>('label')!;
}

function messages(): HTMLElement | null {
  return element.querySelector<HTMLElement>('.ids-form-field__message-container');
}

const requiredValidators: Record<string, ValidatorFn> = {
  'Validators.required': Validators.required,
  'Validators.requiredTrue': Validators.requiredTrue,
  'IdsValidators.required': IdsValidators.required,
  'IdsValidators.requiredTrue': IdsValidators.requiredTrue,
  'IdsValidators.requiredFalse': IdsValidators.requiredFalse,
};

function required(validator: ValidatorFn): FormControl<string | null> {
  return new FormControl<string | null>('', validator);
}

async function touch(): Promise<void> {
  host.control.markAsTouched();
  await render();
}

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [
      TestHostComponent,
      FieldsetHostComponent,
      CustomControlHostComponent,
      DisabledAttributeHostComponent,
    ],
  }).compileComponents();
});

describe('form field defaults', () => {
  it('should provide the default configuration through the injection token', () => {
    expect(TestBed.inject(IDS_FORM_FIELD_DEFAULT_CONFIG)).toEqual(IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY());
    expect(IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY()).toEqual({ size: 'compact', variant: 'surface' });
  });

  it('should use a provided configuration when no input is set', async() => {
    TestBed.overrideProvider(IDS_FORM_FIELD_DEFAULT_CONFIG, {
      useValue: { size: IdsSize.COMFORTABLE, variant: 'light' },
    });
    const defaultsFixture = TestBed.createComponent(CustomControlHostComponent);
    await renderFixture(defaultsFixture);
    const classes = (defaultsFixture.nativeElement as HTMLElement).querySelector('ids-form-field')!.classList;

    expect(classes.contains('ids-form-field-comfortable')).toBe(true);
    expect(classes.contains('ids-form-field-light')).toBe(true);
  });
});

describe('IdsFormFieldComponent rendering', () => {
  it('should create with the default configuration', async() => {
    await create();
    const classes = field().classList;

    expect(host.field()).toBeTruthy();
    expect(classes.contains('ids-form-field')).toBe(true);
    expect(classes.contains('ids-form-field-compact')).toBe(true);
    expect(classes.contains('ids-form-field-surface')).toBe(true);
    expect(classes.contains('ids-form-field-disabled')).toBe(false);
    expect(classes.contains('ids-form-field-invalid')).toBe(false);
    expect(classes.contains('ids-form-field-valid')).toBe(false);
  });

  it('should render the label, the field and the subscript wrappers in order', async() => {
    await create();

    expect(Array.from(field().children, (child) => child.className)).toEqual([
      'ids-form-field__label-wrapper',
      'ids-form-field__field-wrapper',
      'ids-form-field__subscript-wrapper',
    ]);
    expect(field().querySelector('.ids-form-field__label-wrapper > label')).toBeTruthy();
    expect(field().querySelector('[idsLabelSuffix]')).toBeNull();
  });

  it('should reflect the size and the variant', async() => {
    await create({ size: IdsSize.COMFORTABLE, variant: 'light' });

    expect(field().classList.contains('ids-form-field-comfortable')).toBe(true);
    expect(field().classList.contains('ids-form-field-light')).toBe(true);
  });

  it('should prefer the size and the variant of the parent fieldset', async() => {
    const fieldsetFixture = TestBed.createComponent(FieldsetHostComponent);
    await renderFixture(fieldsetFixture);
    const classes = (fieldsetFixture.nativeElement as HTMLElement).querySelector('ids-form-field')!.classList;

    expect(classes.contains('ids-form-field-comfortable')).toBe(true);
    expect(classes.contains('ids-form-field-light')).toBe(true);
    expect(classes.contains('ids-form-field-compact')).toBe(false);
  });

  it('should project the control into the infix', async() => {
    await create();

    expect(field().querySelector('.ids-form-field__infix > input')).toBe(input());
  });

  it('should not render the optional slots by default', async() => {
    await create();

    [
      '.ids-form-field__leading-icon',
      '.ids-form-field__prefix',
      '.ids-form-field__suffix',
      '.ids-form-field__trailing-icon',
      '.ids-form-field__field-wrapper__action',
      '.ids-form-field__message-container',
    ].forEach((selector) => expect(field().querySelector(selector)).toBeNull());
  });

  it('should render the leading and trailing icons', async() => {
    await create({ leadingIcon: true, trailingIcon: true });

    expect(field().querySelector('.ids-form-field__leading-icon ids-icon')).toBeTruthy();
    expect(field().querySelector('.ids-form-field__trailing-icon ids-icon')).toBeTruthy();
    expect(field().querySelector('.ids-form-field__prefix')).toBeNull();
    expect(field().querySelector('.ids-form-field__suffix')).toBeNull();
  });

  it('should render the prefix and the suffix', async() => {
    await create({ prefix: true, suffix: true });

    expect(field().querySelector('.ids-form-field__prefix')?.textContent).toContain('$');
    expect(field().querySelector('.ids-form-field__suffix')?.textContent).toContain('kg');
    expect(field().querySelector('.ids-form-field__leading-icon')).toBeNull();
    expect(field().querySelector('.ids-form-field__trailing-icon')).toBeNull();
  });

  it('should render the action', async() => {
    await create({ action: true });

    expect(field().querySelector('.ids-form-field__field-wrapper__action button')?.textContent).toBe('Clear');
  });

  it('should expose the origin element for connected overlays', async() => {
    await create();

    expect(host.field().getConnectedOverlayOrigin().nativeElement).toBe(field().querySelector('.ids-form-field__field-wrapper'));
  });
});

describe('IdsFormFieldComponent label', () => {
  it('should project interactive help beside the label without focusing the input', async() => {
    await create({ showHelp: true });
    const button = element.querySelector('button')!;

    expect(button.parentElement).toBe(label().parentElement);
    expect(button.parentElement?.className).toBe('ids-form-field__label-wrapper');
    expect(label().contains(button)).toBe(false);
    expect(field().querySelector('.ids-form-field__infix')?.contains(button)).toBe(false);

    button.click();

    expect(host.helpClicks).toBe(1);
    expect(document.activeElement).not.toBe(input());
  });

  it('should remove and restore the suffix slot when the help is toggled', async() => {
    await create({ showHelp: true });

    host.showHelp = false;
    await render();
    expect(element.querySelector('[idsLabelSuffix]')).toBeNull();
    expect(label().textContent).toContain('Name');

    host.showHelp = true;
    await render();
    expect(element.querySelector('button[idsLabelSuffix]')).toBeTruthy();
  });

  it('should keep the help available while displaying a validation error', async() => {
    await create({ showHelp: true, showError: true, control: required(Validators.required) });

    await touch();

    expect(messages()?.textContent).toContain('Name is required');
    expect(element.querySelector('button[idsLabelSuffix]')).toBeTruthy();
  });

  it('should not render the required marker without a required validator', async() => {
    await create();

    expect(label().querySelector('.ids-form-field__required-marker')).toBeNull();
  });

  it('should render the required marker when the control is required by input', async() => {
    await create({ required: true });

    expect(label().querySelector('.ids-form-field__required-marker')).not.toBeNull();
  });

  it.each(Object.keys(requiredValidators))('should render the required marker with %s', async(name) => {
    await create({ control: required(requiredValidators[name]) });

    expect(label().querySelector('.ids-form-field__required-marker')).not.toBeNull();
  });

  it('should follow the validators added after the initialization', async() => {
    await create();

    host.control.addValidators(Validators.required);
    host.control.updateValueAndValidity();
    await render();

    expect(label().querySelector('.ids-form-field__required-marker')).not.toBeNull();
  });
});

describe('IdsFormFieldComponent states', () => {
  it('should reflect the disabled state of the control', async() => {
    await create();

    host.control.disable();
    await render();

    expect(field().classList.contains('ids-form-field-disabled')).toBe(true);
    expect(host.field().disabled()).toBe(true);
    expect(input().disabled).toBe(true);
  });

  it('should reflect the readonly state of the control', async() => {
    await create({ readonly: true });

    expect(host.field().readonly()).toBe(true);
    expect(input().readOnly).toBe(true);
  });

  it('should not be invalid before the control is touched', async() => {
    await create({ control: required(Validators.required) });

    expect(field().classList.contains('ids-form-field-invalid')).toBe(false);
  });

  it('should be invalid when the touched control is invalid', async() => {
    await create({ control: required(Validators.required) });

    await touch();

    expect(field().classList.contains('ids-form-field-invalid')).toBe(true);
    expect(field().classList.contains('ids-form-field-valid')).toBe(false);
  });

  it('should not be valid without success state handling', async() => {
    await create({ control: new FormControl('value') });

    await touch();

    expect(field().classList.contains('ids-form-field-valid')).toBe(false);
  });

  it('should be valid when the touched control is valid and the success state is handled', async() => {
    await create({ control: new FormControl('value'), canHandleSuccessState: true });

    await touch();

    expect(field().classList.contains('ids-form-field-valid')).toBe(true);
    expect(field().classList.contains('ids-form-field-invalid')).toBe(false);
  });
});

describe('IdsFormFieldComponent messages', () => {
  it('should render the hint message', async() => {
    await create({ showHint: true });

    expect(messages()?.querySelector('ids-hint-message')?.textContent).toContain('Hint text');
  });

  it('should not render the message container without messages to display', async() => {
    await create({ showError: true, showSuccess: true });

    expect(messages()).toBeNull();
    expect(element.querySelector('ids-error-message')).toBeNull();
    expect(element.querySelector('ids-success-message')).toBeNull();
  });

  it('should render the error message only in an error state', async() => {
    await create({ showError: true, control: required(Validators.required) });
    expect(element.querySelector('ids-error-message')).toBeNull();

    await touch();

    expect(messages()?.querySelector('ids-error-message')?.textContent).toContain('Name is required');
  });

  it('should render the error message together with the hint', async() => {
    await create({ showError: true, showHint: true, control: required(Validators.required) });

    await touch();

    expect(messages()?.querySelector('ids-error-message')).toBeTruthy();
    expect(messages()?.querySelector('ids-hint-message')).toBeTruthy();
  });

  it('should not render an error state without an error message', async() => {
    await create({ showSuccess: true, control: required(Validators.required), canHandleSuccessState: true });

    await touch();

    expect(field().classList.contains('ids-form-field-invalid')).toBe(true);
    expect(messages()).toBeNull();
  });

  it('should render the success message only in a success state', async() => {
    await create({ showSuccess: true, control: new FormControl('value'), canHandleSuccessState: true });
    expect(element.querySelector('ids-success-message')).toBeNull();

    await touch();

    expect(messages()?.querySelector('ids-success-message')?.textContent).toContain('Looks good');
  });

  it('should prefer the success message over the error message when only the success state is active', async() => {
    await create({ showError: true, showSuccess: true, control: new FormControl('value'), canHandleSuccessState: true });

    await touch();

    expect(messages()?.querySelector('ids-success-message')).toBeTruthy();
    expect(messages()?.querySelector('ids-error-message')).toBeNull();
  });
});

describe('IdsFormFieldControl integration', () => {
  it('should disable the control with the disabled attribute', async() => {
    jest.spyOn(console, 'warn').mockImplementation();
    const disabledFixture = TestBed.createComponent(DisabledAttributeHostComponent);
    await renderFixture(disabledFixture);
    await renderFixture(disabledFixture);
    const classes = (disabledFixture.nativeElement as HTMLElement).querySelector('ids-form-field')!.classList;

    expect(disabledFixture.componentInstance.control.disabled).toBe(true);
    expect(classes.contains('ids-form-field-disabled')).toBe(true);
    jest.restoreAllMocks();
  });

  it('should set and remove the described by ids on the control', async() => {
    await create();
    const control = fixture.debugElement.query(By.directive(IdsInputDirective)).injector.get(IdsInputDirective);

    control.setDescribedByIds([
      'first',
      'second',
    ]);
    expect(input().getAttribute('aria-describedby')).toBe('first second');

    control.setDescribedByIds([]);
    expect(input().hasAttribute('aria-describedby')).toBe(false);
  });

  it('should stop tracking the success state when it is turned off', async() => {
    await create({ control: new FormControl('value'), canHandleSuccessState: true });
    await touch();
    expect(field().classList.contains('ids-form-field-valid')).toBe(true);

    host.canHandleSuccessState = false;
    await render();

    expect(field().classList.contains('ids-form-field-valid')).toBe(false);
  });
});

describe('IdsFormFieldComponent container click', () => {
  it('should focus the control when the container is clicked', async() => {
    await create();

    field().querySelector<HTMLElement>('.ids-form-field__field-wrapper__container')!.click();

    expect(document.activeElement).toBe(input());
  });

  it('should not focus a readonly control when the container is clicked', async() => {
    await create({ readonly: true });

    field().querySelector<HTMLElement>('.ids-form-field__field-wrapper__container')!.click();

    expect(document.activeElement).not.toBe(input());
  });

  it('should not fail when the control does not handle the container click', async() => {
    const customFixture = TestBed.createComponent(CustomControlHostComponent);
    await renderFixture(customFixture);
    const container = (customFixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.ids-form-field__field-wrapper__container')!;

    expect(() => container.click()).not.toThrow();
  });
});

describe('IdsFormFieldComponent with a custom control', () => {
  let customFixture: ComponentFixture<CustomControlHostComponent>;
  let control: TestControlDirective;

  async function renderCustom(): Promise<void> {
    await renderFixture(customFixture);
  }

  beforeEach(async() => {
    customFixture = TestBed.createComponent(CustomControlHostComponent);
    await renderCustom();
    control = customFixture.debugElement.query(By.directive(TestControlDirective)).injector.get(TestControlDirective);
  });

  it('should link the label to the control id', () => {
    expect((customFixture.nativeElement as HTMLElement).querySelector('label')?.htmlFor).toBe('custom-control');
  });

  it('should have no control directive and no required validator', () => {
    const formField = customFixture.debugElement.query(By.directive(IdsFormFieldComponent)).componentInstance as IdsFormFieldComponent;

    expect(formField.controlDir()).toBeNull();
    expect(formField.hasRequiredValidator()).toBeFalsy();
    expect(formField.disabled()).toBe(false);
    expect(formField.readonly()).toBe(false);
  });

  it('should follow the state of the control', async() => {
    const formField = customFixture.debugElement.query(By.directive(IdsFormFieldComponent)).componentInstance as IdsFormFieldComponent;
    control.disabled.set(true);
    control.readonly.set(true);
    control.hasErrorState.set(true);
    await renderCustom();

    expect(formField.disabled()).toBe(true);
    expect(formField.readonly()).toBe(true);
    expect(customFixture.nativeElement.querySelector('ids-form-field').classList.contains('ids-form-field-invalid')).toBe(true);
  });

  it('should be valid when the control has a success state', async() => {
    control.hasSuccessState.set(true);
    await renderCustom();

    expect(customFixture.nativeElement.querySelector('ids-form-field').classList.contains('ids-form-field-valid')).toBe(true);
  });
});

describe('IdsFormFieldComponent accessibility', () => {
  it('should link the label to the input', async() => {
    await create();

    expect(label().htmlFor).toBe(input().id);
    expect(input().id).toBeTruthy();
    expect(label().textContent).toContain('Name');
  });

  it('should keep the label suffix outside of the label', async() => {
    await create({ showHelp: true });

    expect(label().contains(element.querySelector('button[idsLabelSuffix]'))).toBe(false);
  });

  it('should disable the native input when the control is disabled', async() => {
    await create();

    host.control.disable();
    await render();

    expect(input().hasAttribute('disabled')).toBe(true);
  });

  it('should expose the readonly state on the native input', async() => {
    await create({ readonly: true });

    expect(input().hasAttribute('readonly')).toBe(true);
  });

  it('should hide the decorative icons from assistive technologies', async() => {
    await create({ leadingIcon: true, trailingIcon: true });

    element.querySelectorAll('ids-icon').forEach((icon) => {
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('should have no axe violations by default', async() => {
    await create();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations with all the slots', async() => {
    await create({
      showHelp: true,
      leadingIcon: true,
      prefix: true,
      suffix: true,
      trailingIcon: true,
      action: true,
      showHint: true,
    });

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations with an error message', async() => {
    await create({ showError: true, control: required(Validators.required) });

    await touch();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations with a success message', async() => {
    await create({ showSuccess: true, control: new FormControl('value'), canHandleSuccessState: true });

    await touch();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when required', async() => {
    await create({ required: true });

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when disabled', async() => {
    await create();

    host.control.disable();
    await render();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when readonly', async() => {
    await create({ readonly: true });

    expect(await axe(element)).toHaveNoViolations();
  });
});
