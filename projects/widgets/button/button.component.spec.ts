import { IdsButtonGroupComponent } from './button-group.component';
import { IdsButtonComponent } from './button.component';
import { IDS_BUTTON_PARENT } from './tokens/button-parent';
import { IdsButtonAppearance, IdsButtonAppearanceType } from './types/button-appearance.type';
import { IdsButtonVariant, IdsButtonVariantType } from './types/button-variant.type';

import { Component, signal, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { axe } from 'jest-axe';

@Component({
  imports: [
    IdsButtonComponent,
    IdsIconComponent,
  ],
  template: `
    <button
      idsButton
      type="button"
      [appearance]="appearance"
      [size]="size"
      [variant]="variant"
      [disabled]="disabled"
      (click)="clicks = clicks + 1"
    >
      @if (leadingIcon) {
        <ids-icon icon-leading fontIcon="search" />
      }
      Save
      @if (trailingIcon) {
        <ids-icon icon-trailing fontIcon="done" />
      }
    </button>
  `,
})
class ButtonHostComponent {
  public appearance: IdsButtonAppearanceType = IdsButtonAppearance.FILLED;
  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsButtonVariantType = IdsButtonVariant.PRIMARY;
  public disabled = false;
  public leadingIcon = false;
  public trailingIcon = false;
  public clicks = 0;
}

@Component({
  imports: [IdsButtonComponent],
  template: '<button idsButton type="button">Default</button>',
})
class DefaultButtonHostComponent {}

@Component({
  imports: [IdsButtonComponent],
  template: '<a idsButton href="https://example.com/page" [disabled]="disabled">Link</a>',
})
class LinkHostComponent {
  public disabled = false;
}

@Component({
  imports: [
    IdsButtonComponent,
    RouterLink,
  ],
  template: '<a idsButton routerLink="/target" [disabled]="disabled">Link</a>',
})
class RouterLinkHostComponent {
  public disabled = false;
}

@Component({
  imports: [
    IdsButtonComponent,
    IdsButtonGroupComponent,
  ],
  template: `
    <ids-button-group [size]="size">
      <button idsButton type="button">First</button>
      <button idsButton type="button">Second</button>
    </ids-button-group>
  `,
})
class GroupHostComponent {
  public size: IdsSizeType = IdsSize.SPACIOUS;
}

const embeddedVariant = signal<IdsButtonVariantType>(IdsButtonVariant.ERROR);

@Component({
  imports: [IdsButtonComponent],
  providers: [
    {
      provide: IDS_BUTTON_PARENT,
      useValue: { embeddedButtonVariant: embeddedVariant },
    },
  ],
  template: '<button idsButton type="button" variant="primary">Embedded</button>',
})
class EmbeddedButtonHostComponent {}

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
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('[idsButton]')!;
}

beforeEach(async() => {
  embeddedVariant.set(IdsButtonVariant.ERROR);
  await TestBed.configureTestingModule({
    imports: [
      ButtonHostComponent,
      DefaultButtonHostComponent,
      LinkHostComponent,
      RouterLinkHostComponent,
      GroupHostComponent,
      EmbeddedButtonHostComponent,
    ],
    providers: [provideRouter([])],
  }).compileComponents();
});

describe('IdsButtonComponent rendering', () => {
  it('should render with the default configuration', async() => {
    const button = buttonOf(await create(DefaultButtonHostComponent));

    expect(button.classList.contains('ids-button')).toBe(true);
    expect(button.classList.contains('ids-button-filled')).toBe(true);
    expect(button.classList.contains('ids-button-compact')).toBe(true);
    expect(button.classList.contains('ids-button-primary')).toBe(true);
    expect(button.classList.contains('ids-button-disabled')).toBe(false);
  });

  it('should generate a unique id', async() => {
    const first = buttonOf(await create(DefaultButtonHostComponent));
    const second = buttonOf(await create(DefaultButtonHostComponent));

    expect(first.id).toMatch(/^ids-button-\d+$/);
    expect(second.id).not.toBe(first.id);
  });

  it.each(Object.values(IdsButtonAppearance))('should apply the %s appearance class', async(appearance) => {
    const fixture = await create(ButtonHostComponent);
    fixture.componentInstance.appearance = appearance;
    await render(fixture);

    expect(buttonOf(fixture).classList.contains(`ids-button-${appearance}`)).toBe(true);
  });

  it.each(Object.values(IdsButtonVariant))('should apply the %s variant class', async(variant) => {
    const fixture = await create(ButtonHostComponent);
    fixture.componentInstance.variant = variant;
    await render(fixture);

    expect(buttonOf(fixture).classList.contains(`ids-button-${variant}`)).toBe(true);
  });

  it.each(Object.values(IdsSize))('should apply the %s size class', async(size) => {
    const fixture = await create(ButtonHostComponent);
    fixture.componentInstance.size = size;
    await render(fixture);

    expect(buttonOf(fixture).classList.contains(`ids-button-${size}`)).toBe(true);
  });

  it('should project the label inside the label element', async() => {
    const button = buttonOf(await create(ButtonHostComponent));

    expect(button.querySelector('.ids-button-label')?.textContent?.trim()).toBe('Save');
  });

  it('should project the leading and trailing icons around the label', async() => {
    const fixture = await create(ButtonHostComponent);
    fixture.componentInstance.leadingIcon = true;
    fixture.componentInstance.trailingIcon = true;
    await render(fixture);

    const [
      first,
      second,
      third,
    ] = Array.from(buttonOf(fixture).children);
    expect(first.hasAttribute('icon-leading')).toBe(true);
    expect(second.classList.contains('ids-button-label')).toBe(true);
    expect(third.hasAttribute('icon-trailing')).toBe(true);
  });
});

describe('IdsButtonComponent behavior', () => {
  it('should emit the click event when enabled', async() => {
    const fixture = await create(ButtonHostComponent);

    buttonOf(fixture).click();

    expect(fixture.componentInstance.clicks).toBe(1);
  });

  it('should apply the disabled class and the native disabled attribute', async() => {
    const fixture = await create(ButtonHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);

    const button = buttonOf(fixture) as HTMLButtonElement;
    expect(button.classList.contains('ids-button-disabled')).toBe(true);
    expect(button.disabled).toBe(true);
    expect(button.hasAttribute('aria-disabled')).toBe(true);
  });

  it('should not emit the click event when disabled', async() => {
    const fixture = await create(ButtonHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);

    buttonOf(fixture).click();

    expect(fixture.componentInstance.clicks).toBe(0);
  });

  it('should remove the disabled state again when re-enabled', async() => {
    const fixture = await create(ButtonHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);
    fixture.componentInstance.disabled = false;
    await render(fixture);

    const button = buttonOf(fixture) as HTMLButtonElement;
    expect(button.disabled).toBe(false);
    expect(button.hasAttribute('aria-disabled')).toBe(false);
  });
});

describe('IdsButtonComponent as a link', () => {
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
    expect(link.classList.contains('ids-button-disabled')).toBe(true);
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

describe('IdsButtonComponent inside a parent', () => {
  it('should use the size of the button group', async() => {
    const fixture = await create(GroupHostComponent);

    fixture.nativeElement.querySelectorAll('[idsButton]').forEach((button: HTMLElement) => {
      expect(button.classList.contains('ids-button-spacious')).toBe(true);
    });
  });

  it('should follow the size of the button group when it changes', async() => {
    const fixture = await create(GroupHostComponent);
    fixture.componentInstance.size = IdsSize.DENSE;
    await render(fixture);

    expect(buttonOf(fixture).classList.contains('ids-button-dense')).toBe(true);
  });

  it('should use the embedded button variant of the parent instead of its own', async() => {
    const fixture = await create(EmbeddedButtonHostComponent);
    const button = buttonOf(fixture);

    expect(button.classList.contains('ids-button-error')).toBe(true);
    expect(button.classList.contains('ids-button-primary')).toBe(false);

    embeddedVariant.set(IdsButtonVariant.SUCCESS);
    await render(fixture);

    expect(button.classList.contains('ids-button-success')).toBe(true);
  });
});

describe('IdsButtonComponent accessibility', () => {
  it('should render a native button with its text as the accessible name', async() => {
    const button = buttonOf(await create(ButtonHostComponent));

    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.textContent?.trim()).toBe('Save');
  });

  it('should hide the decorative icons from assistive technology', async() => {
    const fixture = await create(ButtonHostComponent);
    fixture.componentInstance.leadingIcon = true;
    fixture.componentInstance.trailingIcon = true;
    await render(fixture);

    buttonOf(fixture).querySelectorAll('ids-icon').forEach((icon) => {
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('should be focusable when enabled', async() => {
    const button = buttonOf(await create(ButtonHostComponent));

    button.focus();

    expect(document.activeElement).toBe(button);
  });

  it('should not be focusable when disabled', async() => {
    const fixture = await create(ButtonHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);
    const button = buttonOf(fixture);

    button.focus();

    expect(document.activeElement).not.toBe(button);
  });

  it('should keep an enabled link navigable and announce it as enabled', async() => {
    const link = buttonOf(await create(LinkHostComponent));

    expect(link.hasAttribute('href')).toBe(true);
    expect(link.hasAttribute('aria-disabled')).toBe(false);
  });

  it('should make a disabled link non-interactive and announce it as disabled', async() => {
    const fixture = await create(LinkHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);
    const link = buttonOf(fixture);

    link.focus();

    expect(link.hasAttribute('href')).toBe(false);
    expect(link.hasAttribute('aria-disabled')).toBe(true);
    expect(document.activeElement).not.toBe(link);
  });

  it('should have no axe violations by default', async() => {
    const fixture = await create(ButtonHostComponent);

    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it('should have no axe violations with icons', async() => {
    const fixture = await create(ButtonHostComponent);
    fixture.componentInstance.leadingIcon = true;
    fixture.componentInstance.trailingIcon = true;
    await render(fixture);

    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it('should have no axe violations when disabled', async() => {
    const fixture = await create(ButtonHostComponent);
    fixture.componentInstance.disabled = true;
    await render(fixture);

    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it('should have no axe violations as an enabled and as a disabled link', async() => {
    const fixture = await create(LinkHostComponent);
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();

    fixture.componentInstance.disabled = true;
    await render(fixture);
    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });

  it('should have no axe violations inside a button group', async() => {
    const fixture = await create(GroupHostComponent);

    expect(await axe(fixture.nativeElement)).toHaveNoViolations();
  });
});
