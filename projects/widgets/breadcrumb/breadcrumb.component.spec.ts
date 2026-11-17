// The breadcrumb must load before its parts because of their circular import.
import { IDS_BREADCRUMB_DEFAULT_CONFIG, IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY } from './breadcrumb-defaults';
import { IdsBreadcrumbComponent } from './breadcrumb.component';
import { IdsBreadcrumbDivider, IdsBreadcrumbDividerType } from './types/breadcrumb-divider.type';
import { IdsBreadcrumbHierarchyType } from './types/breadcrumb-hierarchy.type';
import { IdsBreadcrumbVariant, IdsBreadcrumbVariantType } from './types/breadcrumb-variant.type';

import { Component, viewChild, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsOverlayPanelAppearance, IdsOverlayPanelAppearanceType, IdsOverlayPanelVariant, IdsOverlayPanelVariantType } from '@i-cell/ids-angular/overlay-panel';
import { axe } from 'jest-axe';

const hierarchy: IdsBreadcrumbHierarchyType[] = [
  { label: 'Home', path: '/home' },
  { label: 'Products', path: '/products' },
  { label: 'Phones', path: '/phones' },
  { label: 'Details', path: '/details' },
];

// Widths: trigger 30, divider 10, 10 per character, gap 4; the full content takes 304 pixels.
const layout = { containerWidth: 400, boxSizing: 'content-box', gap: '4px', charWidth: 10 };
const triggerWidth = 30;
const dividerWidth = 10;
const itemCount = hierarchy.length;
const fullListLength = itemCount * 2 - 1;
const truncatedListLength = 5;

@Component({
  imports: [IdsBreadcrumbComponent],
  template: `
    <ids-breadcrumb
      [hierarchy]="items"
      [size]="size"
      [variant]="variant"
      [dividerType]="dividerType"
      [overlayAppearance]="overlayAppearance"
      [overlaySize]="overlaySize"
      [overlayVariant]="overlayVariant"
    />
  `,
})
class TestHostComponent {
  public breadcrumb = viewChild.required(IdsBreadcrumbComponent);
  public items = hierarchy;
  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsBreadcrumbVariantType = IdsBreadcrumbVariant.SURFACE;
  public dividerType: IdsBreadcrumbDividerType = IdsBreadcrumbDivider.ICON;
  public overlayAppearance: IdsOverlayPanelAppearanceType = IdsOverlayPanelAppearance.ELEVATED;
  public overlaySize: IdsSizeType = IdsSize.COMPACT;
  public overlayVariant: IdsOverlayPanelVariantType = IdsOverlayPanelVariant.LIGHT;
}

@Component({
  imports: [IdsBreadcrumbComponent],
  template: '<ids-breadcrumb [hierarchy]="items" />',
})
class DefaultsHostComponent {
  public items = hierarchy;
}

class ResizeObserverMock {
  public static instances: ResizeObserverMock[] = [];
  public observed: Element[] = [];
  public disconnect = jest.fn();
  public unobserved: Element[] = [];

  constructor(public callback: ResizeObserverCallback) {
    ResizeObserverMock.instances.push(this);
  }

  public observe(target: Element): void {
    this.observed.push(target);
  }

  public unobserve(target: Element): void {
    this.unobserved.push(target);
    this.observed = this.observed.filter((observedTarget) => observedTarget !== target);
  }
}

interface BreadcrumbInternals {
  _measuring: WritableSignal<boolean>;
  _truncationIndex: () => number;
  _widths: unknown;
  _clippedItems: () => ReadonlySet<IdsBreadcrumbHierarchyType>;
  _handleResize(): void;
  _layout(): void;
}

const originalGetComputedStyle = window.getComputedStyle.bind(window);
let resizeObserverBackup: typeof ResizeObserver;
let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

const renderPasses = 3;

async function renderFixture<T>(target: ComponentFixture<T>): Promise<void> {
  for (let pass = 0; pass < renderPasses; pass++) {
    target.detectChanges();
    await target.whenStable();
    TestBed.tick();
  }
  target.detectChanges();
}

async function render(): Promise<void> {
  await renderFixture(fixture);
}

async function create(overrides: Partial<TestHostComponent> = {}): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  Object.assign(host, overrides);
  fixture.autoDetectChanges();
  await render();
}

function list(): HTMLElement {
  return element.querySelector<HTMLElement>('nav > ol')!;
}

function container(): HTMLElement {
  return element.querySelector<HTMLElement>('nav')!;
}

function trigger(): HTMLElement | null {
  return list().querySelector<HTMLElement>('li[idsBreadcrumbTruncation]');
}

function links(): HTMLAnchorElement[] {
  return Array.from(list().querySelectorAll<HTMLAnchorElement>('a.ids-breadcrumb-link'));
}

function internals(): BreadcrumbInternals {
  return host.breadcrumb() as unknown as BreadcrumbInternals;
}

// The layout mocks are removed first because they return incomplete styles to axe.
function runAxe(): ReturnType<typeof axe> {
  jest.restoreAllMocks();
  return axe(element);
}

function resizeTarget(target: Element): void {
  ResizeObserverMock.instances
    .filter((instance) => instance.observed.includes(target))
    .forEach((instance) => instance.callback([{ target } as unknown as ResizeObserverEntry], instance as unknown as ResizeObserver));
}

function clip(anchor: HTMLElement, clipped: boolean): void {
  Object.defineProperty(anchor, 'offsetWidth', { configurable: true, value: clipped ? 0 : 1 });
  Object.defineProperty(anchor, 'scrollWidth', { configurable: true, value: 1 });
}

function widthOf(target: Element): number {
  if (target.hasAttribute('idsBreadcrumbTruncation')) {
    return triggerWidth;
  }
  if (target.classList.contains('ids-breadcrumb-divider')) {
    return dividerWidth;
  }
  return (target.textContent?.trim().length ?? 0) * layout.charWidth;
}

beforeEach(async() => {
  Object.assign(layout, { containerWidth: 400, boxSizing: 'content-box', gap: '4px', charWidth: 10 });
  resizeObserverBackup = globalThis.ResizeObserver;
  globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
  ResizeObserverMock.instances = [];

  // jsdom has no layout, so the sizes are calculated from the content.
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function(this: Element): DOMRect {
    const width = widthOf(this);
    return { width, height: 0, top: 0, left: 0, right: width, bottom: 0, x: 0, y: 0, toJSON: () => ({}) };
  });
  jest.spyOn(window, 'getComputedStyle').mockImplementation((target: Element, pseudo?: string | null) => {
    if (target.tagName === 'NAV') {
      return {
        width: `${layout.containerWidth}px`,
        boxSizing: layout.boxSizing,
        paddingLeft: '8px',
        paddingRight: '8px',
        borderLeftWidth: '1px',
        borderRightWidth: '1px',
      } as CSSStyleDeclaration;
    }
    if (target.tagName === 'OL' && target.parentElement?.tagName === 'NAV') {
      return { columnGap: layout.gap } as CSSStyleDeclaration;
    }
    return originalGetComputedStyle(target, pseudo);
  });

  await TestBed.configureTestingModule({
    imports: [
      TestHostComponent,
      DefaultsHostComponent,
    ],
    providers: [provideRouter([])],
  }).compileComponents();
});

afterEach(() => {
  globalThis.ResizeObserver = resizeObserverBackup;
  jest.restoreAllMocks();
});

describe('breadcrumb defaults', () => {
  it('should provide the default configuration through the injection token', () => {
    expect(TestBed.inject(IDS_BREADCRUMB_DEFAULT_CONFIG)).toEqual(IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY());
    expect(IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY()).toEqual({
      hierarchy: [],
      size: 'compact',
      variant: 'surface',
      dividerType: 'icon',
      overlayAppearance: 'elevated',
      overlaySize: 'compact',
      overlayVariant: 'light',
    });
  });

  it('should use the default configuration when no input is set', async() => {
    const defaultsFixture = TestBed.createComponent(DefaultsHostComponent);
    await renderFixture(defaultsFixture);
    const classes = (defaultsFixture.nativeElement as HTMLElement).querySelector('ids-breadcrumb')!.classList;

    expect(classes.contains('ids-breadcrumb-compact')).toBe(true);
    expect(classes.contains('ids-breadcrumb-surface')).toBe(true);
    expect(classes.contains('ids-breadcrumb-icon')).toBe(true);
  });

  it('should use a provided configuration when no input is set', async() => {
    TestBed.overrideProvider(IDS_BREADCRUMB_DEFAULT_CONFIG, {
      useValue: {
        ...IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY(),
        size: IdsSize.COMFORTABLE,
        variant: IdsBreadcrumbVariant.PRIMARY,
        dividerType: IdsBreadcrumbDivider.FORESLASH,
      },
    });
    const defaultsFixture = TestBed.createComponent(DefaultsHostComponent);
    await renderFixture(defaultsFixture);
    const classes = (defaultsFixture.nativeElement as HTMLElement).querySelector('ids-breadcrumb')!.classList;

    expect(classes.contains('ids-breadcrumb-comfortable')).toBe(true);
    expect(classes.contains('ids-breadcrumb-primary')).toBe(true);
    expect(classes.contains('ids-breadcrumb-foreslash')).toBe(true);
  });
});

describe('IdsBreadcrumbComponent rendering', () => {
  it('should create with the configured classes', async() => {
    await create({ size: IdsSize.COMFORTABLE, variant: IdsBreadcrumbVariant.LIGHT, dividerType: IdsBreadcrumbDivider.FORESLASH });
    const classes = element.querySelector('ids-breadcrumb')!.classList;

    expect(host.breadcrumb()).toBeTruthy();
    expect(classes.contains('ids-breadcrumb-comfortable')).toBe(true);
    expect(classes.contains('ids-breadcrumb-light')).toBe(true);
    expect(classes.contains('ids-breadcrumb-foreslash')).toBe(true);
  });

  it('should render every item when it fits', async() => {
    await create();

    expect(list().children).toHaveLength(fullListLength);
    expect(trigger()).toBeNull();
    expect(links().map((link) => link.textContent?.trim())).toEqual([
      'Home',
      'Products',
      'Phones',
    ]);
  });

  it('should render the last item as the current page', async() => {
    await create();
    const page = list().querySelector('span.ids-breadcrumb-page')!;

    expect(page.textContent?.trim()).toBe('Details');
    expect(list().querySelectorAll('span.ids-breadcrumb-page')).toHaveLength(1);
  });

  it('should link the items to their paths', async() => {
    await create();

    expect(links().map((link) => link.getAttribute('href'))).toEqual([
      '/home',
      '/products',
      '/phones',
    ]);
  });

  it('should render a disabled item without a link', async() => {
    await create({ items: [
      { label: 'Home', path: '/home' },
      { label: 'Products', path: '/products', disabled: true },
      { label: 'Details', path: '/details' },
    ] });
    const disabled = links()[1];

    expect(disabled.hasAttribute('href')).toBe(false);
    expect(disabled.getAttribute('aria-disabled')).toBe('');
    expect(links()[0].hasAttribute('aria-disabled')).toBe(false);
  });

  it('should render only the current page for a single item', async() => {
    await create({ items: [hierarchy[0]] });

    expect(list().children).toHaveLength(1);
    expect(links()).toHaveLength(0);
    expect(list().querySelector('span.ids-breadcrumb-page')?.textContent?.trim()).toBe('Home');
  });

  it('should render an empty list without items', async() => {
    await create({ items: [] });

    expect(list().children).toHaveLength(0);
    expect(trigger()).toBeNull();
  });

  it('should render icon dividers between the items', async() => {
    await create();
    const dividers = list().querySelectorAll('li.ids-breadcrumb-divider');

    expect(dividers).toHaveLength(itemCount - 1);
    dividers.forEach((divider) => {
      expect(divider.querySelector('ids-icon')).not.toBeNull();
      expect(divider.querySelector('.ids-breadcrumb-divider-foreslash')).toBeNull();
    });
  });

  it('should render foreslash dividers between the items', async() => {
    await create({ dividerType: IdsBreadcrumbDivider.FORESLASH });
    const dividers = list().querySelectorAll('li.ids-breadcrumb-divider');

    expect(dividers).toHaveLength(itemCount - 1);
    dividers.forEach((divider) => {
      expect(divider.querySelector('.ids-breadcrumb-divider-foreslash')?.textContent).toBe('/');
      expect(divider.querySelector('ids-icon')).toBeNull();
    });
  });
});

describe('IdsBreadcrumbComponent truncation', () => {
  it('should truncate the first items when they do not fit', async() => {
    layout.containerWidth = 200;
    await create();

    expect(list().children).toHaveLength(truncatedListLength);
    expect(trigger()).not.toBeNull();
    expect(links().map((link) => link.textContent?.trim())).toEqual(['Phones']);
    expect(list().querySelector('span.ids-breadcrumb-page')?.textContent?.trim()).toBe('Details');
  });

  it('should keep only the last item when nothing else fits', async() => {
    layout.containerWidth = 100;
    await create();

    expect(trigger()).not.toBeNull();
    expect(links()).toHaveLength(0);
    expect(list().querySelector('span.ids-breadcrumb-page')?.textContent?.trim()).toBe('Details');
  });

  it('should list the truncated items on the overlay', async() => {
    layout.containerWidth = 200;
    await create();

    trigger()!.querySelector('button')!.click();
    await render();
    const overlayLinks = document.querySelectorAll('.cdk-overlay-container .ids-breadcrumb-overlay-panel a.ids-breadcrumb-link');

    expect(Array.from(overlayLinks, (link) => link.textContent?.trim())).toEqual([
      'Home',
      'Products',
    ]);
  });

  it('should style the overlay by the overlay inputs', async() => {
    layout.containerWidth = 200;
    await create({
      overlayAppearance: IdsOverlayPanelAppearance.OUTLINED,
      overlayVariant: IdsOverlayPanelVariant.SURFACE,
      overlaySize: IdsSize.COMFORTABLE,
    });

    trigger()!.querySelector('button')!.click();
    await render();
    const overlayList = document.querySelector('.cdk-overlay-container .ids-breadcrumb-overlay-panel ol')!;

    expect(overlayList.className).toContain('ids-overlay-panel-outlined');
    expect(overlayList.className).toContain('ids-overlay-panel-surface');
    expect(overlayList.className).toContain('ids-overlay-panel-comfortable');
  });

  it('should truncate with a border box container by its content width', async() => {
    Object.assign(layout, { containerWidth: 316, boxSizing: 'border-box' });
    await create();

    expect(trigger()).not.toBeNull();
    expect(links().map((link) => link.textContent?.trim())).toEqual([
      'Products',
      'Phones',
    ]);
  });

  it('should not deduct the paddings of a content box container', async() => {
    layout.containerWidth = 316;
    await create();

    expect(trigger()).toBeNull();
  });

  it('should calculate without a gap when it is not set', async() => {
    Object.assign(layout, { containerWidth: 285, gap: '' });
    await create();

    expect(trigger()).toBeNull();
  });

  it.each([
    0,
    Number.NaN,
  ])('should not truncate when the available width is %p', async(containerWidth) => {
    layout.containerWidth = containerWidth;
    await create();

    expect(trigger()).toBeNull();
    expect(list().children).toHaveLength(fullListLength);
  });
});

describe('IdsBreadcrumbComponent resizing', () => {
  it('should observe the container and the rendered items', async() => {
    await create();
    const observed = ResizeObserverMock.instances.flatMap((instance) => instance.observed);

    expect(observed).toContain(container());
    Array.from(list().children).forEach((item) => expect(observed).toContain(item));
  });

  it('should truncate when the container gets narrower', async() => {
    await create();

    layout.containerWidth = 200;
    resizeTarget(container());
    await render();

    expect(list().children).toHaveLength(truncatedListLength);
    expect(trigger()).not.toBeNull();
  });

  it('should restore the items when the container gets wider', async() => {
    layout.containerWidth = 200;
    await create();

    layout.containerWidth = 400;
    resizeTarget(container());
    await render();

    expect(list().children).toHaveLength(fullListLength);
    expect(trigger()).toBeNull();
  });

  it('should measure again when an item changed its size', async() => {
    layout.containerWidth = 200;
    await create();

    layout.charWidth = 20;
    resizeTarget(list().children[0]);
    await render();

    expect(internals()._truncationIndex()).toBe(itemCount - 1);
    expect(list().children).toHaveLength(truncatedListLength - 2);
  });

  it('should ignore the resizing while measuring', async() => {
    await create();
    internals()._measuring.set(true);
    layout.containerWidth = 200;

    internals()._handleResize();

    expect(internals()._measuring()).toBe(true);
    expect(internals()._truncationIndex()).toBe(0);
  });

  it('should measure again without the measured widths', async() => {
    await create();
    internals()._widths = null;

    internals()._handleResize();

    expect(internals()._measuring()).toBe(true);
  });

  it('should not truncate without the measured widths', async() => {
    layout.containerWidth = 200;
    await create();
    internals()._widths = null;

    internals()._layout();

    expect(internals()._truncationIndex()).toBe(0);
  });

  it('should measure again when the labels change', async() => {
    jest.spyOn(console, 'warn').mockImplementation();
    await create();
    const widths = internals()._widths;

    host.items = hierarchy.map((item) => ({ ...item, label: `${item.label}!` }));
    await render();

    expect(internals()._widths).not.toBe(widths);
  });

  it('should not measure again when only the item objects change', async() => {
    jest.spyOn(console, 'warn').mockImplementation();
    await create();
    const widths = internals()._widths;

    host.items = hierarchy.map((item) => ({ ...item }));
    await render();

    expect(internals()._widths).toBe(widths);
  });

  it('should measure again when the size changes', async() => {
    await create();
    const widths = internals()._widths;

    host.size = IdsSize.COMFORTABLE;
    await render();

    expect(internals()._widths).not.toBe(widths);
  });

  it('should stop observing when destroyed', async() => {
    await create();
    const observedBefore = ResizeObserverMock.instances.flatMap((instance) => instance.observed);

    fixture.destroy();

    const unobserved = ResizeObserverMock.instances.flatMap((instance) => instance.unobserved);
    expect(unobserved).toContain(container());
    expect(observedBefore.length).toBeGreaterThan(0);
  });
});

describe('IdsBreadcrumbComponent clipped items', () => {
  it('should not have clipped items by default', async() => {
    await create();

    expect(internals()._clippedItems().size).toBe(0);
  });

  it('should track the clipped item and release it', async() => {
    await create();
    const [first] = links();

    clip(first, true);
    resizeTarget(first);
    await render();
    expect(internals()._clippedItems().has(hierarchy[0])).toBe(true);

    clip(first, false);
    resizeTarget(first);
    await render();
    expect(internals()._clippedItems().has(hierarchy[0])).toBe(false);
  });

  it('should keep the clipped items of a retained hierarchy', async() => {
    await create();
    clip(links()[0], true);
    resizeTarget(links()[0]);
    await render();

    host.items = hierarchy.slice();
    await render();

    expect(internals()._clippedItems().has(hierarchy[0])).toBe(true);
  });

  it('should drop the clipped items that were removed', async() => {
    await create();
    clip(links()[0], true);
    resizeTarget(links()[0]);
    await render();

    host.items = hierarchy.slice(1);
    await render();

    expect(internals()._clippedItems().size).toBe(0);
  });
});

describe('IdsBreadcrumbComponent accessibility', () => {
  it('should render the breadcrumb in a navigation landmark with an ordered list', async() => {
    await create();

    expect(container().tagName).toBe('NAV');
    expect(list().tagName).toBe('OL');
    expect(Array.from(list().children).every((item) => item.tagName === 'LI')).toBe(true);
  });

  it('should mark only the last item as the current page', async() => {
    await create();

    expect(list().querySelectorAll('[aria-current="page"]')).toHaveLength(1);
    expect(list().querySelector('[aria-current="page"]')?.textContent?.trim()).toBe('Details');
  });

  it('should hide the dividers from assistive technologies', async() => {
    await create();

    list().querySelectorAll('li.ids-breadcrumb-divider').forEach((divider) => {
      expect(divider.getAttribute('aria-hidden')).toBe('true');
      expect(divider.getAttribute('role')).toBe('presentation');
    });
  });

  it('should make the links reachable with the keyboard and the disabled item not', async() => {
    await create({ items: [
      { label: 'Home', path: '/home' },
      { label: 'Products', path: '/products', disabled: true },
      { label: 'Details', path: '/details' },
    ] });

    links()[0].focus();
    expect(document.activeElement).toBe(links()[0]);

    links()[1].focus();
    expect(document.activeElement).not.toBe(links()[1]);
  });

  it('should have no axe violations', async() => {
    await create();

    expect(await runAxe()).toHaveNoViolations();
  });

  it('should have no axe violations with foreslash dividers', async() => {
    await create({ dividerType: IdsBreadcrumbDivider.FORESLASH });

    expect(await runAxe()).toHaveNoViolations();
  });

  it('should have no axe violations with a disabled item', async() => {
    await create({ items: [
      { label: 'Home', path: '/home' },
      { label: 'Products', path: '/products', disabled: true },
      { label: 'Details', path: '/details' },
    ] });

    expect(await runAxe()).toHaveNoViolations();
  });

  it('should have no axe violations with a single item', async() => {
    await create({ items: [hierarchy[0]] });

    expect(await runAxe()).toHaveNoViolations();
  });
});

