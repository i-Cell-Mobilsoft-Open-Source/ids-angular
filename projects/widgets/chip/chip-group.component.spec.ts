import { IDS_CHIP_DEFAULT_CONFIG } from './chip-defaults';
import { IDS_CHIP_GROUP_DEFAULT_CONFIG, IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY } from './chip-group-defaults';
import { IdsChipGroupComponent } from './chip-group.component';
import { IdsChipComponent } from './chip.component';
import { IdsChipAppearance, IdsChipAppearanceType } from './types/chip-appearance.type';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, viewChild, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { axe } from 'jest-axe';

@Component({
  imports: [
    IdsChipGroupComponent,
    IdsChipComponent,
  ],
  template: `
    <ids-chip-group [appearance]="appearance" [size]="size" [disabled]="disabled">
      <button idsChip type="button">First</button>
      <button idsChip type="button">Second</button>
      <ids-chip>Third</ids-chip>
    </ids-chip-group>
  `,
})
class TestHostComponent {
  public group = viewChild.required(IdsChipGroupComponent);
  public chips = viewChildren(IdsChipComponent);
  public appearance: IdsChipAppearanceType = IdsChipAppearance.FILLED;
  public size: IdsSizeType = IdsSize.COMPACT;
  public disabled = false;
}

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function render(): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

function groupElement(): HTMLElement {
  return element.querySelector('ids-chip-group')!;
}

function chipElements(): HTMLElement[] {
  return Array.from(element.querySelectorAll<HTMLElement>('.ids-chip'));
}

const chipCount = 3;

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
    ],
  }).compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  await render();
});

describe('IdsChipGroupComponent rendering', () => {
  it('should create with the default configuration', () => {
    expect(host.group()).toBeTruthy();
    expect(host.chips()).toHaveLength(chipCount);
    expect(groupElement().classList.contains('ids-chip-group')).toBe(true);
    expect(groupElement().classList.contains('ids-chip-group-filled')).toBe(true);
    expect(groupElement().classList.contains('ids-chip-group-compact')).toBe(true);
    expect(groupElement().classList.contains('ids-chip-group-disabled')).toBe(false);
  });

  it('should generate a unique id', () => {
    expect(groupElement().id).toMatch(/^ids-chip-group-\d+$/);
  });

  it('should project the chips', () => {
    expect(groupElement().querySelectorAll('.ids-chip')).toHaveLength(chipCount);
  });

  it.each(Object.values(IdsChipAppearance))('should apply the %s appearance class', async(appearance) => {
    host.appearance = appearance;
    await render();

    expect(groupElement().classList.contains(`ids-chip-group-${appearance}`)).toBe(true);
  });

  it.each([
    IdsSize.COMPACT,
    IdsSize.COMFORTABLE,
  ])('should apply the %s size class', async(size) => {
    host.size = size;
    await render();

    expect(groupElement().classList.contains(`ids-chip-group-${size}`)).toBe(true);
  });

  it('should add the disabled class when disabled', async() => {
    host.disabled = true;
    await render();

    expect(groupElement().classList.contains('ids-chip-group-disabled')).toBe(true);
  });
});

describe('IdsChipGroupComponent chip inheritance', () => {
  it('should pass the appearance to the chips', async() => {
    host.appearance = IdsChipAppearance.OUTLINED;
    await render();

    chipElements().forEach((chip) => {
      expect(chip.classList.contains('ids-chip-outlined')).toBe(true);
      expect(chip.classList.contains('ids-chip-filled')).toBe(false);
    });
  });

  it('should pass the size to the chips', async() => {
    host.size = IdsSize.COMFORTABLE;
    await render();

    chipElements().forEach((chip) => {
      expect(chip.classList.contains('ids-chip-comfortable')).toBe(true);
      expect(chip.classList.contains('ids-chip-compact')).toBe(false);
    });
  });

  it('should disable the interactive chips when the group is disabled', async() => {
    host.disabled = true;
    await render();
    const [
      first,
      second,
      third,
    ] = chipElements();

    expect(first.hasAttribute('disabled')).toBe(true);
    expect(second.hasAttribute('disabled')).toBe(true);
    expect(third.hasAttribute('disabled')).toBe(false);
  });
});

describe('IdsChipGroupComponent accessibility', () => {
  it('should have no axe violations by default', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when outlined', async() => {
    host.appearance = IdsChipAppearance.OUTLINED;
    await render();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when disabled', async() => {
    host.disabled = true;
    await render();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should keep the interactive chips reachable with the tab key', () => {
    const [
      first,
      second,
    ] = chipElements();

    expect(first.getAttribute('tabindex')).toBe('0');
    expect(second.getAttribute('tabindex')).toBe('0');
  });

});

describe('IdsChipGroupComponent default configuration', () => {
  it('should use the factory defaults', () => {
    expect(IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY()).toEqual({
      appearance: IdsChipAppearance.FILLED,
      size: IdsSize.COMPACT,
    });
  });

  it('should provide the factory defaults through the injection token', () => {
    expect(TestBed.inject(IDS_CHIP_GROUP_DEFAULT_CONFIG)).toEqual(IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY());
  });

  it('should apply a custom default configuration', async() => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [IdsChipGroupComponent],
      providers: [
        {
          provide: IDS_CHIP_DEFAULT_CONFIG,
          useValue: { appearance: IdsChipAppearance.OUTLINED, size: IdsSize.COMFORTABLE },
        },
      ],
    }).compileComponents();

    const group = TestBed.createComponent(IdsChipGroupComponent);
    group.detectChanges();

    expect(group.componentInstance.appearance()).toBe(IdsChipAppearance.OUTLINED);
    expect(group.componentInstance.size()).toBe(IdsSize.COMFORTABLE);
  });
});
