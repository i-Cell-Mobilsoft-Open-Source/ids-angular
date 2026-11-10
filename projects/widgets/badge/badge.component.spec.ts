import { IDS_BADGE_DEFAULT_CONFIG, IDS_BADGE_DEFAULT_CONFIG_FACTORY } from './badge-defaults';
import { BadgeLimitPipe } from './badge-limit.pipe';
import { IdsBadgeComponent } from './badge.component';
import { IdsBadgeDirective } from './badge.directive';
import { IdsBadgeAppearance, IdsBadgeAppearanceType } from './types/badge-appearance.type';
import { IdsBadgeVariant, IdsBadgeVariantType } from './types/badge-variant.type';

import { Component, createComponent, EnvironmentInjector, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { axe } from 'jest-axe';

@Component({
  imports: [
    IdsBadgeComponent,
    IdsIconComponent,
  ],
  template: `
    <ids-badge
      [appearance]="appearance"
      [variant]="variant"
      [size]="size"
      [label]="label"
      [limit]="limit"
      [showLeadingElement]="showLeadingElement"
    >
      @if (icon) {
        <ids-icon icon-leading fontIcon="bell" />
      }
    </ids-badge>
  `,
})
class ComponentHostComponent {
  public badge = viewChild.required(IdsBadgeComponent);
  public appearance: IdsBadgeAppearanceType | undefined = undefined;
  public variant: IdsBadgeVariantType | undefined = undefined;
  public size: IdsSizeType | undefined = undefined;
  public label = '';
  public limit: number | null = null;
  public showLeadingElement = false;
  public icon = false;
}

@Component({
  imports: [
    IdsBadgeDirective,
    IdsIconComponent,
  ],
  template: `
    <div class="wrapper">
      <button
        type="button"
        idsBadge
        [badgeAppearance]="appearance"
        [badgeVariant]="variant"
        [badgeSize]="size"
        [badgeLabel]="label"
        [badgeLimit]="limit"
        [badgeShowLeadingElement]="showLeadingElement"
      >
        @if (icon) {
          <ids-icon icon-leading fontIcon="bell" />
        }
        Inbox
      </button>
    </div>
  `,
})
class DirectiveHostComponent {
  public appearance: IdsBadgeAppearanceType = IdsBadgeAppearance.FILLED;
  public variant: IdsBadgeVariantType = IdsBadgeVariant.SURFACE;
  public size: IdsSizeType = IdsSize.COMPACT;
  public label = '';
  public limit: number | null = null;
  public showLeadingElement = false;
  public icon = false;
}

@Component({
  template: '',
  hostDirectives: [IdsBadgeDirective],
})
class DetachedHostComponent {}

interface DirectiveInternals {
  _badgeRef: { destroy: () => void } | undefined;
  _moveIconIfNeeded: () => void;
}

let componentFixture: ComponentFixture<ComponentHostComponent>;
let componentHost: ComponentHostComponent;
let directiveFixture: ComponentFixture<DirectiveHostComponent>;
let directiveHost: DirectiveHostComponent;
let element: HTMLElement;

async function renderFixture<T>(target: ComponentFixture<T>): Promise<void> {
  target.detectChanges();
  await target.whenStable();
  target.detectChanges();
}

async function createComponentHost(overrides: Partial<ComponentHostComponent> = {}): Promise<void> {
  componentFixture = TestBed.createComponent(ComponentHostComponent);
  componentHost = componentFixture.componentInstance;
  element = componentFixture.nativeElement as HTMLElement;
  Object.assign(componentHost, overrides);
  await renderFixture(componentFixture);
}

async function createDirectiveHost(overrides: Partial<DirectiveHostComponent> = {}): Promise<void> {
  directiveFixture = TestBed.createComponent(DirectiveHostComponent);
  directiveHost = directiveFixture.componentInstance;
  element = directiveFixture.nativeElement as HTMLElement;
  Object.assign(directiveHost, overrides);
  await renderFixture(directiveFixture);
}

function badge(): HTMLElement {
  return element.querySelector<HTMLElement>('ids-badge')!;
}

function labelElement(): HTMLElement {
  return badge().querySelector<HTMLElement>('.ids-badge__label')!;
}

function directiveInternals(): DirectiveInternals {
  const directive = directiveFixture.debugElement.query(By.directive(IdsBadgeDirective)).injector.get(IdsBadgeDirective);
  return directive as unknown as DirectiveInternals;
}

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [
      ComponentHostComponent,
      DirectiveHostComponent,
      DetachedHostComponent,
    ],
  }).compileComponents();
});

describe('badge defaults', () => {
  it('should provide the default configuration through the injection token', () => {
    expect(TestBed.inject(IDS_BADGE_DEFAULT_CONFIG)).toEqual(IDS_BADGE_DEFAULT_CONFIG_FACTORY());
    expect(IDS_BADGE_DEFAULT_CONFIG_FACTORY()).toEqual({
      appearance: 'filled',
      size: 'compact',
      variant: 'surface',
      showLeadingElement: false,
      label: '',
    });
  });
});

describe('BadgeLimitPipe', () => {
  const pipe = new BadgeLimitPipe();

  it.each([
    null,
    undefined,
    '',
  ] as Array<string | null | undefined>)('should return an empty string for the empty value %p', (value) => {
    expect(pipe.transform(value as string, '5')).toBe('');
  });

  it.each([
    null,
    undefined,
    '',
  ] as Array<number | string | null>)('should return the value without a limit (%p)', (max) => {
    expect(pipe.transform('12', max)).toBe('12');
  });

  it('should return the number when it does not exceed the limit', () => {
    expect(pipe.transform('5', '9')).toBe('5');
    expect(pipe.transform('9', '9')).toBe('9');
  });

  it('should return the limit with a plus sign when the number exceeds the limit', () => {
    expect(pipe.transform('10', '9')).toBe('9+');
    expect(pipe.transform('150', '99')).toBe('99+');
  });

  it('should return a text value as it is', () => {
    expect(pipe.transform('new', '9')).toBe('new');
  });

  it('should return the value as it is when the limit is not a number', () => {
    expect(pipe.transform('12', 'many')).toBe('12');
  });
});

describe('IdsBadgeComponent rendering', () => {
  it('should create with the default configuration', async() => {
    await createComponentHost();

    expect(componentHost.badge()).toBeTruthy();
    expect(badge().classList.contains('ids-badge')).toBe(true);
    expect(badge().className.trim()).toBe('ids-badge');
  });

  it('should reflect the size and the variant in the classes', async() => {
    await createComponentHost({ size: IdsSize.COMFORTABLE, variant: IdsBadgeVariant.ERROR });

    expect(badge().classList.contains('ids-badge-comfortable')).toBe(true);
    expect(badge().classList.contains('ids-badge-error')).toBe(true);
  });

  it('should render the label', async() => {
    await createComponentHost({ label: '5' });

    expect(labelElement().textContent).toBe('5');
  });

  it('should render the label limited by the limit', async() => {
    await createComponentHost({ label: '150', limit: 99 });

    expect(labelElement().textContent).toBe('99+');
  });

  it('should render a text label as it is', async() => {
    await createComponentHost({ label: 'new', limit: 99 });

    expect(labelElement().textContent).toBe('new');
  });

  it('should render the compact container without a label and a leading element', async() => {
    await createComponentHost();

    expect(badge().querySelector('.ids-badge__container-no-element')).not.toBeNull();
    expect(badge().querySelector('.ids-badge__container')).toBeNull();
  });

  it('should render the regular container with a label', async() => {
    await createComponentHost({ label: '5' });

    expect(badge().querySelector('.ids-badge__container')).not.toBeNull();
    expect(badge().querySelector('.ids-badge__container-no-element')).toBeNull();
  });

  it('should render the regular container with a leading element', async() => {
    await createComponentHost({ showLeadingElement: true });

    expect(badge().querySelector('.ids-badge__container')).not.toBeNull();
  });

  it('should project the leading icon before the label', async() => {
    await createComponentHost({ label: '5', icon: true, showLeadingElement: true });
    const container = badge().querySelector('.ids-badge__container')!;

    expect(container.firstElementChild?.tagName).toBe('IDS-ICON');
    expect(container.lastElementChild).toBe(labelElement());
  });

  it('should update the label', async() => {
    await createComponentHost({ label: '5' });

    componentHost.label = '7';
    await renderFixture(componentFixture);

    expect(labelElement().textContent).toBe('7');
  });
});

describe('IdsBadgeDirective', () => {
  it('should wrap the host element in a badge', async() => {
    await createDirectiveHost();
    const wrapper = element.querySelector('.wrapper')!;

    expect(wrapper.firstElementChild).toBe(badge());
    expect(badge().querySelector('button')).not.toBeNull();
  });

  it('should render the default configuration', async() => {
    await createDirectiveHost();

    expect(badge().classList.contains('ids-badge-compact')).toBe(true);
    expect(badge().classList.contains('ids-badge-surface')).toBe(true);
  });

  it('should pass the inputs to the badge', async() => {
    await createDirectiveHost({ label: '150', limit: 99, size: IdsSize.COMFORTABLE, variant: IdsBadgeVariant.BRAND });

    expect(labelElement().textContent).toBe('99+');
    expect(badge().classList.contains('ids-badge-comfortable')).toBe(true);
    expect(badge().classList.contains('ids-badge-brand')).toBe(true);
  });

  it('should update the badge when the inputs change', async() => {
    await createDirectiveHost({ label: '5' });

    directiveHost.label = '8';
    await renderFixture(directiveFixture);

    expect(labelElement().textContent).toBe('8');
  });

  it('should use the compact container without a label and a leading element', async() => {
    await createDirectiveHost();

    expect(badge().querySelector('.ids-badge__container-no-element')).not.toBeNull();
  });

  it('should move the leading icon into the badge', async() => {
    await createDirectiveHost({ label: '5', icon: true, showLeadingElement: true });

    const container = badge().querySelector('.ids-badge__container')!;
    expect(container.firstElementChild?.tagName).toBe('IDS-ICON');
    expect(badge().querySelector('button ids-icon')).toBeNull();
  });

  it('should move the leading icon into the compact container', async() => {
    await createDirectiveHost({ icon: true, showLeadingElement: true });

    expect(badge().querySelector('.ids-badge__container ids-icon')).not.toBeNull();
  });

  it('should keep the icon in the host without the leading element', async() => {
    await createDirectiveHost({ label: '5', icon: true });

    expect(badge().querySelector('button ids-icon')).not.toBeNull();
  });

  it('should not fail when the leading element is shown without an icon', async() => {
    await createDirectiveHost({ label: '5', showLeadingElement: true });

    expect(badge().querySelector('ids-icon')).toBeNull();
  });

  it('should move the icon into the compact container when requested', async() => {
    await createDirectiveHost({ icon: true });

    directiveInternals()._moveIconIfNeeded();

    expect(badge().querySelector('.ids-badge__container-no-element ids-icon')).not.toBeNull();
  });

  it('should not move an icon that is already in the container', async() => {
    await createDirectiveHost({ label: '5', icon: true });
    const container = badge().querySelector<HTMLElement>('.ids-badge__container')!;
    container.contains = (): boolean => true;

    directiveInternals()._moveIconIfNeeded();

    expect(badge().querySelector('button ids-icon')).not.toBeNull();
  });

  it('should not move an icon without a badge', async() => {
    await createDirectiveHost({ label: '5', icon: true });
    directiveInternals()._badgeRef = undefined;

    directiveInternals()._moveIconIfNeeded();

    expect(badge().querySelector('button ids-icon')).not.toBeNull();
  });

  it('should destroy the badge together with the directive', async() => {
    await createDirectiveHost({ label: '5', showLeadingElement: true });
    const badgeRef = directiveInternals()._badgeRef!;
    const destroy = jest.spyOn(badgeRef, 'destroy');

    directiveFixture.destroy();

    expect(destroy).toHaveBeenCalledTimes(1);
  });

  it('should do nothing when the host element has no parent', () => {
    const hostElement = document.createElement('div');
    const detachedRef = createComponent(DetachedHostComponent, {
      environmentInjector: TestBed.inject(EnvironmentInjector),
      hostElement,
    });

    expect(() => detachedRef.changeDetectorRef.detectChanges()).not.toThrow();
    expect(hostElement.parentElement).toBeNull();
    expect(hostElement.querySelector('ids-badge')).toBeNull();
    expect(() => detachedRef.destroy()).not.toThrow();
  });
});

describe('IdsBadgeComponent accessibility', () => {
  it('should announce the label changes politely', async() => {
    await createComponentHost({ label: '5' });

    expect(labelElement().getAttribute('aria-live')).toBe('polite');
  });

  it('should expose the limited label as text', async() => {
    await createComponentHost({ label: '150', limit: 99 });

    expect(badge().textContent?.trim()).toBe('99+');
  });

  it('should hide the decorative leading icon from assistive technologies', async() => {
    await createComponentHost({ label: '5', icon: true, showLeadingElement: true });

    expect(badge().querySelector('ids-icon')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should keep the accessible name of the badged button', async() => {
    await createDirectiveHost({ label: '5' });

    expect(badge().querySelector('button')?.textContent?.trim()).toBe('Inbox');
  });

  it('should have no axe violations with a label', async() => {
    await createComponentHost({ label: '5' });

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations without a label', async() => {
    await createComponentHost();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations with a leading icon', async() => {
    await createComponentHost({ label: '5', icon: true, showLeadingElement: true });

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations on a badged button', async() => {
    await createDirectiveHost({ label: '150', limit: 99 });

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations on a badged button with a leading icon', async() => {
    await createDirectiveHost({ label: '5', icon: true, showLeadingElement: true });

    expect(await axe(element)).toHaveNoViolations();
  });
});
