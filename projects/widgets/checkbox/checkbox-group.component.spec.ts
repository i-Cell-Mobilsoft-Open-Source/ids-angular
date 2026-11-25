import { IdsCheckboxGroupComponent } from './checkbox-group.component';
import { IdsCheckboxComponent } from './checkbox.component';
import { IdsCheckboxState, IdsCheckboxStateType } from './types/checkbox-state.type';
import { IdsCheckboxVariant, IdsCheckboxVariantType } from './types/checkbox-variant.type';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, signal, viewChild, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsErrorMessageComponent, IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { axe } from 'jest-axe';

const { computeAccessibleName } = jest.requireActual<{
  computeAccessibleName: (element: Element) => string,
}>('dom-accessibility-api');

interface Option {
  checked: boolean;
  disabled: boolean;
}

function option(checked: boolean, disabled = false): Option {
  return { checked, disabled };
}

@Component({
  imports: [
    IdsCheckboxGroupComponent,
    IdsCheckboxComponent,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
  ],
  template: `
    <ids-checkbox-group
      [label]="label"
      [parentLabel]="parentLabel"
      [allowParent]="allowParent"
      [showAsterisk]="showAsterisk"
      [size]="size"
      [variant]="variant"
      [orientation]="orientation"
    >
      @if (showHint) {
        <ids-hint-message>Pick any topping</ids-hint-message>
      }
      @for (option of options; track $index) {
        <ids-checkbox [checked]="option.checked" [disabled]="option.disabled">Option {{ $index + 1 }}</ids-checkbox>
      }
      @if (showError) {
        <ids-error-message>Pick at least one topping</ids-error-message>
      }
    </ids-checkbox-group>
  `,
})
class TestHostComponent {
  public group = viewChild.required(IdsCheckboxGroupComponent);
  public checkboxes = viewChildren(IdsCheckboxComponent);
  public label = 'Toppings';
  public parentLabel = 'All toppings';
  public allowParent = true;
  public showAsterisk = false;
  public showHint = false;
  public showError = false;
  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsCheckboxVariantType = IdsCheckboxVariant.SURFACE;
  public orientation: IdsOrientationType = IdsOrientation.VERTICAL;
  public options: Option[] = [
    option(false),
    option(false),
    option(false),
  ];
}

function atLeastOneChecked(group: AbstractControl): ValidationErrors | null {
  return Object.values(group.value as Record<string, boolean>).some(Boolean) ? null : { required: true };
}

@Component({
  imports: [
    IdsCheckboxGroupComponent,
    IdsCheckboxComponent,
    IdsErrorMessageComponent,
    ReactiveFormsModule,
  ],
  template: `
    <form [formGroup]="form">
      <ids-checkbox-group label="Toppings" parentLabel="All toppings">
        <ids-checkbox formControlName="cheese">Cheese</ids-checkbox>
        <ids-checkbox formControlName="ham">Ham</ids-checkbox>
        <ids-error-message>Pick at least one topping</ids-error-message>
      </ids-checkbox-group>
    </form>
  `,
})
class FormHostComponent {
  public group = viewChild.required(IdsCheckboxGroupComponent);
  public form = new FormGroup(
    { cheese: new FormControl(false), ham: new FormControl(false) },
    { validators: atLeastOneChecked },
  );
}

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function render<T>(target: ComponentFixture<T> = fixture as ComponentFixture<T>): Promise<void> {
  target.detectChanges();
  await target.whenStable();
  target.detectChanges();
}

async function set(props: Partial<TestHostComponent>): Promise<void> {
  Object.assign(host, props);
  await render();
}

function groupElement(): HTMLElement {
  return element.querySelector<HTMLElement>('ids-checkbox-group')!;
}

function parentInput(): HTMLInputElement | null {
  return element.querySelector<HTMLInputElement>('.ids-checkbox-group__parent input');
}

function childStates(): IdsCheckboxStateType[] {
  return host.checkboxes().map((checkbox) => checkbox.checkboxState());
}

const { CHECKED, UNCHECKED } = IdsCheckboxState;
const optionCount = 3;

async function setup(): Promise<void> {
  await TestBed.configureTestingModule({
    imports: [
      TestHostComponent,
      FormHostComponent,
    ],
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  await render();
}

describe('IdsCheckboxGroupComponent rendering', () => {
  beforeEach(setup);

  it('should create with the default configuration', () => {
    expect(host.group()).toBeTruthy();
    expect(Array.from(groupElement().classList)).toEqual(expect.arrayContaining([
      'ids-checkbox-group',
      'ids-checkbox-group-compact',
      'ids-checkbox-group-surface',
      'ids-checkbox-group-vertical',
      'ids-checkbox-group-indeterminated',
    ]));
    expect(groupElement().classList).not.toContain('ids-checkbox-group-disabled');
    expect(element.querySelector('.ids-checkbox-group__legend-label')?.textContent?.trim()).toBe('Toppings');
    expect(element.querySelectorAll('.ids-checkbox-group__list ids-checkbox')).toHaveLength(optionCount);
    expect(element.querySelector('.ids-checkbox-group__required-marker')).toBeNull();
    expect(element.querySelector('ids-hint-message')).toBeNull();
  });

  it('should apply the size, variant and orientation to the group and its checkboxes', async() => {
    await set({ size: IdsSize.COMFORTABLE, variant: IdsCheckboxVariant.DARK, orientation: IdsOrientation.HORIZONTAL });

    expect(Array.from(groupElement().classList)).toEqual(expect.arrayContaining([
      'ids-checkbox-group-comfortable',
      'ids-checkbox-group-dark',
      'ids-checkbox-group-horizontal',
    ]));
    element.querySelectorAll('ids-checkbox').forEach((checkbox) => {
      expect(checkbox.classList).toContain('ids-checkbox-comfortable');
      expect(checkbox.classList).toContain('ids-checkbox-dark');
    });
  });

  it('should not render the parent checkbox when allowParent is false', async() => {
    await set({ allowParent: false });

    expect(parentInput()).toBeNull();
    expect(groupElement().classList).not.toContain('ids-checkbox-group-indeterminated');
  });

  it('should render the required marker and the hint message', async() => {
    await set({ showAsterisk: true, showHint: true });

    expect(element.querySelector('.ids-checkbox-group__required-marker')).not.toBeNull();
    expect(element.querySelector('.ids-checkbox-group__hint ids-hint-message')?.textContent).toContain('Pick any topping');
  });
});

describe('IdsCheckboxGroupComponent parent checkbox state', () => {
  beforeEach(setup);

  it.each([
    { name: 'no child is checked', options: [
      option(false),
      option(false),
    ], ariaChecked: 'false', disabled: false },
    { name: 'some children are checked', options: [
      option(true),
      option(false),
    ], ariaChecked: 'mixed', disabled: false },
    { name: 'every child is checked', options: [
      option(true),
      option(true),
    ], ariaChecked: 'true', disabled: false },
    { name: 'every enabled child is checked', options: [
      option(true),
      option(false, true),
    ], ariaChecked: 'true', disabled: false },
    { name: 'every child is disabled', options: [
      option(true, true),
      option(false, true),
    ], ariaChecked: 'mixed', disabled: true },
    { name: 'there are no children', options: [], ariaChecked: 'false', disabled: false },
  ])('should be aria-checked="$ariaChecked" and disabled: $disabled when $name', async({ options, ariaChecked, disabled }) => {
    await set({ options });

    expect(parentInput()!.getAttribute('aria-checked')).toBe(ariaChecked);
    expect(parentInput()!.disabled).toBe(disabled);
    expect(parentInput()!.tabIndex).toBe(disabled ? -1 : 0);
    expect(groupElement().classList.contains('ids-checkbox-group-disabled')).toBe(disabled);
  });

  it('should follow the children when they are clicked', async() => {
    const childInputs = element.querySelectorAll<HTMLInputElement>('.ids-checkbox-group__list input');

    childInputs[0].click();
    await render();
    expect(parentInput()!.getAttribute('aria-checked')).toBe('mixed');

    childInputs.forEach((input, index) => index > 0 && input.click());
    await render();
    expect(parentInput()!.getAttribute('aria-checked')).toBe('true');
  });

  it('should select and deselect every enabled child when clicked', async() => {
    await set({ options: [
      option(false),
      option(false),
      option(false, true),
      option(true, true),
    ] });

    parentInput()!.click();
    await render();
    expect(childStates()).toEqual([
      CHECKED,
      CHECKED,
      UNCHECKED,
      CHECKED,
    ]);
    expect(parentInput()!.getAttribute('aria-checked')).toBe('true');

    parentInput()!.click();
    await render();
    expect(childStates()).toEqual([
      UNCHECKED,
      UNCHECKED,
      UNCHECKED,
      CHECKED,
    ]);
    expect(parentInput()!.getAttribute('aria-checked')).toBe('false');
  });
});

describe('IdsCheckboxGroupComponent error state', () => {
  beforeEach(setup);

  it('should have no error without error messages or without a form control', async() => {
    expect(host.group().hasError()).toBeUndefined();

    await set({ showError: true });

    expect(host.group().hasError()).toBeUndefined();
  });

  describe('in a reactive form', () => {
    let formFixture: ComponentFixture<FormHostComponent>;
    let form: FormGroup;

    beforeEach(async() => {
      formFixture = TestBed.createComponent(FormHostComponent);
      form = formFixture.componentInstance.form;
      element = formFixture.nativeElement as HTMLElement;
      await render(formFixture);
    });

    function hasError(): boolean | undefined {
      return formFixture.componentInstance.group().hasError();
    }

    it('should have no error while the invalid form is untouched and pristine, or once it is valid', async() => {
      expect(form.invalid).toBe(true);
      expect(hasError()).toBeUndefined();

      form.markAllAsTouched();
      form.setValue({ cheese: true, ham: false });
      await render(formFixture);

      expect(hasError()).toBeUndefined();
    });

    it.each([
      [
        'touched',
        (control: AbstractControl): void => control.markAllAsTouched(),
      ],
      [
        'dirty',
        (control: AbstractControl): void => control.markAsDirty(),
      ],
    ])('should have an accessible error when the invalid form is %s', async(_name, interact) => {
      interact(form);
      await render(formFixture);

      expect(hasError()).toBe(true);
      expect(await axe(element)).toHaveNoViolations();
    });
  });
});

describe('IdsCheckboxGroupComponent accessibility', () => {
  beforeEach(setup);

  it('should expose a group named by its label with a named parent checkbox', () => {
    const label = element.querySelector('.ids-checkbox-group__legend-label')!;

    const fieldset = groupElement().querySelector('fieldset')!;

    expect(groupElement().hasAttribute('role')).toBe(false);
    expect(fieldset.firstElementChild?.tagName).toBe('LEGEND');
    expect(computeAccessibleName(fieldset)).toBe('Toppings');
    expect(label.textContent?.trim()).toBe('Toppings');
    expect(element.querySelector(`label[for="${parentInput()!.id}"]`)?.textContent?.trim()).toBe('All toppings');
  });

  it.each<[string, Partial<TestHostComponent>]>([
    [
      'by default',
      {},
    ],
    [
      'with a mixed parent, a required marker, a hint and an error',
      {
        options: [
          option(true),
          option(false),
        ], showAsterisk: true, showHint: true, showError: true,
      },
    ],
    [
      'without a parent checkbox',
      { allowParent: false },
    ],
    [
      'when every child is disabled',
      { options: [
        option(true, true),
        option(false, true),
      ] },
    ],
  ])('should have no axe violations %s', async(_name, props) => {
    await set(props);

    expect(await axe(element)).toHaveNoViolations();
  });
});

@Component({
  imports: [
    IdsCheckboxGroupComponent,
    IdsCheckboxComponent,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    ReactiveFormsModule,
  ],
  template: `
    <span id="external-name">External name</span>
    <ids-checkbox-group parentLabel="Select all" [label]="label()" [showAsterisk]="true" [allowParent]="allowParent()"
      [attr.aria-label]="accessibleName() || null" [attr.aria-labelledby]="labelledBy() || null">
      <ids-hint-message>Instructions</ids-hint-message>
      <ids-checkbox [formControl]="first">Read</ids-checkbox>
      <ids-checkbox [formControl]="second">Write</ids-checkbox>
      <ids-checkbox [formControl]="third">Execute</ids-checkbox>
      <ids-error-message>Error message</ids-error-message>
    </ids-checkbox-group>
  `,
})
class NativeGroupingHostComponent {
  public label = signal('Permissions');
  public allowParent = signal(true);
  public accessibleName = signal('');
  public labelledBy = signal('');
  public first = new FormControl(false, { nonNullable: true });
  public second = new FormControl({ value: false, disabled: true }, { nonNullable: true });
  public third = new FormControl(false, { nonNullable: true });
}

describe('IdsCheckboxGroupComponent native grouping', () => {
  let fixture: ComponentFixture<NativeGroupingHostComponent>;
  let fieldset: HTMLFieldSetElement;

  async function render(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  function parent(): HTMLInputElement {
    return fieldset.querySelector('.ids-checkbox-group__parent input')!;
  }

  beforeEach(async() => {
    fixture = TestBed.createComponent(NativeGroupingHostComponent);
    await render();
    fieldset = fixture.nativeElement.querySelector('fieldset');
  });

  it('names the group using its first legend, excluding the marker and messages', () => {
    expect(fieldset.firstElementChild?.tagName).toBe('LEGEND');
    expect(computeAccessibleName(fieldset)).toBe('Permissions');
    expect(fieldset.querySelector('legend [aria-hidden="true"]')).not.toBeNull();
    expect(fieldset.querySelector('legend ids-hint-message')).toBeNull();
    expect(fieldset.querySelector('legend ids-error-message')).toBeNull();
    expect(fixture.nativeElement.querySelector('ids-checkbox-group').hasAttribute('role')).toBe(false);
    expect(Array.from(fieldset.querySelectorAll('input')).map((input) => computeAccessibleName(input))).toEqual([
      'Select all',
      'Read',
      'Write',
      'Execute',
    ]);
  });

  it('supports an empty visible label without dangling name references', async() => {
    fixture.componentInstance.label.set('');
    await render();
    expect(computeAccessibleName(fieldset)).toBe('');
    expect(fieldset.getAttribute('aria-labelledby')).toBeNull();
  });

  it('forwards changing attribute names and removes stale references', async() => {
    fixture.componentInstance.accessibleName.set('Alternative');
    await render();
    expect(computeAccessibleName(fieldset)).toBe('Alternative');
    fixture.componentInstance.labelledBy.set('external-name');
    await render();
    expect(computeAccessibleName(fieldset)).toBe('External name');
    fixture.componentInstance.accessibleName.set('');
    fixture.componentInstance.labelledBy.set('');
    await render();
    expect(computeAccessibleName(fieldset)).toBe('Permissions');
  });

  it('preserves select-all and indeterminate state without selecting disabled children', async() => {
    fixture.componentInstance.first.setValue(true);
    await render();
    expect(parent().indeterminate).toBe(true);
    parent().click();
    await render();
    expect(fixture.componentInstance.first.value).toBe(true);
    expect(fixture.componentInstance.third.value).toBe(true);
    expect(fixture.componentInstance.second.value).toBe(false);
    expect(parent().checked).toBe(true);
    expect(parent().indeterminate).toBe(false);
    parent().click();
    await render();
    expect(fixture.componentInstance.first.value).toBe(false);
    expect(fixture.componentInstance.third.value).toBe(false);
  });

  it('disables the parent when every child is disabled without disabling the native fieldset', async() => {
    fixture.componentInstance.first.disable();
    fixture.componentInstance.third.disable();
    await render();
    expect(parent().disabled).toBe(true);
    expect(fieldset.disabled).toBe(false);
  });

  it('keeps child form updates working without a parent checkbox', async() => {
    fixture.componentInstance.allowParent.set(false);
    await render();
    expect(fieldset.querySelector('.ids-checkbox-group__parent')).toBeNull();
    const child = fieldset.querySelector<HTMLInputElement>('input')!;
    child.click();
    await render();
    expect(fixture.componentInstance.first.value).toBe(true);
  });
});
