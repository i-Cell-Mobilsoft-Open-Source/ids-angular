import { IDS_DATEPICKER_DEFAULT_CONFIG } from './datepicker-defaults';
import { IdsDatepickerDirective } from './datepicker.directive';

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { formatDate } from '@i-cell/ids-angular/core';
import { IdsFormFieldComponent, IdsInputDirective } from '@i-cell/ids-angular/forms';

@Component({
  imports: [
    IdsFormFieldComponent,
    IdsInputDirective,
    IdsDatepickerDirective,
    ReactiveFormsModule,
  ],
  template: `
    <ids-form-field>
      <input idsInput idsDatepicker [formControl]="control" [allowAdjacentMonthSelection]="allowAdjacent()"
        [minDate]="min()" [maxDate]="max()" />
    </ids-form-field>
  `,
})
class TestHostComponent {
  public picker = viewChild.required(IdsDatepickerDirective);
  public control = new FormControl(new Date('2026-10-15T00:00:00'));
  public allowAdjacent = signal(true);
  public min = signal<Date | null>(null);
  public max = signal<Date | null>(null);
}

describe('IdsDatepickerDirective adjacent month selection', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let overlay: HTMLElement;

  async function open(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    host.picker().open();
    fixture.detectChanges();
    await fixture.whenStable();
  }

  function day(label: string): HTMLButtonElement {
    return overlay.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`)!;
  }

  function createHost(): void {
    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  }

  const templateWithoutSelectionInput = `
    <ids-form-field>
      <input idsInput idsDatepicker [formControl]="control" />
    </ids-form-field>
  `;

  it.each([
    { initial: '2026-10-15', label: '30 September 2026', result: '2026-09-30' },
    { initial: '2026-10-15', label: '1 November 2026', result: '2026-11-01' },
    { initial: '2026-12-15', label: '1 January 2027', result: '2027-01-01' },
  ])('selects $label from the month of $initial by default', async({ initial, label, result }) => {
    TestBed.overrideTemplate(TestHostComponent, templateWithoutSelectionInput);
    createHost();
    const expected = new Date(`${result}T00:00:00`);
    host.control.setValue(new Date(`${initial}T00:00:00`));
    await open();
    day(label).click();
    expect(host.control.value).toEqual(expected);
    expect(fixture.nativeElement.querySelector('input').value).toBe(formatDate(expected));
    expect(host.picker().opened()).toBe(false);
  });

  describe('when adjacent month selection is disabled globally', () => {
    beforeEach(() => {
      TestBed.overrideProvider(IDS_DATEPICKER_DEFAULT_CONFIG, { useValue: { allowAdjacentMonthSelection: false } });
    });

    it('disables adjacent days when the field omits the input', async() => {
      TestBed.overrideTemplate(TestHostComponent, templateWithoutSelectionInput);
      createHost();
      await open();
      expect(day('1 November 2026').disabled).toBe(true);
      expect(day('31 October 2026').disabled).toBe(false);
      host.picker().close();
    });

    it('allows the field to override the global setting', async() => {
      createHost();
      await open();
      day('1 November 2026').click();
      expect(host.control.value).toEqual(new Date('2026-11-01T00:00:00'));
      expect(host.picker().opened()).toBe(false);
    });
  });

  it('updates eligibility while open without changing the value or bypassing date limits', async() => {
    createHost();
    const initial = host.control.value;
    host.min.set(new Date('2026-09-30T00:00:00'));
    host.max.set(new Date('2026-10-31T00:00:00'));
    await open();
    expect(day('29 September 2026').disabled).toBe(true);
    expect(day('30 September 2026').disabled).toBe(false);
    expect(day('1 November 2026').disabled).toBe(true);
    host.allowAdjacent.set(false);
    fixture.detectChanges();
    expect(day('30 September 2026').disabled).toBe(true);
    expect(day('31 October 2026').disabled).toBe(false);
    day('30 September 2026').click();
    expect(host.picker().opened()).toBe(true);
    expect(host.control.value).toEqual(initial);
    host.picker().close();
  });
});
