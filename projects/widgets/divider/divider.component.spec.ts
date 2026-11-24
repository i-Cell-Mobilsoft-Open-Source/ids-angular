import { IDS_DIVIDER_DEFAULT_CONFIG } from './divider-defaults';
import { IdsDividerComponent } from './divider.component';
import { IdsDividerVariant, IdsDividerVariantType } from './types/divider-variant.type';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { axe } from 'jest-axe';

@Component({
  imports: [IdsDividerComponent],
  template: `
    <p>Above</p>
    <ids-divider
      [orientation]="orientation"
      [size]="size"
      [variant]="variant"
      [width]="width"
      [height]="height"
    />
    <div idsDivider [orientation]="orientation"></div>
    <p>Below</p>
  `,
})
class TestHostComponent {
  public orientation: IdsOrientationType = IdsOrientation.HORIZONTAL;
  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsDividerVariantType = IdsDividerVariant.PRIMARY;
  public width = '100%';
  public height = '100%';
}

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function set(props: Partial<TestHostComponent>): Promise<void> {
  Object.assign(host, props);
  fixture.detectChanges();
  await fixture.whenStable();
}

function dividers(): HTMLElement[] {
  return Array.from(element.querySelectorAll<HTMLElement>('ids-divider, div[idsDivider]'));
}

function divider(): HTMLElement {
  return dividers()[0];
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

describe('IdsDividerComponent rendering', () => {
  it('should render both selectors with the default configuration', () => {
    expect(dividers()).toHaveLength(2);
    dividers().forEach((dividerElement) => {
      expect(Array.from(dividerElement.classList)).toEqual(expect.arrayContaining([
        'ids-divider',
        'ids-divider-horizontal',
        'ids-divider-compact',
        'ids-divider-primary',
      ]));
      expect(dividerElement.style.width).toBe('100%');
      expect(dividerElement.style.height).toBe('');
    });
  });

  it.each([
    ...Object.values(IdsSize).map((value) => [
      'size',
      value,
    ]),
    ...Object.values(IdsDividerVariant).map((value) => [
      'variant',
      value,
    ]),
  ])('should apply the %s class for %s', async(property, value) => {
    await set({ [property]: value });

    expect(divider().classList).toContain(`ids-divider-${value}`);
  });

  it.each([
    { orientation: IdsOrientation.HORIZONTAL, width: '50%', height: '' },
    { orientation: IdsOrientation.VERTICAL, width: '', height: '24px' },
  ])('should only apply the $orientation dimension when $orientation', async({ orientation, width, height }) => {
    await set({ orientation, width: '50%', height: '24px' });

    expect(divider().classList).toContain(`ids-divider-${orientation}`);
    expect(divider().style.width).toBe(width);
    expect(divider().style.height).toBe(height);
  });
});

describe('IdsDividerComponent default configuration', () => {
  it('should apply a partial custom default configuration', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: IDS_DIVIDER_DEFAULT_CONFIG,
          useValue: { orientation: IdsOrientation.VERTICAL, height: '48px' },
        },
      ],
    });
    const customFixture = TestBed.createComponent(IdsDividerComponent);
    customFixture.detectChanges();
    const customElement = customFixture.nativeElement as HTMLElement;

    expect(Array.from(customElement.classList)).toEqual(expect.arrayContaining([
      'ids-divider-vertical',
      'ids-divider-compact',
      'ids-divider-primary',
    ]));
    expect(customElement.style.height).toBe('48px');
    expect(customElement.style.width).toBe('');
  });
});

describe('IdsDividerComponent accessibility', () => {
  it.each(Object.values(IdsOrientation))('should have no axe violations when %s', async(orientation) => {
    await set({ orientation });

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should stay decorative: no content and out of the keyboard focus order', () => {
    dividers().forEach((dividerElement) => {
      expect(dividerElement.childNodes).toHaveLength(0);
      expect(dividerElement.textContent).toBe('');
      expect(dividerElement.hasAttribute('tabindex')).toBe(false);
      expect(dividerElement.tabIndex).toBe(-1);
    });
  });
});
