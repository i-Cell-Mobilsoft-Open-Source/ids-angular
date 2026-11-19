import { IDS_CHECKBOX_DEFAULT_CONFIG, IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY } from './checkbox-defaults';
import { IdsCheckboxComponent } from './checkbox.component';
import { IdsCheckBoxChangeEvent } from './types/checkbox-events.class';
import { IDS_CHECKBOX_PARENT } from './types/checkbox-parent';
import { IdsCheckboxState, IdsCheckboxStateType } from './types/checkbox-state.type';
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

/** Every visual state, variant and labelling technique side by side, so one axe run audits them all. */
@Component({
  imports: [IdsCheckboxComponent],
  template: `
    <ids-checkbox>Default</ids-checkbox>
    <ids-checkbox [checked]="true">Checked</ids-checkbox>
    <ids-checkbox [indeterminate]="true">Indeterminate</ids-checkbox>
    <ids-checkbox [disabled]="true">Disabled</ids-checkbox>
    <ids-checkbox [readonly]="true" [checked]="true">Readonly</ids-checkbox>
    <ids-checkbox [required]="true">Required</ids-checkbox>
    <ids-checkbox variant="light">Light variant</ids-checkbox>
    <ids-checkbox variant="dark" size="comfortable">Dark comfortable variant</ids-checkbox>
    <ids-checkbox aria-label="Labelled by aria-label" />
    <span id="external-label">Labelled by aria-labelledby</span>
    <ids-checkbox aria-labelledby="external-label" />
  `,
})
class AllStatesHostComponent {}

const customTabIndex = 5;
const numericValue = 42;
const allStatesCount = 10;

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

function messageContainer(): HTMLElement | null {
  return element.querySelector('.ids-checkbox__message-container');
}

function requiredMarker(): HTMLElement | null {
  return element.querySelector('.ids-form-field__required-marker');
}

/** Shared setup for the specs that drive the component through {@link BasicHostComponent}. */
function useBasicHost(): {
  fixture: () => ComponentFixture<BasicHostComponent>;
  host: () => BasicHostComponent;
  set: (props: Partial<BasicHostComponent>) => Promise<void>;
} {
  let fixture: ComponentFixture<BasicHostComponent>;

  beforeEach(async() => {
    fixture = await setup(BasicHostComponent);
  });

  return {
    fixture: () => fixture,
    host: () => fixture.componentInstance,
    set: async(props): Promise<void> => {
      Object.assign(fixture.componentInstance, props);
      await render(fixture);
    },
  };
}

describe('IdsCheckboxComponent rendering', () => {
  const { host, set } = useBasicHost();

  it('should render with the default configuration', () => {
    expect(host().checkbox()).toBeTruthy();
    expect(checkboxElement().classList).toContain('ids-checkbox');
    expect(checkboxElement().classList).toContain('ids-checkbox-compact');
    expect(checkboxElement().classList).toContain('ids-checkbox-surface');
    expect(checkboxElement().classList).not.toContain('ids-checkbox-disabled');
    expect(checkboxElement().id).toMatch(/^ids-checkbox-\d+$/);
    expect(nativeInput().type).toBe('checkbox');
    expect(nativeInput().id).toBe(`${checkboxElement().id}-input`);
    expect(element.querySelector('.ids-checkbox__label')?.textContent?.trim()).toBe('Accept terms');
    expect(messageContainer()).toBeNull();
  });

  it('should use the provided id for the host and the native input', async() => {
    await set({ checkboxId: 'custom-checkbox' });

    expect(checkboxElement().id).toBe('custom-checkbox');
    expect(nativeInput().id).toBe('custom-checkbox-input');
  });

  it.each([
    { size: IdsSize.COMFORTABLE, variant: IdsCheckboxVariant.LIGHT },
    { size: IdsSize.COMPACT, variant: IdsCheckboxVariant.DARK },
  ])('should apply the $size size and the $variant variant classes', async({ size, variant }) => {
    await set({ size, variant });

    expect(checkboxElement().classList.contains(`ids-checkbox-${size}`)).toBe(true);
    expect(checkboxElement().classList.contains(`ids-checkbox-${variant}`)).toBe(true);
  });

  it('should pass the name and only string values to the native input', async() => {
    await set({ name: 'terms', value: 'yes' });

    expect(nativeInput().name).toBe('terms');
    expect(nativeInput().value).toBe('yes');

    await set({ value: numericValue });

    expect(nativeInput().value).not.toBe(String(numericValue));
  });
});

describe('IdsCheckboxComponent states', () => {
  const { host, set } = useBasicHost();

  it.each<{ checked: boolean; indeterminate: boolean; state: IdsCheckboxStateType; icon: string | null; ariaChecked: string }>([
    { checked: false, indeterminate: false, state: IdsCheckboxState.UNCHECKED, icon: null, ariaChecked: 'false' },
    { checked: true, indeterminate: false, state: IdsCheckboxState.CHECKED, icon: 'done', ariaChecked: 'true' },
    { checked: false, indeterminate: true, state: IdsCheckboxState.INDETERMINATE, icon: 'remove', ariaChecked: 'mixed' },
    { checked: true, indeterminate: true, state: IdsCheckboxState.INDETERMINATE, icon: 'remove', ariaChecked: 'mixed' },
  ])(
    'should be $state with aria-checked="$ariaChecked" when checked is $checked and indeterminate is $indeterminate',
    async({ checked, indeterminate, state, icon, ariaChecked }) => {
      await set({ checked, indeterminate });

      expect(host().checkbox().checkboxState()).toBe(state);
      expect(nativeInput().checked).toBe(state === IdsCheckboxState.CHECKED);
      expect(nativeInput().indeterminate).toBe(state === IdsCheckboxState.INDETERMINATE);
      expect(nativeInput().classList.contains('ids-checkbox--selected')).toBe(state === IdsCheckboxState.CHECKED);
      expect(nativeInput().getAttribute('aria-checked')).toBe(ariaChecked);

      const icons = element.querySelectorAll('ids-icon');
      expect(icons).toHaveLength(icon ? 1 : 0);
      if (icon) {
        expect(icons[0].getAttribute('fontIcon')).toBe(icon);
        expect(icons[0].getAttribute('aria-hidden')).toBe('true');
      }
    },
  );

  it.each([
    'checked',
    'indeterminate',
  ] as const)('should become unchecked when the %s input is cleared', async(property) => {
    await set({ [property]: true });
    await set({ [property]: false });

    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
  });
});

describe('IdsCheckboxComponent user interaction', () => {
  const { host, set } = useBasicHost();

  it('should toggle on input click and emit the change event', async() => {
    await set({ value: 'yes' });

    nativeInput().click();
    await set({});

    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
    expect(nativeInput().checked).toBe(true);
    expect(host().onChange).toHaveBeenCalledTimes(1);
    expect(host().onChange).toHaveBeenCalledWith(expect.objectContaining({
      source: host().checkbox(),
      checked: true,
      value: 'yes',
    }));

    nativeInput().click();
    await set({});

    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
    expect(host().onChange).toHaveBeenLastCalledWith(expect.objectContaining({ checked: false }));
    expect(host().onIndeterminateChange).not.toHaveBeenCalled();
  });

  it('should become checked and emit indeterminateChange when clicked while indeterminate', async() => {
    await set({ indeterminate: true });

    nativeInput().click();
    await set({});

    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
    expect(nativeInput().indeterminate).toBe(false);
    expect(host().onIndeterminateChange).toHaveBeenCalledWith(false);
  });

  it.each([
    '.ids-checkbox__label',
    '.ids-checkbox__label-wrapper',
  ])('should toggle exactly once when %s is clicked', async(selector) => {
    element.querySelector<HTMLElement>(selector)!.click();
    await set({});

    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
    expect(host().onChange).toHaveBeenCalledTimes(1);
  });

  it('should toggle and focus the input when the touch target is clicked', async() => {
    touchTarget().click();
    await set({});

    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
    expect(document.activeElement).toBe(nativeInput());
  });
});

describe('IdsCheckboxComponent disabled and readonly', () => {
  const { host, set } = useBasicHost();

  it.each([
    { property: 'disabled', tabIndex: -1, nativeDisabled: true, ariaReadonly: 'false' },
    { property: 'readonly', tabIndex: 0, nativeDisabled: false, ariaReadonly: 'true' },
  ] as const)(
    'should look disabled and expose tabIndex $tabIndex and aria-readonly="$ariaReadonly" when $property',
    async({ property, tabIndex, nativeDisabled, ariaReadonly }) => {
      await set({ [property]: true });

      expect(checkboxElement().classList.contains('ids-checkbox-disabled')).toBe(true);
      expect(nativeInput().tabIndex).toBe(tabIndex);
      expect(nativeInput().disabled).toBe(nativeDisabled);
      expect(nativeInput().getAttribute('aria-readonly')).toBe(ariaReadonly);
    },
  );

  it.each([
    'disabled',
    'readonly',
  ] as const)('should ignore input and touch target clicks when %s', async(property) => {
    await set({ [property]: true });

    host().checkbox().onInputClick();
    touchTarget().click();

    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
    expect(host().onChange).not.toHaveBeenCalled();
    expect(document.activeElement).not.toBe(nativeInput());
  });

  it.each([
    { checked: false, indeterminate: false, state: IdsCheckboxState.UNCHECKED, nativeProperty: 'checked', expected: false },
    { checked: true, indeterminate: false, state: IdsCheckboxState.CHECKED, nativeProperty: 'checked', expected: true },
    { checked: false, indeterminate: true, state: IdsCheckboxState.INDETERMINATE, nativeProperty: 'indeterminate', expected: true },
  ] as const)(
    'should keep the native input $state when a readonly checkbox is clicked',
    async({ checked, indeterminate, state, nativeProperty, expected }) => {
      await set({ checked, indeterminate, readonly: true });

      nativeInput().click();

      expect(host().checkbox().checkboxState()).toBe(state);
      expect(nativeInput()[nativeProperty]).toBe(expected);
      expect(host().onChange).not.toHaveBeenCalled();
    },
  );
});

describe('IdsCheckboxComponent public API', () => {
  const { fixture, host, set } = useBasicHost();

  it('should toggle between unchecked and checked and resolve indeterminate to checked', async() => {
    host().checkbox().toggle();
    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);

    host().checkbox().toggle();
    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);

    await set({ indeterminate: true });
    host().checkbox().toggle();
    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
  });

  it('should select and deselect and notify the registered change callback', () => {
    const onChange = jest.fn();
    host().checkbox().registerOnChange(onChange);

    host().checkbox().select();
    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);

    host().checkbox().deselect();
    expect(host().checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);

    expect(onChange.mock.calls).toEqual([
      [true],
      [false],
    ]);
  });

  it('should focus the native input', () => {
    host().checkbox().focus();

    expect(document.activeElement).toBe(nativeInput());
  });

  it('should update the disabled state through setDisabledState', async() => {
    host().checkbox().setDisabledState!(true);
    await set({});

    expect(host().checkbox().disabled()).toBe(true);
    expect(nativeInput().disabled).toBe(true);
  });

  it('should call the touched callback on blur, if registered', async() => {
    // Without a registered callback the default no-op runs.
    nativeInput().dispatchEvent(new Event('blur'));
    await fixture().whenStable();

    const onTouched = jest.fn();
    host().checkbox().registerOnTouched(onTouched);
    nativeInput().dispatchEvent(new Event('blur'));
    await fixture().whenStable();

    expect(onTouched).toHaveBeenCalledTimes(1);
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

  it('should reflect the written control value', async() => {
    host.control.setValue(true);
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.CHECKED);
    expect(nativeInput().checked).toBe(true);

    host.control.setValue(null);
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.UNCHECKED);
    expect(nativeInput().checked).toBe(false);
  });

  it('should keep the indeterminate state when a value is written', async() => {
    host.indeterminate = true;
    await render(fixture);

    host.control.setValue(true);
    await render(fixture);

    expect(host.checkbox().checkboxState()).toBe(IdsCheckboxState.INDETERMINATE);
  });

  it('should update the value, dirty and touched state of the control on user interaction', async() => {
    nativeInput().click();
    await render(fixture);

    expect(host.control.value).toBe(true);
    expect(host.control.dirty).toBe(true);
    expect(host.control.touched).toBe(false);

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

describe('IdsCheckboxComponent required state', () => {
  it('should mark the checkbox as required with the required input', async() => {
    const fixture = await setup(BasicHostComponent);

    expect(requiredMarker()).toBeNull();
    expect(nativeInput().required).toBe(false);

    fixture.componentInstance.required = true;
    await render(fixture);

    expect(requiredMarker()).not.toBeNull();
    expect(nativeInput().required).toBe(true);
  });

  describe('with reactive form validators', () => {
    let fixture: ComponentFixture<ReactiveHostComponent>;

    beforeEach(async() => {
      fixture = await setup(ReactiveHostComponent);
    });

    async function applyValidator(validator: ValidatorFn | null): Promise<void> {
      fixture.componentInstance.control.setValidators(validator);
      fixture.componentInstance.control.updateValueAndValidity();
      await render(fixture);
    }

    it('should not be required without a required validator', async() => {
      expect(nativeInput().required).toBe(false);

      await applyValidator(Validators.nullValidator);

      expect(nativeInput().required).toBe(false);
      expect(requiredMarker()).toBeNull();
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
    ])('should be required with %s', async(_name, validator) => {
      await applyValidator(validator);

      expect(nativeInput().required).toBe(true);
      expect(requiredMarker()).not.toBeNull();
    });
  });

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

  it('should add and remove requiredTrue on the ngModel control with the required input', async() => {
    const fixture = await setup(NgModelHostComponent);
    const control = fixture.componentInstance.ngModel().control;

    fixture.componentInstance.required = true;
    await render(fixture);
    await render(fixture);

    expect(control.hasValidator(Validators.requiredTrue)).toBe(true);
    expect(control.invalid).toBe(true);
    expect(nativeInput().required).toBe(true);

    fixture.componentInstance.required = false;
    await render(fixture);
    await render(fixture);

    expect(control.hasValidator(Validators.requiredTrue)).toBe(false);
  });

  it('should update the ngModel value when clicked', async() => {
    const fixture = await setup(NgModelHostComponent);

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

  async function invalidate(): Promise<void> {
    host.control.setValidators(Validators.requiredTrue);
    host.control.updateValueAndValidity();
    await render(fixture);
  }

  it('should show the accessible hint while the control is valid or untouched and pristine', async() => {
    expect(messageContainer()?.textContent).toContain('Hint text');
    expect(messageContainer()?.textContent).not.toContain('Error text');
    expect(await axe(element)).toHaveNoViolations();

    await invalidate();

    expect(messageContainer()?.textContent).toContain('Hint text');
  });

  it.each([
    [
      'touched',
      (control: FormControl): void => control.markAsTouched(),
    ],
    [
      'dirty',
      (control: FormControl): void => control.markAsDirty(),
    ],
  ])('should show the accessible error when an invalid control is %s', async(_name, interact) => {
    await invalidate();
    interact(host.control);
    await render(fixture);

    expect(messageContainer()?.textContent).toContain('Error text');
    expect(messageContainer()?.textContent).not.toContain('Hint text');
    expect(await axe(element)).toHaveNoViolations();
  });

  it.each([
    [
      'disabled',
      (hostComponent: ReactiveHostComponent): void => hostComponent.control.disable(),
    ],
    [
      'readonly',
      (hostComponent: ReactiveHostComponent): void => {
        hostComponent.readonly = true;
      },
    ],
  ])('should show the hint instead of the error when %s', async(_name, apply) => {
    await invalidate();
    host.control.markAsTouched();
    apply(host);
    await render(fixture);

    expect(messageContainer()?.textContent).toContain('Hint text');
  });
});

describe('IdsCheckboxComponent messages without a form control', () => {
  it('should show the hint', async() => {
    await setup(PlainHintHostComponent);

    expect(messageContainer()?.textContent).toContain('Plain hint');
  });
});

describe('IdsCheckboxComponent accessibility', () => {
  it('should have no axe violations in any state, variant or labelling mode', async() => {
    await setup(AllStatesHostComponent);

    expect(element.querySelectorAll('ids-checkbox')).toHaveLength(allStatesCount);
    expect(await axe(element)).toHaveNoViolations();
  });

  describe('attributes', () => {
    const { set } = useBasicHost();

    it('should expose accessible defaults', () => {
      expect(element.querySelector('label')!.htmlFor).toBe(nativeInput().id);
      expect(nativeInput().tabIndex).toBe(0);
      expect(nativeInput().getAttribute('aria-readonly')).toBe('false');
      expect(nativeInput().hasAttribute('aria-label')).toBe(false);
      expect(nativeInput().hasAttribute('aria-labelledby')).toBe(false);
      expect(element.querySelector('.ids-checkbox__icon')?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should forward the ARIA and tab index inputs to the native input only', async() => {
      await set({
        ariaLabel: 'Terms checkbox',
        ariaLabelledby: 'external-label',
        ariaDescribedby: 'description-id',
        tabIndex: customTabIndex,
      });

      expect(nativeInput().getAttribute('aria-label')).toBe('Terms checkbox');
      expect(nativeInput().getAttribute('aria-labelledby')).toBe('external-label');
      expect(nativeInput().getAttribute('aria-describedby')).toBe('description-id');
      expect(nativeInput().tabIndex).toBe(customTabIndex);
      expect(checkboxElement().hasAttribute('aria-label')).toBe(false);
      expect(checkboxElement().hasAttribute('aria-labelledby')).toBe(false);
    });
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
  it('should provide the factory defaults through the injection token', () => {
    TestBed.configureTestingModule({});

    expect(TestBed.inject(IDS_CHECKBOX_DEFAULT_CONFIG)).toEqual({
      size: IdsSize.COMPACT,
      variant: IdsCheckboxVariant.SURFACE,
    });
    expect(IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY()).toEqual(TestBed.inject(IDS_CHECKBOX_DEFAULT_CONFIG));
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
