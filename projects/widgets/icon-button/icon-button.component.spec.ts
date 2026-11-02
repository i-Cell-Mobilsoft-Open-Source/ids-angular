import { IdsIconButtonComponent } from './icon-button.component';
import { IDS_ICON_BUTTON_PARENT } from './tokens/icon-button-parent';
import { IdsIconButtonAppearance, IdsIconButtonAppearanceType } from './types/icon-button-appearance.type';
import { IdsIconButtonVariant, IdsIconButtonVariantType } from './types/icon-button-variant.type';

import { Component, signal, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { axe } from 'jest-axe';

@Component({
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  template: `
    <button
      idsIconButton
      type="button"
      aria-label="Search"
      [appearance]="appearance"
      [size]="size"
      [variant]="variant"
      [disabled]="disabled"
      [allowCustomContent]="allowCustomContent"
      (click)="clicks = clicks + 1"
    >
      @if (withIcon) {
        <ids-icon fontIcon="search" />
      }
      @if (withCustomContent) {
        <span class="custom">Custom</span>
      }
    </button>
  `,
})
class IconButtonHostComponent {
  public appearance: IdsIconButtonAppearanceType = IdsIconButtonAppearance.FILLED;
  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsIconButtonVariantType = IdsIconButtonVariant.PRIMARY;
  public disabled = false;
  public allowCustomContent = false;
  public withIcon = true;
  public withCustomContent = false;
  public clicks = 0;
}

@Component({
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  template: '<button idsIconButton type="button" aria-label="Default"><ids-icon fontIcon="search" /></button>',
})
class DefaultIconButtonHostComponent {}

@Component({
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  template: `
    <a idsIconButton href="https://example.com/page" aria-label="Open" [disabled]="disabled">
      <ids-icon fontIcon="search" />
    </a>
  `,
})
class LinkHostComponent {
  public disabled = false;
}

@Component({
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
    RouterLink,
  ],
  template: `
    <a idsIconButton routerLink="/target" aria-label="Open" [disabled]="disabled">
      <ids-icon fontIcon="search" />
    </a>
  `,
})
class RouterLinkHostComponent {
  public disabled = false;
}

const parentAppearance = signal<IdsIconButtonAppearanceType>(IdsIconButtonAppearance.STANDARD);
const parentVariant = signal<IdsIconButtonVariantType>(IdsIconButtonVariant.ERROR);
const parentSize = signal<IdsSizeType>(IdsSize.SPACIOUS);
const parentDisabled = signal(false);

@Component({
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  providers: [
    {
      provide: IDS_ICON_BUTTON_PARENT,
      useValue: {
        embeddedIconButtonAppearance: parentAppearance,
        embeddedIconButtonVariant: parentVariant,
        embeddedIconButtonSize: parentSize,
        disabled: parentDisabled,
      },
    },
  ],
  template: `
    <button idsIconButton type="button" aria-label="Embedded" appearance="filled" size="compact" variant="primary">
      <ids-icon fontIcon="search" />
    </button>
  `,
})
class EmbeddedIconButtonHostComponent {}

@Component({
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  providers: [
    {
      provide: IDS_ICON_BUTTON_PARENT,
      useValue: {
        embeddedIconButtonAppearance: parentAppearance,
        embeddedIconButtonVariant: parentVariant,
      },
    },
  ],
  template: `
    <button idsIconButton type="button" aria-label="Embedded" size="dense" disabled>
      <ids-icon fontIcon="search" />
    </button>
  `,
})
class MinimalParentHostComponent {}

async function render(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

async function create<T>(type: Type<T>): Promise<ComponentFixture<T>> {
  const fixture = TestBed.createComponent(type);
  await render(fixture);
  return fixture;
}

function buttonOf(fixture: ComponentFixture<unknown>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[idsIconButton]')!;
}

beforeEach(async() => {
  parentAppearance.set(IdsIconButtonAppearance.STANDARD);
  parentVariant.set(IdsIconButtonVariant.ERROR);
  parentSize.set(IdsSize.SPACIOUS);
  parentDisabled.set(false);
  await TestBed.configureTestingModule({
    imports: [
      IconButtonHostComponent,
      DefaultIconButtonHostComponent,
      LinkHostComponent,
      RouterLinkHostComponent,
      EmbeddedIconButtonHostComponent,
      MinimalParentHostComponent,
    ],
    providers: [provideRouter([])],
  }).compileComponents();
});

describe('IdsIconButtonComponent rendering', () => {
  it('should render with the default configuration', async() => {
    const button = buttonOf(await create(DefaultIconButtonHostComponent));

    expect(button.classList.contains('ids-icon-button')).toBe(true);
    expect(button.classList.contains('ids-icon-button-filled')).toBe(true);
    expect(button.classList.contains('ids-icon-button-compact')).toBe(true);
    expect(button.classList.contains('ids-icon-button-primary')).toBe(true);
    expect(button.classList.contains('ids-icon-button-disabled')).toBe(false);
  });

  it('should generate a unique id', async() => {
    const first = buttonOf(await create(DefaultIconButtonHostComponent));
    const second = buttonOf(await create(DefaultIconButtonHostComponent));

    expect(first.id).toMatch(/^ids-icon-button-\d+$/);
    expect(second.id).not.toBe(first.id);
  });

  it.each(Object.values(IdsIconButtonAppearance))('should apply the %s appearance class', async(appearance) => {
    const fixture = await create(IconButtonHostComponent);
    fixture.componentInstance.appearance = appearance;
    await render(fixture);

    expect(buttonOf(fixture).classList.contains(`ids-icon-button-${appearance}`)).toBe(true);
  });

  it.each(Object.values(IdsIconButtonVariant))('should apply the %s variant class', async(variant) => {
    const fixture = await create(IconButtonHostComponent);
    fixture.componentInstance.variant = variant;
    await render(fixture);

    expect(buttonOf(fixture).classList.contains(`ids-icon-button-${variant}`)).toBe(true);
  });

  it.each(Object.values(IdsSize))('should apply the %s size class', async(size) => {
    const fixture = await create(IconButtonHostComponent);
    fixture.componentInstance.size = size;
    await render(fixture);

    expect(buttonOf(fixture).classList.contains(`ids-icon-button-${size}`)).toBe(true);
  });

  it('should project the icon', async() => {
    const button = buttonOf(await create(IconButtonHostComponent));

    expect(button.querySelectorAll('ids-icon')).toHaveLength(1);
  });

  it('should project nothing but icons by default', async() => {
    const fixture = await create(IconButtonHostComponent);
    fixture.componentInstance.withCustomContent = true;
    await render(fixture);

    expect(buttonOf(fixture).querySelector('.custom')).toBeNull();
    expect(buttonOf(fixture).querySelectorAll('ids-icon')).toHaveLength(1);
  });

  it('should project any content when custom content is allowed', async() => {
    const fixture = await create(IconButtonHostComponent);
    fixture.componentInstance.allowCustomContent = true;
    fixture.componentInstance.withCustomContent = true;
    await render(fixture);

    expect(buttonOf(fixture).querySelector('.custom')?.textContent).toBe('Custom');
  });

  it('should render no content without an icon', async() => {
    const fixture = await create(IconButtonHostComponent);
    fixture.componentInstance.withIcon = false;
    fixture.componentInstance.withCustomContent = true;
    await render(fixture);

    expect(buttonOf(fixture).children).toHaveLength(0);
  });
});

describe('IdsIconButtonComponent behavior', () => {
  it('should emit the click event when enabled', async() => {
    const fixture = await create(IconButtonHostComponent);

    buttonOf(fixture).click();

    expect(fixture.componentInstance.clicks).toBe(1);
  });

  it('should apply the disabled class and the native disabled attribute', async() => {
    const fixture = await create(IconButtonHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);

    const button = buttonOf(fixture) as HTMLButtonElement;
    expect(button.classList.contains('ids-icon-button-disabled')).toBe(true);
    expect(button.disabled).toBe(true);
  });

  it('should not emit the click event when disabled', async() => {
    const fixture = await create(IconButtonHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);

    buttonOf(fixture).click();

    expect(fixture.componentInstance.clicks).toBe(0);
  });

  it('should remove the disabled state again when re-enabled', async() => {
    const fixture = await create(IconButtonHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);
    fixture.componentInstance.disabled = false;
    await render(fixture);

    const button = buttonOf(fixture) as HTMLButtonElement;
    expect(button.disabled).toBe(false);
    expect(button.classList.contains('ids-icon-button-disabled')).toBe(false);
  });
});

describe('IdsIconButtonComponent as a link', () => {
  it('should keep the href of an enabled link', async() => {
    const link = buttonOf(await create(LinkHostComponent));

    expect(link.getAttribute('href')).toBe('https://example.com/page');
    expect(link.hasAttribute('data-href')).toBe(false);
  });

  it('should remove the href of a disabled link and store it in data-href', async() => {
    const fixture = await create(LinkHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);

    const link = buttonOf(fixture);
    expect(link.hasAttribute('href')).toBe(false);
    expect(link.getAttribute('data-href')).toBe('https://example.com/page');
  });

  it('should restore the href when the link is enabled again', async() => {
    const fixture = await create(LinkHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);
    fixture.componentInstance.disabled = false;
    await render(fixture);

    const link = buttonOf(fixture);
    expect(link.getAttribute('href')).toBe('https://example.com/page');
    expect(link.hasAttribute('data-href')).toBe(false);
  });

  it('should remove and restore the href of a router link without using data-href', async() => {
    const fixture = await create(RouterLinkHostComponent);
    expect(buttonOf(fixture).getAttribute('href')).toBe('/target');

    fixture.componentInstance.disabled = true;
    await render(fixture);
    expect(buttonOf(fixture).hasAttribute('href')).toBe(false);
    expect(buttonOf(fixture).hasAttribute('data-href')).toBe(false);

    fixture.componentInstance.disabled = false;
    await render(fixture);
    expect(buttonOf(fixture).getAttribute('href')).toBe('/target');
  });
});

describe('IdsIconButtonComponent inside a parent', () => {
  it('should use the appearance, variant and size of the parent instead of its own', async() => {
    const button = buttonOf(await create(EmbeddedIconButtonHostComponent));

    expect(button.classList.contains('ids-icon-button-standard')).toBe(true);
    expect(button.classList.contains('ids-icon-button-error')).toBe(true);
    expect(button.classList.contains('ids-icon-button-spacious')).toBe(true);
    expect(button.classList.contains('ids-icon-button-filled')).toBe(false);
    expect(button.classList.contains('ids-icon-button-primary')).toBe(false);
    expect(button.classList.contains('ids-icon-button-compact')).toBe(false);
  });

  it('should follow the changes of the parent', async() => {
    const fixture = await create(EmbeddedIconButtonHostComponent);
    parentAppearance.set(IdsIconButtonAppearance.OUTLINED);
    parentVariant.set(IdsIconButtonVariant.SUCCESS);
    parentSize.set(IdsSize.DENSE);
    await render(fixture);

    const button = buttonOf(fixture);
    expect(button.classList.contains('ids-icon-button-outlined')).toBe(true);
    expect(button.classList.contains('ids-icon-button-success')).toBe(true);
    expect(button.classList.contains('ids-icon-button-dense')).toBe(true);
  });

  it('should be disabled by the parent', async() => {
    const fixture = await create(EmbeddedIconButtonHostComponent);
    expect((buttonOf(fixture) as HTMLButtonElement).disabled).toBe(false);

    parentDisabled.set(true);
    await render(fixture);

    expect((buttonOf(fixture) as HTMLButtonElement).disabled).toBe(true);
  });

  it('should use its own size and disabled state when the parent does not define them', async() => {
    const button = buttonOf(await create(MinimalParentHostComponent)) as HTMLButtonElement;

    expect(button.classList.contains('ids-icon-button-dense')).toBe(true);
    expect(button.disabled).toBe(true);
    expect(button.classList.contains('ids-icon-button-standard')).toBe(true);
  });
});

describe('IdsIconButtonComponent accessibility', () => {
  it('should render a native button named by its aria-label', async() => {
    const button = buttonOf(await create(IconButtonHostComponent));

    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('aria-label')).toBe('Search');
  });

  it('should hide the decorative icon from assistive technology', async() => {
    const icon = buttonOf(await create(IconButtonHostComponent)).querySelector('ids-icon');

    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should be focusable when enabled and announce it as enabled', async() => {
    const button = buttonOf(await create(IconButtonHostComponent));

    button.focus();

    expect(document.activeElement).toBe(button);
    expect(button.getAttribute('aria-disabled')).toBe('false');
  });

  it('should not be focusable when disabled and announce it as disabled', async() => {
    const fixture = await create(IconButtonHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);
    const button = buttonOf(fixture);

    button.focus();

    expect(document.activeElement).not.toBe(button);
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('should announce a button disabled by its parent as disabled', async() => {
    const fixture = await create(EmbeddedIconButtonHostComponent);
    parentDisabled.set(true);
    await render(fixture);

    expect(buttonOf(fixture).getAttribute('aria-disabled')).toBe('true');
  });

  it('should keep an enabled link navigable and make a disabled link non-interactive', async() => {
    const fixture = await create(LinkHostComponent);
    expect(buttonOf(fixture).hasAttribute('href')).toBe(true);
    expect(buttonOf(fixture).getAttribute('aria-disabled')).toBe('false');

    fixture.componentInstance.disabled = true;
    await render(fixture);
    buttonOf(fixture).focus();

    expect(buttonOf(fixture).hasAttribute('href')).toBe(false);
    expect(buttonOf(fixture).getAttribute('aria-disabled')).toBe('true');
    expect(document.activeElement).not.toBe(buttonOf(fixture));
  });

  it('should have no axe violations by default', async() => {
    const fixture = await create(IconButtonHostComponent);

    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it('should have no axe violations when disabled', async() => {
    const fixture = await create(IconButtonHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);

    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it('should have no axe violations as an enabled link', async() => {
    const fixture = await create(LinkHostComponent);

    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it('should have no axe violations inside a parent', async() => {
    const fixture = await create(EmbeddedIconButtonHostComponent);

    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
