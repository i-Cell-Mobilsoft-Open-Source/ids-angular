import { IDS_CHIP_DEFAULT_CONFIG, IDS_CHIP_DEFAULT_CONFIG_FACTORY } from './chip-defaults';
import { IdsChipComponent } from './chip.component';
import { IdsChipAppearance, IdsChipAppearanceType } from './types/chip-appearance.type';
import { IdsChipRemoveEvent } from './types/chip-events.type';
import { IdsChipVariant, IdsChipVariantType } from './types/chip-variant.type';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdsAvatarComponent } from '@i-cell/ids-angular/avatar';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { axe } from 'jest-axe';

@Component({
  imports: [IdsChipComponent],
  template: `
    <button
      idsChip
      type="button"
      [removable]="removable"
      [appearance]="appearance"
      [size]="size"
      [variant]="variant"
      [disabled]="disabled"
      [tabIndex]="tabIndex"
      [id]="chipId"
      (removed)="onRemoved($event)"
    >
      Label
    </button>
  `,
})
class ButtonHostComponent {
  public chip = viewChild.required(IdsChipComponent);
  public removable = false;
  public appearance: IdsChipAppearanceType = IdsChipAppearance.FILLED;
  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsChipVariantType = IdsChipVariant.SURFACE;
  public disabled = false;
  public tabIndex: number | string = 0;
  public chipId: string | undefined = undefined;
  public onRemoved = jest.fn<void, [IdsChipRemoveEvent]>();
}

@Component({
  imports: [IdsChipComponent],
  template: `
    <ids-chip [removable]="true" [disabled]="true">Static chip</ids-chip>
  `,
})
class StaticHostComponent {
  public chip = viewChild.required(IdsChipComponent);
}

@Component({
  imports: [
    IdsChipComponent,
    IdsAvatarComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
  ],
  template: `
    <button idsChip type="button">
      <ids-avatar initials="AB" />
      <ids-icon idsLeadingIcon fontIcon="star" />
      With content
    </button>
    <button idsChip type="button">
      Custom action
      <button type="button" idsIconButton aria-label="Custom action">
        <ids-icon fontIcon="add" />
      </button>
    </button>
  `,
})
class ContentHostComponent {}

const customTabIndex = 5;

let element: HTMLElement;

async function render<T>(fixture: ComponentFixture<T>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

async function setup<T>(hostType: new () => T): Promise<ComponentFixture<T>> {
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

describe('IdsChipComponent rendering', () => {
  let fixture: ComponentFixture<ButtonHostComponent>;
  let host: ButtonHostComponent;
  let chipElement: HTMLElement;

  beforeEach(async() => {
    fixture = await setup(ButtonHostComponent);
    host = fixture.componentInstance;
    chipElement = element.querySelector('button[idsChip]')!;
  });

  it('should create with the default configuration', () => {
    expect(host.chip()).toBeTruthy();
    expect(chipElement.classList.contains('ids-chip')).toBe(true);
    expect(chipElement.classList.contains('ids-chip-filled')).toBe(true);
    expect(chipElement.classList.contains('ids-chip-compact')).toBe(true);
    expect(chipElement.classList.contains('ids-chip-surface')).toBe(true);
  });

  it('should render the label', () => {
    expect(chipElement.querySelector('.ids-chip__label')?.textContent?.trim()).toBe('Label');
  });

  it('should generate a unique id when none is provided', () => {
    expect(chipElement.id).toMatch(/^ids-chip-\d+$/);
  });

  it('should use the provided id', async() => {
    host.chipId = 'custom-chip';
    await render(fixture);

    expect(chipElement.id).toBe('custom-chip');
  });

  it.each(Object.values(IdsChipAppearance))('should apply the %s appearance class', async(appearance) => {
    host.appearance = appearance;
    await render(fixture);

    expect(chipElement.classList.contains(`ids-chip-${appearance}`)).toBe(true);
  });

  it.each(Object.values(IdsChipVariant))('should apply the %s variant class', async(variant) => {
    host.variant = variant;
    await render(fixture);

    expect(chipElement.classList.contains(`ids-chip-${variant}`)).toBe(true);
  });

  it.each([
    IdsSize.COMPACT,
    IdsSize.COMFORTABLE,
  ])('should apply the %s size class', async(size) => {
    host.size = size;
    await render(fixture);

    expect(chipElement.classList.contains(`ids-chip-${size}`)).toBe(true);
  });

  it('should not render the remove button when not removable', () => {
    expect(chipElement.querySelector('button')).toBeNull();
  });

  it('should render the remove button when removable', async() => {
    host.removable = true;
    await render(fixture);

    expect(chipElement.querySelector('button.ids-icon-button')).not.toBeNull();
  });
});

describe('IdsChipComponent removing', () => {
  let fixture: ComponentFixture<ButtonHostComponent>;
  let host: ButtonHostComponent;
  let chipElement: HTMLElement;

  beforeEach(async() => {
    fixture = await setup(ButtonHostComponent);
    host = fixture.componentInstance;
    chipElement = element.querySelector('button[idsChip]')!;
    host.removable = true;
    await render(fixture);
  });

  it('should emit the removed event with the chip when the remove button is clicked', () => {
    chipElement.querySelector<HTMLButtonElement>('button')!.click();

    expect(host.onRemoved).toHaveBeenCalledTimes(1);
    expect(host.onRemoved).toHaveBeenCalledWith({ chip: host.chip() });
  });

  it('should emit the removed event through the public API', () => {
    host.chip().remove();

    expect(host.onRemoved).toHaveBeenCalledWith({ chip: host.chip() });
  });

  it('should not emit the removed event when the chip itself is clicked', () => {
    chipElement.click();

    expect(host.onRemoved).not.toHaveBeenCalled();
  });
});

describe('IdsChipComponent embedded content', () => {
  let fixture: ComponentFixture<ButtonHostComponent>;
  let host: ButtonHostComponent;
  let chipElement: HTMLElement;

  beforeEach(async() => {
    fixture = await setup(ButtonHostComponent);
    host = fixture.componentInstance;
    chipElement = element.querySelector('button[idsChip]')!;
    host.removable = true;
    await render(fixture);
  });

  function removeButton(): HTMLElement {
    return chipElement.querySelector<HTMLElement>('button')!;
  }

  it.each([
    [
      IdsChipVariant.PRIMARY,
      'light',
    ],
    [
      IdsChipVariant.SECONDARY,
      'light',
    ],
    [
      IdsChipVariant.DARK,
      'light',
    ],
    [
      IdsChipVariant.LIGHT,
      'secondary',
    ],
    [
      IdsChipVariant.SURFACE,
      'surface',
    ],
  ])('should render the remove button of a filled %s chip with the %s variant', async(variant, expected) => {
    host.variant = variant;
    await render(fixture);

    expect(removeButton().classList.contains(`ids-icon-button-${expected}`)).toBe(true);
  });

  it.each(Object.values(IdsChipVariant))('should render the remove button of an outlined %s chip with the same variant', async(variant) => {
    host.appearance = IdsChipAppearance.OUTLINED;
    host.variant = variant;
    await render(fixture);

    expect(removeButton().classList.contains(`ids-icon-button-${variant}`)).toBe(true);
  });

  it('should render the remove button with the standard appearance', () => {
    expect(removeButton().classList.contains('ids-icon-button-standard')).toBe(true);
  });

  it('should use the surface variant for embedded avatars', () => {
    expect(host.chip().embeddedAvatarVariant()).toBe('surface');
  });
});

describe('IdsChipComponent projected content', () => {
  let chips: HTMLElement[];

  beforeEach(async() => {
    await setup(ContentHostComponent);
    chips = Array.from(element.querySelectorAll<HTMLElement>('button[idsChip]'));
  });

  it('should project an avatar with the surface variant', () => {
    expect(chips[0].querySelector('ids-avatar')?.classList.contains('ids-avatar-surface')).toBe(true);
  });

  it('should project the leading icon', () => {
    expect(chips[0].querySelector('ids-icon[idsLeadingIcon]')).not.toBeNull();
  });

  it('should project a custom icon button when not removable', () => {
    expect(chips[1].querySelector('button[idsIconButton]')).not.toBeNull();
  });

  it('should have no axe violations with an avatar and a leading icon', async() => {
    expect(await axe(chips[0])).toHaveNoViolations();
  });
});

describe('IdsChipComponent static element', () => {
  let host: StaticHostComponent;
  let chipElement: HTMLElement;

  beforeEach(async() => {
    const fixture = await setup(StaticHostComponent);
    host = fixture.componentInstance;
    chipElement = element.querySelector('ids-chip')!;
  });

  it('should apply the chip host classes', () => {
    expect(host.chip()).toBeTruthy();
    expect(chipElement.classList.contains('ids-chip')).toBe(true);
  });

  it('should ignore the removable input as it is not interactive', () => {
    expect(chipElement.querySelector('button')).toBeNull();
    expect(chipElement.hasAttribute('role')).toBe(false);
  });

  it('should not be disabled natively as it is not interactive', () => {
    expect(chipElement.hasAttribute('disabled')).toBe(false);
  });

  it('should not be reachable with the tab key', () => {
    expect(chipElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should have no axe violations', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });
});

describe('IdsChipComponent accessibility', () => {
  let fixture: ComponentFixture<ButtonHostComponent>;
  let host: ButtonHostComponent;
  let chipElement: HTMLElement;

  beforeEach(async() => {
    fixture = await setup(ButtonHostComponent);
    host = fixture.componentInstance;
    chipElement = element.querySelector('button[idsChip]')!;
  });

  it('should have no axe violations by default', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });

  it.each(Object.values(IdsChipVariant))('should have no axe violations with the %s variant', async(variant) => {
    host.variant = variant;
    await render(fixture);

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when outlined', async() => {
    host.appearance = IdsChipAppearance.OUTLINED;
    await render(fixture);

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when disabled', async() => {
    host.disabled = true;
    await render(fixture);

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should be reachable with the tab key by default', () => {
    expect(chipElement.getAttribute('tabindex')).toBe('0');
  });

  it.each([
    [
      customTabIndex,
      '5',
    ],
    [
      '3',
      '3',
    ],
  ])('should coerce the tab index %p to %s', async(value, expected) => {
    host.tabIndex = value;
    await render(fixture);

    expect(chipElement.getAttribute('tabindex')).toBe(expected);
  });

  it('should remove the chip from the tab order when disabled', async() => {
    host.disabled = true;
    await render(fixture);

    expect(chipElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should disable the native button when disabled', async() => {
    host.disabled = true;
    await render(fixture);

    expect(chipElement.hasAttribute('disabled')).toBe(true);
  });

  it('should keep the native button enabled by default', () => {
    expect(chipElement.hasAttribute('disabled')).toBe(false);
  });

  it('should not set a role when not removable', () => {
    expect(chipElement.hasAttribute('role')).toBe(false);
  });

  it('should present the chip as presentation and move the focus to the remove button when removable', async() => {
    host.removable = true;
    await render(fixture);

    expect(chipElement.getAttribute('role')).toBe('presentation');
    expect(chipElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should render the remove button as a focusable native button', async() => {
    host.removable = true;
    await render(fixture);
    const removeButton = chipElement.querySelector<HTMLButtonElement>('button')!;

    expect(removeButton.type).toBe('button');
    expect(removeButton.hasAttribute('tabindex')).toBe(false);
    expect(removeButton.disabled).toBe(false);
  });

  it('should hide the remove icon from assistive technologies', async() => {
    host.removable = true;
    await render(fixture);

    expect(chipElement.querySelector('button ids-icon')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should disable the remove button when the chip is disabled', async() => {
    host.removable = true;
    host.disabled = true;
    await render(fixture);
    const removeButton = chipElement.querySelector<HTMLButtonElement>('button')!;

    expect(removeButton.disabled).toBe(true);
    expect(removeButton.getAttribute('aria-disabled')).toBe('true');
  });
});

describe('IdsChipComponent default configuration', () => {
  it('should use the factory defaults', () => {
    expect(IDS_CHIP_DEFAULT_CONFIG_FACTORY()).toEqual({
      removable: false,
      appearance: IdsChipAppearance.FILLED,
      size: IdsSize.COMPACT,
      variant: IdsChipVariant.SURFACE,
    });
  });

  it('should provide the factory defaults through the injection token', () => {
    TestBed.configureTestingModule({});

    expect(TestBed.inject(IDS_CHIP_DEFAULT_CONFIG)).toEqual(IDS_CHIP_DEFAULT_CONFIG_FACTORY());
  });

  it('should apply a partial custom default configuration', async() => {
    await TestBed.configureTestingModule({
      imports: [IdsChipComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: IDS_CHIP_DEFAULT_CONFIG,
          useValue: { removable: true, variant: IdsChipVariant.PRIMARY },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(IdsChipComponent);
    const chip = fixture.componentInstance;
    await render(fixture);

    expect(chip.removable()).toBe(true);
    expect(chip.variant()).toBe(IdsChipVariant.PRIMARY);
    expect(chip.appearance()).toBe(IdsChipAppearance.FILLED);
    expect(chip.size()).toBe(IdsSize.COMPACT);
  });
});
