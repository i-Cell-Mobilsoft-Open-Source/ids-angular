import { IdsCheckboxGroupComponent } from './checkbox-group.component';
import { IdsCheckboxComponent } from './checkbox.component';

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IdsErrorMessageComponent, IdsHintMessageComponent } from '@i-cell/ids-angular/forms';

const { computeAccessibleName } = jest.requireActual<{
  computeAccessibleName: (element: Element) => string,
}>('dom-accessibility-api');

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
class TestHostComponent {
  public label = signal('Permissions');
  public allowParent = signal(true);
  public accessibleName = signal('');
  public labelledBy = signal('');
  public first = new FormControl(false, { nonNullable: true });
  public second = new FormControl({ value: false, disabled: true }, { nonNullable: true });
  public third = new FormControl(false, { nonNullable: true });
}

describe('IdsCheckboxGroupComponent native grouping', () => {
  let fixture: ComponentFixture<TestHostComponent>;
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
    fixture = TestBed.createComponent(TestHostComponent);
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
