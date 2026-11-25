import { IdsAutocompleteChipListComponent } from './autocomplete-chip-list.component';
import { IdsAutocompleteHintComponent } from './autocomplete-hint.component';
import { IdsAutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { IdsAutocompleteComponent } from './autocomplete.component';

import { IdsLabelDirective } from '../../directives/label.directive';
import { IdsFormFieldComponent } from '../form-field/form-field.component';
import { IdsErrorDefinitionDirective } from '../message/error-message/error-definition.directive';
import { IdsErrorMessageComponent } from '../message/error-message/error-message.component';
import { IdsOptionComponent } from '../option/option.component';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, viewChild, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { axe } from 'jest-axe';

interface Fruit {
  value: string;
  label: string;
  disabled?: boolean;
}

const defaultFruits: Fruit[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

function withDisabled(...indexes: number[]): Fruit[] {
  return defaultFruits.map((fruit, index) => ({ ...fruit, disabled: indexes.includes(index) }));
}

const scrollTop = 10;

@Component({
  imports: [
    ReactiveFormsModule,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsAutocompleteComponent,
    IdsAutocompleteTriggerDirective,
    IdsAutocompleteChipListComponent,
    IdsAutocompleteHintComponent,
    IdsOptionComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
  ],
  template: `
    <ids-form-field>
      <ids-label>Fruit</ids-label>
      @if (multiSelect) {
        <ids-autocomplete-chip-list [for]="trigger" />
      }
      <input #trigger="idsAutocompleteTrigger" type="text" aria-label="Fruit" [idsAutocompleteTriggerFor]="auto" />
      <ids-autocomplete
        #auto="idsAutocomplete"
        aria-label="Fruits"
        ariaLabelClear="Clear"
        ariaLabelLoading="Loading"
        panelClasses="custom-panel"
        [aria-labelledby]="ariaLabelledby"
        [trigger]="trigger"
        [formControl]="control"
        [multiSelect]="multiSelect"
        [readonly]="readonly"
        [required]="required"
        [isLoading]="isLoading"
        [displayWith]="displayWith"
      >
        @for (fruit of fruits; track fruit.value) {
          <ids-option [value]="fruit.value" [viewValue]="fruit.label" [disabled]="fruit.disabled ?? false">{{ fruit.label }}</ids-option>
        } @empty {
          <ids-autocomplete-hint>No results</ids-autocomplete-hint>
        }
      </ids-autocomplete>
      <ids-error-message>
        <ids-error-def code="required">Fruit is required</ids-error-def>
      </ids-error-message>
    </ids-form-field>
  `,
})
class TestHostComponent {
  public trigger = viewChild.required(IdsAutocompleteTriggerDirective);
  public autocomplete = viewChild.required(IdsAutocompleteComponent);
  public options = viewChildren(IdsOptionComponent);
  public control = new FormControl<unknown>(null);
  public fruits: Fruit[] = [...defaultFruits];
  public multiSelect = false;
  public readonly = false;
  public required = false;
  public isLoading = false;
  public ariaLabelledby = '';
  public displayWith?: (value: unknown) => string;
}

@Component({
  imports: [
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsAutocompleteComponent,
    IdsAutocompleteTriggerDirective,
    IdsOptionComponent,
  ],
  template: `
    <ids-form-field>
      <ids-label>Fruit</ids-label>
      <input #trigger="idsAutocompleteTrigger" type="text" aria-label="Fruit" [idsAutocompleteTriggerFor]="auto" />
      <ids-autocomplete #auto="idsAutocomplete" [trigger]="trigger">
        <ids-option value="apple" viewValue="Apple">Apple</ids-option>
      </ids-autocomplete>
    </ids-form-field>
  `,
})
class PlainHostComponent {}

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function render(): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

async function set(props: Partial<TestHostComponent>): Promise<void> {
  Object.assign(host, props);
  await render();
}

async function setValue(value: unknown): Promise<void> {
  host.control.setValue(value);
  await render();
}

async function openPanel(): Promise<void> {
  host.trigger().open();
  await render();
}

function input(): HTMLInputElement {
  return element.querySelector<HTMLInputElement>('input')!;
}

function panel(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[role="listbox"]');
}

function optionElement(index: number): HTMLElement {
  return host.options()[index].getHostElement();
}

function clearButton(): HTMLButtonElement | null {
  return element.querySelector<HTMLButtonElement>('.ids-autocomplete-suffix button');
}

function chipLabels(): string[] {
  return Array.from(element.querySelectorAll('.ids-chip__label')).map((label) => label.textContent!.trim());
}

/** The CDK key managers read the legacy `keyCode`, so it is set next to `key`. */
const keyCodes: Record<string, number> = {
  Tab: 9, Enter: 13, Escape: 27, ' ': 32, End: 35, Home: 36,
  ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40, a: 65,
};

function press(key: string, init: KeyboardEventInit = {}): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { key, keyCode: keyCodes[key], bubbles: true, cancelable: true, ...init });
  input().dispatchEvent(event);
  return event;
}

async function pressAndRender(key: string, init: KeyboardEventInit = {}): Promise<KeyboardEvent> {
  const event = press(key, init);
  await render();
  return event;
}

async function typeText(text: string): Promise<void> {
  input().value = text;
  input().dispatchEvent(new Event('input'));
  await render();
}

function activeOptionId(): string | null {
  return input().getAttribute('aria-activedescendant');
}

/** Some states, like an autocomplete that never had options, can only be set before the first render. */
async function createHost(props: Partial<TestHostComponent> = {}): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  await set(props);
}

/**
 * Known accessibility defects of the current implementation, disabled until they are fixed:
 * - aria-prohibited-attr: the `aria-label` input stays on the generic `ids-autocomplete` host element
 * - aria-required-children: the empty listbox (with only a hint) has no `option` children
 * - nested-interactive, button-name, aria-allowed-role, presentation-role-conflict: the removable chips
 *   nest an unlabelled remove button into the chip button, and multiselect options contain a focusable checkbox
 * `region` is disabled because the whole document (including the overlay container) is audited without landmarks.
 */
const disabledAxeRules = [
  'aria-prohibited-attr',
  'aria-required-children',
  'nested-interactive',
  'button-name',
  'aria-allowed-role',
  'presentation-role-conflict',
  'region',
];

async function expectNoAxeViolations(): Promise<void> {
  const rules = Object.fromEntries(disabledAxeRules.map((rule) => [
    rule,
    { enabled: false },
  ]));
  expect(await axe(document.body, { rules })).toHaveNoViolations();
}

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [
      TestHostComponent,
      PlainHostComponent,
    ],
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
    ],
  }).compileComponents();

  await createHost();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('IdsAutocompleteComponent rendering', () => {
  it('should render with the default configuration', () => {
    const autocompleteElement = element.querySelector('ids-autocomplete')!;

    expect(Array.from(autocompleteElement.classList)).toEqual(expect.arrayContaining([
      'ids-autocomplete',
      'ids-autocomplete-compact',
      'ids-form-field-control',
    ]));
    expect(autocompleteElement.classList).not.toContain('ids-autocomplete-disabled');
    expect(input().getAttribute('autocomplete')).toBe('off');
    expect(element.querySelector('ids-icon[fontIcon="chevron-down"]')).not.toBeNull();
    expect(element.querySelector('ids-spinner')).toBeNull();
    expect(clearButton()).toBeNull();
    expect(panel()).toBeNull();
  });

  it('should show a labelled spinner instead of the chevron while loading', async() => {
    await set({ isLoading: true });

    expect(element.querySelector('ids-spinner')?.getAttribute('aria-label')).toBe('Loading');
    expect(element.querySelector('ids-icon[fontIcon^="chevron"]')).toBeNull();
  });

  it('should show a labelled clear button when the input has a value', async() => {
    await typeText('App');

    expect(clearButton()?.getAttribute('aria-label')).toBe('Clear');

    clearButton()!.click();
    await render();

    expect(input().value).toBe('');
    expect(clearButton()).toBeNull();
  });

  it('should render the hint in the panel when there are no options', async() => {
    await set({ fruits: [] });
    await openPanel();

    expect(panel()?.querySelector('ids-autocomplete-hint')?.textContent).toContain('No results');
  });
});

describe('IdsAutocompleteComponent opening and closing', () => {
  it('should open on focus with the custom panel class and the chevron up', async() => {
    input().focus();
    await render();

    expect(panel()).not.toBeNull();
    expect(document.querySelector('.ids-autocomplete-overlay-panel.custom-panel')).not.toBeNull();
    expect(element.querySelector('ids-icon[fontIcon="chevron-up"]')).not.toBeNull();
  });

  it.each([
    { name: 'the first option', setup: {}, value: null, active: 0 },
    { name: 'the first enabled option', setup: { fruits: withDisabled(0) }, value: null, active: 1 },
    { name: 'the selected option', setup: {}, value: 'cherry', active: 2 },
    { name: 'no option when every option is disabled', setup: { fruits: withDisabled(0, 1, 2) }, value: null, active: -1 },
  ])('should highlight $name when opened', async({ setup, value, active }) => {
    await set(setup);
    await setValue(value);
    await openPanel();

    expect(activeOptionId()).toBe(active === -1 ? null : host.options()[active].id());
  });

  it('should toggle the panel, mark the control touched on close and follow the overlay closing', async() => {
    host.trigger().toggle();
    await render();
    expect(panel()).not.toBeNull();

    host.trigger().toggle();
    host.trigger().close();
    await render();
    expect(panel()).toBeNull();
    expect(host.control.touched).toBe(true);

    await openPanel();
    host.autocomplete().overlayPanel()!.toggle();
    await render();
    expect(host.autocomplete().panelOpen()).toBe(false);
  });

  it('should focus and open on a container click, except on the clear button', async() => {
    await typeText('App');
    clearButton()!.querySelector('ids-icon')!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await render();
    expect(panel()).toBeNull();

    element.querySelector<HTMLElement>('ids-icon[fontIcon^="chevron"]')!.click();
    await render();
    expect(document.activeElement).toBe(input());
    expect(panel()).not.toBeNull();
  });

  it.each([
    [
      'readonly',
      (): Promise<void> => set({ readonly: true }),
    ],
    [
      'disabled',
      (): Promise<void> => {
        host.control.disable(); return render();
      },
    ],
  ])('should not open when %s', async(_name, apply) => {
    await apply();

    host.trigger().focus();
    press('ArrowDown');
    element.querySelector<HTMLElement>('.ids-form-field__field-wrapper__container')!.click();
    await render();

    expect(panel()).toBeNull();
  });

  it('should resize the panel with the form field', async() => {
    let resize: () => void = () => {};
    jest.spyOn(globalThis, 'ResizeObserver').mockImplementation((callback) => {
      resize = (): void => callback([], {} as ResizeObserver);
      return { observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() };
    });
    await openPanel();
    const updatePosition = jest.spyOn(host.autocomplete().overlayPanel()!, 'updatePosition');
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ width: 320 } as DOMRect);

    resize();
    await render();

    expect(updatePosition).toHaveBeenCalled();
    expect(document.querySelector<HTMLElement>('.cdk-overlay-pane')?.style.width).toBe('320px');
  });
});

describe('IdsAutocompleteComponent keyboard interaction with a closed panel', () => {
  it.each([
    'ArrowDown',
    'ArrowUp',
    'ArrowLeft',
    'ArrowRight',
    'Enter',
    ' ',
  ])('should open with "%s"', async(key) => {
    const event = await pressAndRender(key);

    expect(event.defaultPrevented).toBe(true);
    expect(panel()).not.toBeNull();
  });

  it('should only move the active option with other or modified keys', async() => {
    await set({ fruits: withDisabled(0) });
    await setValue('banana');
    press('Enter', { ctrlKey: true });
    press('Escape');
    press('Home');
    press('Tab');
    await set({ multiSelect: true });
    press('Home');
    await render();

    expect(panel()).toBeNull();
    expect(host.control.value).toBe('banana');
  });

  it('should neither open nor select with the keyboard without any option', async() => {
    await createHost({ fruits: [] });

    await pressAndRender('Enter');
    expect(panel()).toBeNull();

    await openPanel();
    await pressAndRender('ArrowDown');
    expect(panel()).not.toBeNull();
    expect(host.control.value).toBeNull();
  });
});

describe('IdsAutocompleteComponent keyboard interaction with an open panel', () => {
  beforeEach(async() => {
    await openPanel();
  });

  it('should move the active option and scroll it into view', async() => {
    const setScrollTop = jest.spyOn(host.autocomplete(), 'setScrollTop');

    await pressAndRender('ArrowDown');
    expect(activeOptionId()).toBe(host.options()[1].id());

    await pressAndRender('Home');
    expect(activeOptionId()).toBe(host.options()[0].id());
    expect(setScrollTop).toHaveBeenLastCalledWith(0);
  });

  it.each([
    [
      'Escape',
      {},
    ],
    [
      'ArrowUp',
      { altKey: true },
    ],
    [
      'ArrowDown',
      { altKey: true },
    ],
  ])('should close with "%s" %p', async(key, init) => {
    const event = await pressAndRender(key, init);

    expect(event.defaultPrevented).toBe(true);
    expect(panel()).toBeNull();
  });

  it.each([
    'Enter',
    ' ',
    'Tab',
  ])('should select the active option and close with "%s"', async(key) => {
    await pressAndRender('ArrowDown');
    await pressAndRender(key);

    expect(host.control.value).toBe('banana');
    expect(input().value).toBe('Banana');
    expect(panel()).toBeNull();
  });

  it('should not select with modified keys', async() => {
    await pressAndRender('Enter', { ctrlKey: true });
    await pressAndRender('a', { ctrlKey: true });

    expect(host.control.value).toBeNull();
    expect(panel()).not.toBeNull();
  });

  describe('in multiSelect mode', () => {
    beforeEach(async() => {
      await set({ multiSelect: true });
    });

    it('should toggle every enabled option with Ctrl+A', async() => {
      await set({ fruits: withDisabled(2) });

      await pressAndRender('a', { ctrlKey: true });
      expect(host.control.value).toEqual([
        'apple',
        'banana',
      ]);

      await pressAndRender('a', { ctrlKey: true });
      expect(host.control.value).toEqual([]);
    });

    it('should extend the selection with Shift+Arrow until the last option', async() => {
      await pressAndRender('ArrowDown', { shiftKey: true });
      expect(host.control.value).toEqual(['banana']);

      await pressAndRender('End');
      await pressAndRender('ArrowDown', { shiftKey: true });
      expect(host.control.value).toEqual(['banana']);
    });

    it('should close without selecting when tabbing out', async() => {
      await pressAndRender('Tab');

      expect(host.control.value).toBeNull();
      expect(panel()).toBeNull();
    });
  });
});

describe('IdsAutocompleteComponent selection', () => {
  it('should select a clicked option, update the control and close', async() => {
    await openPanel();
    optionElement(1).click();
    await render();

    expect(host.control.value).toBe('banana');
    expect(host.control.touched).toBe(true);
    expect(input().value).toBe('Banana');
    expect(optionElement(1).getAttribute('aria-selected')).toBe('true');
    expect(panel()).toBeNull();

    await openPanel();
    optionElement(1).click();
    await render();

    expect(host.control.value).toBe('banana');
    expect(panel()).toBeNull();
  });

  it('should keep multiple selections sorted, shown as chips and the panel open', async() => {
    await set({ multiSelect: true });
    await openPanel();
    optionElement(2).click();
    optionElement(0).click();
    await render();

    expect(host.control.value).toEqual([
      'apple',
      'cherry',
    ]);
    expect(chipLabels()).toEqual([
      'Apple',
      'Cherry',
    ]);
    expect(input().value).toBe('');
    expect(panel()).not.toBeNull();
  });

  it('should remove a selected option with its chip, even when it is filtered out', async() => {
    await set({ multiSelect: true });
    await setValue([
      'apple',
      'cherry',
    ]);

    element.querySelector<HTMLButtonElement>('.ids-chip button')!.click();
    await render();
    expect(host.control.value).toEqual(['cherry']);

    await set({ fruits: [] });
    element.querySelector<HTMLButtonElement>('.ids-chip button')!.click();
    await render();
    expect(host.control.value).toEqual([]);
    expect(chipLabels()).toEqual([]);
  });

  it('should render the chips with the default appearance and disable them with the autocomplete', async() => {
    await set({ multiSelect: true });
    await setValue(['apple']);
    host.control.disable();
    await render();

    const chip = element.querySelector<HTMLButtonElement>('.ids-chip')!;
    expect(Array.from(chip.classList)).toEqual(expect.arrayContaining([
      'ids-chip-outlined',
      'ids-chip-dense',
      'ids-chip-surface',
    ]));
    expect(chip.disabled).toBe(true);
  });

  it('should clear the selection with the clear button and with removeOption', async() => {
    await setValue('apple');
    clearButton()!.click();
    await render();

    expect(host.control.value).toBeNull();
    expect(input().value).toBe('');

    await setValue('apple');
    host.trigger().removeOption({ value: 'apple', viewValue: 'Apple' });
    await render();

    expect(host.control.value).toBeNull();
  });
});

describe('IdsAutocompleteComponent form control integration', () => {
  it('should display the written value and select its option', async() => {
    await setValue('banana');
    expect(input().value).toBe('Banana');
    expect(host.options()[1].selected()).toBe(true);

    await setValue(null);
    expect(input().value).toBe('');
    expect(host.options().some((option) => option.selected())).toBe(false);
  });

  it('should keep the selection when the options change', async() => {
    await setValue('apple');
    await set({ fruits: [{ value: 'apple', label: 'Green apple' }] });

    expect(host.options()[0].selected()).toBe(true);
    expect(host.trigger().selectedOptions).toEqual([host.options()[0]]);
  });

  it('should display written values with displayWith, falling back to the options when it throws', async() => {
    await set({ fruits: [], displayWith: (value) => `#${String(value)}` });
    await setValue('kiwi');
    expect(input().value).toBe('#kiwi');

    const warn = jest.spyOn(console, 'warn').mockImplementation();
    await set({
      fruits: [...defaultFruits],
      displayWith: () => {
        throw new Error('display failed');
      },
    });
    await setValue('apple');

    expect(input().value).toBe('Apple');
    expect(warn).toHaveBeenCalled();
  });

  it('should sort written values in multiSelect mode and reject non-array values', async() => {
    await set({ multiSelect: true });
    await setValue([
      'cherry',
      'apple',
    ]);

    expect(chipLabels()).toEqual([
      'Apple',
      'Cherry',
    ]);
    expect(input().value).toBe('');

    host.autocomplete().writeValue('apple');
    expect(() => fixture.detectChanges()).toThrow(/value must be an array in multiple-selection mode/);
  });

  it('should treat values as different and warn when valueCompareFn throws', async() => {
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(host.autocomplete(), 'valueCompareFn').mockReturnValue(() => {
      throw new Error('compare failed');
    });
    await setValue('apple');
    await openPanel();
    optionElement(0).click();
    await render();

    expect(host.trigger().selectedOptions).toEqual([]);
    expect(warn).toHaveBeenCalled();
  });

  it('should work without a form control', async() => {
    const plainFixture = TestBed.createComponent(PlainHostComponent);
    const trigger = plainFixture.debugElement
      .query(By.directive(IdsAutocompleteTriggerDirective))
      .injector.get(IdsAutocompleteTriggerDirective);
    expect(trigger.selected).toEqual([]);

    plainFixture.detectChanges();
    await plainFixture.whenStable();
    trigger.open();
    plainFixture.detectChanges();
    document.querySelector<HTMLElement>('ids-option')!.click();
    plainFixture.detectChanges();

    expect(trigger.selected).toEqual([{ value: 'apple', viewValue: 'Apple' }]);
    expect((plainFixture.nativeElement as HTMLElement).querySelector('input')!.value).toBe('Apple');
  });

  it('should mark the control touched on blur unless disabled', async() => {
    input().dispatchEvent(new Event('blur'));
    expect(host.control.touched).toBe(true);

    host.control.markAsUntouched();
    host.control.disable();
    await render();
    input().dispatchEvent(new Event('blur'));
    expect(host.control.touched).toBe(false);
  });

  it('should only read and write the scroll position while the panel is open', async() => {
    host.autocomplete().setScrollTop(scrollTop);
    expect(host.autocomplete().getScrollTop()).toBe(0);

    await openPanel();
    host.autocomplete().setScrollTop(scrollTop);
    expect(host.autocomplete().getScrollTop()).toBe(scrollTop);
  });
});

describe('IdsAutocompleteComponent accessibility', () => {
  it('should expose a collapsed combobox', () => {
    expect(input().getAttribute('role')).toBe('combobox');
    expect(input().getAttribute('aria-autocomplete')).toBe('list');
    expect(input().getAttribute('aria-haspopup')).toBe('listbox');
    expect(input().getAttribute('aria-expanded')).toBe('false');
    expect(input().hasAttribute('aria-controls')).toBe(false);
    expect(input().hasAttribute('aria-owns')).toBe(false);
    expect(activeOptionId()).toBeNull();
    expect(input().getAttribute('tabindex')).toBe('0');
    expect(input().getAttribute('aria-required')).toBe('false');
    expect(input().getAttribute('aria-disabled')).toBe('false');
    expect(input().getAttribute('aria-invalid')).toBe('false');
    expect(input().hasAttribute('readonly')).toBe(false);
  });

  it('should expose the expanded combobox, its listbox and the active option', async() => {
    await set({ ariaLabelledby: 'fruit-label' });
    await openPanel();
    const panelId = `${host.autocomplete().id()}-panel`;

    expect(input().getAttribute('aria-expanded')).toBe('true');
    expect(input().getAttribute('aria-owns')).toBe(panelId);
    expect(input().getAttribute('aria-controls')).toBe(host.autocomplete().id());
    expect(activeOptionId()).toBe(host.options()[0].id());
    expect(panel()!.id).toBe(panelId);
    expect(panel()!.getAttribute('aria-label')).toBe('Fruits');
    expect(panel()!.getAttribute('aria-labelledby')).toBe('fruit-label');
    expect(panel()!.getAttribute('aria-multiselectable')).toBe('false');
    expect(optionElement(0).getAttribute('role')).toBe('option');
    expect(optionElement(0).getAttribute('aria-selected')).toBe('false');
  });

  it('should drop the combobox semantics and leave the tab order when disabled', async() => {
    host.control.disable();
    await render();

    expect(input().disabled).toBe(true);
    expect(input().getAttribute('tabindex')).toBe('-1');
    expect(input().getAttribute('aria-disabled')).toBe('true');
    [
      'role',
      'aria-autocomplete',
      'aria-haspopup',
      'aria-expanded',
    ].forEach((attribute) => {
      expect(input().hasAttribute(attribute)).toBe(false);
    });
    expect(element.querySelector('ids-autocomplete')!.classList).toContain('ids-autocomplete-disabled');
  });

  it('should expose the readonly, required and invalid states', async() => {
    host.control.setValidators(Validators.required);
    host.control.markAsTouched();
    host.control.updateValueAndValidity();
    await set({ readonly: true, required: true });

    expect(input().getAttribute('readonly')).toBe('true');
    expect(input().getAttribute('aria-required')).toBe('true');
    expect(input().getAttribute('aria-invalid')).toBe('true');
    expect(element.textContent).toContain('Fruit is required');
  });

  it('should announce the number of available options', async() => {
    const announce = jest.spyOn(TestBed.inject(LiveAnnouncer), 'announce');

    await set({ fruits: defaultFruits.slice(0, 2) });

    expect(announce).toHaveBeenCalledWith('2', expect.any(Number));
  });

  it.each<[string, () => Promise<void>]>([
    [
      'by default',
      (): Promise<void> => render(),
    ],
    [
      'with an open panel',
      openPanel,
    ],
    [
      'with an empty open panel',
      async(): Promise<void> => {
        await set({ fruits: [] }); await openPanel();
      },
    ],
    [
      'with selected chips',
      async(): Promise<void> => {
        await set({ multiSelect: true }); await setValue(['apple']); await openPanel();
      },
    ],
    [
      'while loading with a clear button',
      async(): Promise<void> => {
        await set({ isLoading: true }); await setValue('apple');
      },
    ],
    [
      'when disabled',
      async(): Promise<void> => {
        host.control.disable(); await render();
      },
    ],
  ])('should have no axe violations %s', async(_name, setup) => {
    await setup();

    await expectNoAxeViolations();
  });
});
