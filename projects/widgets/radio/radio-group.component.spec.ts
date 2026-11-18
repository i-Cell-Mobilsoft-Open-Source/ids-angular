import { IdsRadioGroupComponent } from './radio-group.component';
import { IdsRadioComponent } from './radio.component';

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
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
