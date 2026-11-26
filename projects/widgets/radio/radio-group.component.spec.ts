import { IdsRadioGroupComponent } from './radio-group.component';
import { IdsRadioComponent } from './radio.component';
import { IdsRadioVariantType } from './types/radio-variant.type';

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsErrorMessageComponent, IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
const { computeAccessibleName } = jest.requireActual<{
  computeAccessibleName: (element: Element) => string,
}>('dom-accessibility-api');

@Component({
  imports: [
    IdsRadioGroupComponent,
    IdsRadioComponent,
    IdsHintMessageComponent,
    ReactiveFormsModule,
  ],
  template: `
    <span id="external-label">External label</span>
    <ids-radio-group name="test-radio-group" required [label]="label()" [formControl]="control"
      [aria-label]="ariaLabel()" [aria-labelledby]="labelledBy()">
      <ids-hint-message>Choose one option</ids-hint-message>
      <ids-radio value="a">First</ids-radio>
      <ids-radio value="b" [disabled]="true">Second</ids-radio>
      <ids-radio value="c">Third</ids-radio>
    </ids-radio-group>
  `,
})
class TestHostComponent {
  public label = signal('Options');
  public ariaLabel = signal('');
  public labelledBy = signal('');
  public control = new FormControl('a');
}

describe('IdsRadioGroupComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;
  let fieldset: HTMLFieldSetElement;

  beforeEach(async() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    element = fixture.nativeElement;
    fieldset = element.querySelector('fieldset')!;
  });

  it('names the native group through its first legend without including the marker or hint', () => {
    expect(fieldset.firstElementChild?.tagName).toBe('LEGEND');
    expect(fieldset.querySelectorAll('input[type="radio"]').length).toBe(
      element.querySelectorAll('ids-radio').length,
    );
    expect(computeAccessibleName(fieldset)).toBe('Options');
    expect(fieldset.querySelector('[aria-hidden="true"]')).not.toBeNull();
    expect(fieldset.querySelector('legend ids-hint-message')).toBeNull();
    expect(element.querySelector('[role="radiogroup"]')).toBeNull();
    const inputs = fieldset.querySelectorAll('input');
    expect(Array.from(inputs).map((input) => computeAccessibleName(input))).toEqual([
      'First',
      'Second',
      'Third',
    ]);
  });

  it('does not render an empty legend or dangling label reference', () => {
    fixture.componentInstance.label.set('');
    fixture.detectChanges();
    expect(fieldset.querySelector('legend')).toBeNull();
    expect(fieldset.getAttribute('aria-labelledby')).toBeNull();
    expect(computeAccessibleName(fieldset)).toBe('');
  });

  it('forwards explicit accessible names to the native group', () => {
    fixture.componentInstance.label.set('');
    fixture.componentInstance.ariaLabel.set('Alternate name');
    fixture.detectChanges();
    expect(computeAccessibleName(fieldset)).toBe('Alternate name');
    fixture.componentInstance.labelledBy.set('external-label');
    fixture.detectChanges();
    expect(computeAccessibleName(fieldset)).toBe('External label');
    expect(element.querySelector('ids-radio-group')?.hasAttribute('aria-label')).toBe(false);
  });

  it('forwards dynamic attribute bindings and removes stale names', async() => {
    fixture.destroy();
    TestBed.resetTestingModule();
    TestBed.overrideTemplate(TestHostComponent, `
      <span id="external-label">External label</span>
      <ids-radio-group name="attributes" [attr.aria-label]="ariaLabel() || null"
        [attr.aria-labelledby]="labelledBy() || null">
        <ids-radio value="a">First</ids-radio>
        <ids-radio value="b">Second</ids-radio>
      </ids-radio-group>
    `);
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.ariaLabel.set('Attribute name');
    fixture.detectChanges();
    await fixture.whenStable();
    fieldset = fixture.nativeElement.querySelector('fieldset');
    fixture.detectChanges();
    expect(computeAccessibleName(fieldset)).toBe('Attribute name');
    fixture.componentInstance.labelledBy.set('external-label');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(computeAccessibleName(fieldset)).toBe('External label');
    fixture.componentInstance.labelledBy.set('');
    fixture.componentInstance.ariaLabel.set('');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fieldset.hasAttribute('aria-label')).toBe(false);
    expect(fieldset.hasAttribute('aria-labelledby')).toBe(false);
  });

  it('keeps disabled state on individual controls rather than the fieldset', () => {
    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    expect(Array.from(fieldset.querySelectorAll('input')).every((input) => input.disabled)).toBe(true);
    expect(fieldset.disabled).toBe(false);
  });

  it('keeps keyboard events bubbling to the group through the fieldset', () => {
    const group = element.querySelector('ids-radio-group')!;
    const keydown = jest.fn();
    group.addEventListener('keydown', keydown);
    const first = fieldset.querySelector('input')!;
    first.focus();
    first.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(keydown).toHaveBeenCalledTimes(1);
    group.removeEventListener('keydown', keydown);
  });
});

@Component({
  imports: [
    IdsRadioGroupComponent,
    IdsRadioComponent,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    ReactiveFormsModule,
  ],
  template: `
    <ids-radio-group name="messages" label="Options" [size]="size()" [variant]="variant()" [formControl]="control">
      <ids-hint-message>Group hint</ids-hint-message>
      <ids-radio value="a" [disabled]="firstDisabled()">First<ids-hint-message>First hint</ids-hint-message></ids-radio>
      <ids-radio value="b">Second<ids-hint-message>Second hint</ids-hint-message></ids-radio>
      <ids-error-message>Group error</ids-error-message>
    </ids-radio-group>
  `,
})
class MessageHostComponent {
  public size = signal<IdsSizeType>('compact');
  public variant = signal<IdsRadioVariantType>('surface');
  public firstDisabled = signal(false);
  public control = new FormControl('a');
}

describe('IdsRadioGroupComponent messages', () => {
  let fixture: ComponentFixture<MessageHostComponent>;
  let messages: HTMLElement[];

  beforeEach(async() => {
    fixture = TestBed.createComponent(MessageHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    messages = Array.from(fixture.nativeElement.querySelectorAll('ids-hint-message, ids-error-message'));
  });

  const everyMessageHas = (className: string): boolean =>
    messages.every((message) => message.classList.contains(className));
  const noMessageHas = (className: string): boolean =>
    messages.every((message) => !message.classList.contains(className));

  it('renders group and item messages with the group defaults', () => {
    const expectedMessageCount = 4;
    expect(messages.length).toBe(expectedMessageCount);
    expect(everyMessageHas('ids-message-compact')).toBe(true);
    expect(everyMessageHas('ids-message-surface')).toBe(true);
  });

  it('inherits the size of the group', () => {
    fixture.componentInstance.size.set('spacious');
    fixture.detectChanges();

    expect(everyMessageHas('ids-message-spacious')).toBe(true);
    expect(noMessageHas('ids-message-compact')).toBe(true);
  });

  it('inherits the variant of the group', () => {
    fixture.componentInstance.variant.set('dark');
    fixture.detectChanges();

    expect(everyMessageHas('ids-message-dark')).toBe(true);
    expect(noMessageHas('ids-message-surface')).toBe(true);
  });

  it('inherits the disabled state of the group', () => {
    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    expect(everyMessageHas('ids-message-disabled')).toBe(true);

    fixture.componentInstance.control.enable();
    fixture.detectChanges();
    expect(noMessageHas('ids-message-disabled')).toBe(true);
  });

  it('disables only the hint of a disabled radio item', () => {
    const firstHint = fixture.nativeElement.querySelector('ids-radio[value="a"] ids-hint-message') as HTMLElement;
    const otherMessages = messages.filter((message) => message !== firstHint);

    fixture.componentInstance.firstDisabled.set(true);
    fixture.detectChanges();
    expect(firstHint.classList).toContain('ids-message-disabled');
    expect(otherMessages.every((message) => !message.classList.contains('ids-message-disabled'))).toBe(true);

    fixture.componentInstance.firstDisabled.set(false);
    fixture.detectChanges();
    expect(firstHint.classList).not.toContain('ids-message-disabled');
  });
});
