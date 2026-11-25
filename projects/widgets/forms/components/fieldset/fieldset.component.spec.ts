import { IDS_FIELDSET_DEFAULT_CONFIG } from './fieldset-defaults';
import { IdsFieldsetMessageDirective } from './fieldset-message.directive';
import { IdsFieldsetRowComponent } from './fieldset-row/fieldset-row.component';
import { IdsFieldsetComponent } from './fieldset.component';

import { IdsFormFieldVariant, IdsFormFieldVariantType } from '../form-field/types/form-field-variant.type';
import { IdsHintMessageComponent } from '../message/hint-message/hint-message.component';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { axe } from 'jest-axe';

@Component({
  imports: [
    IdsFieldsetComponent,
    IdsFieldsetRowComponent,
    IdsFieldsetMessageDirective,
    IdsHintMessageComponent,
  ],
  template: `
    <fieldset idsFieldset [legend]="legend" [size]="size" [variant]="variant">
      @if (showMessage) {
        <ids-hint-message idsFieldsetMessage>All fields are required</ids-hint-message>
      }
      <ids-hint-message>Not a fieldset message</ids-hint-message>
      <ids-fieldset-row>
        <label for="first-name">First name</label>
        <input id="first-name" />
      </ids-fieldset-row>
    </fieldset>
  `,
})
class TestHostComponent {
  public legend = 'Personal data';
  public showMessage = false;
  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsFormFieldVariantType = IdsFormFieldVariant.SURFACE;
}

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function set(props: Partial<TestHostComponent>): Promise<void> {
  Object.assign(host, props);
  fixture.detectChanges();
  await fixture.whenStable();
}

function fieldset(): HTMLFieldSetElement {
  return element.querySelector<HTMLFieldSetElement>('fieldset')!;
}

function message(): HTMLElement | null {
  return element.querySelector<HTMLElement>('.ids-fieldset-message');
}

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  await set({});
});

describe('IdsFieldsetComponent rendering', () => {
  it('should render the legend and the rows with the default configuration', () => {
    expect(Array.from(fieldset().classList)).toEqual(expect.arrayContaining([
      'ids-fieldset',
      'ids-fieldset-compact',
      'ids-fieldset-surface',
    ]));
    expect(fieldset().querySelector('legend')?.textContent).toBe('Personal data');
    expect(fieldset().querySelector('ids-fieldset-row input')).not.toBeNull();
    expect(message()).toBeNull();
  });

  it.each([
    ...Object.values(IdsSize).map((value) => [
      'size',
      value,
    ]),
    ...Object.values(IdsFormFieldVariant).map((value) => [
      'variant',
      value,
    ]),
  ])('should apply the %s class for %s', async(property, value) => {
    await set({ [property]: value });

    expect(fieldset().classList).toContain(`ids-fieldset-${value}`);
  });

  it('should only project hint messages marked with idsFieldsetMessage', async() => {
    await set({ showMessage: true });

    expect(message()?.textContent?.trim()).toBe('All fields are required');
    expect(element.textContent).not.toContain('Not a fieldset message');
  });
});

describe('IdsFieldsetComponent default configuration', () => {
  it('should apply a partial custom default configuration', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: IDS_FIELDSET_DEFAULT_CONFIG, useValue: { variant: IdsFormFieldVariant.LIGHT } }],
    });
    const customFixture = TestBed.createComponent(IdsFieldsetComponent);
    customFixture.detectChanges();

    expect(Array.from((customFixture.nativeElement as HTMLElement).classList)).toEqual(expect.arrayContaining([
      'ids-fieldset-compact',
      'ids-fieldset-light',
    ]));
  });
});

describe('IdsFieldsetComponent accessibility', () => {
  it('should name the group with the legend as its first child', () => {
    const legend = fieldset().firstElementChild!;

    expect(legend.tagName).toBe('LEGEND');
    expect(legend.textContent).toBe('Personal data');
  });

  it.each([
    [
      'by default',
      {},
    ],
    [
      'with a fieldset message',
      { showMessage: true },
    ],
    [
      'with the light variant',
      { variant: IdsFormFieldVariant.LIGHT },
    ],
  ])('should have no axe violations %s', async(_name, props: Partial<TestHostComponent>) => {
    await set(props);

    expect(await axe(element)).toHaveNoViolations();
  });
});
