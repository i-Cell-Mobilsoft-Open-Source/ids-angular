import { IDS_TAB_GROUP_DEFAULT_CONFIG, IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY } from './tab-group-defaults';
import { IdsTabGroupComponent } from './tab-group.component';
import { IdsTabComponent } from './tab.component';
import { IdsTabActivationMode, IdsTabActivationModeType } from './types/tab-activation-mode.type';
import { IdsTabGroupAlignment, IdsTabGroupAlignmentType } from './types/tab-group-alignment.type';
import { IdsTabGroupPosition, IdsTabGroupPositionType } from './types/tab-group-position.type';
import { IdsTabGroupVariant, IdsTabGroupVariantType } from './types/tab-group-variant.type';
import { IdsTabIndicatorPositionType } from './types/tab-indicator-position.type';

import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '../core';

import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';

@Component({
  imports: [
    IdsTabGroupComponent,
    IdsTabComponent,
  ],
  template: `
    <ids-tab-group
      [size]="size"
      [variant]="variant"
      [orientation]="orientation"
      [stretchTabs]="stretchTabs"
      [tabAlignment]="tabAlignment"
      [tabPosition]="tabPosition"
      [indicatorPosition]="indicatorPosition"
      [disabled]="disabled"
      [activationMode]="activationMode"
      [setTabIndex]="setTabIndex"
      (selectedTabChange)="changes.push($event)"
    >
      <ids-tab label="First" leadingIcon="home" trailingIcon="close" [disabled]="firstDisabled">
        First content
      </ids-tab>
      <ids-tab label="Second" [disabled]="secondDisabled">Second content</ids-tab>
      <ids-tab label="Third" [disabled]="thirdDisabled">
        <span prefixContent class="prefix">P</span>
        <span suffixContent class="suffix">S</span>
        Third content
      </ids-tab>
    </ids-tab-group>
  `,
})
class TestHostComponent {
  public group = viewChild.required(IdsTabGroupComponent);
  public changes: number[] = [];
  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsTabGroupVariantType = IdsTabGroupVariant.PRIMARY;
  public orientation: IdsOrientationType = IdsOrientation.HORIZONTAL;
  public stretchTabs = true;
  public tabAlignment: IdsTabGroupAlignmentType = IdsTabGroupAlignment.START;
  public tabPosition: IdsTabGroupPositionType = IdsTabGroupPosition.LEFT;
  public indicatorPosition: IdsTabIndicatorPositionType | undefined = undefined;
  public disabled = false;
  public activationMode: IdsTabActivationModeType = IdsTabActivationMode.MANUAL;
  public setTabIndex: number | undefined = undefined;
  public firstDisabled = false;
  public secondDisabled = false;
  public thirdDisabled = false;
}

@Component({
  imports: [
    IdsTabGroupComponent,
    IdsTabComponent,
  ],
  template: `
    <ids-tab-group>
      <ids-tab label="Only">Only content</ids-tab>
    </ids-tab-group>
  `,
})
class SingleTabHostComponent {}

interface GroupInternals {
  _items: () => unknown[];
  _tabElements: () => unknown[];
  _focusedTabIndex: () => number;
  _scrollTabs(direction: -1 | 1): void;
  _scrollTabIntoView(index: number, smooth?: boolean): void;
  _nextEnabledTabIndex(from: number, delta: number): number;
  _focusTabElement(index: number): void;
}

class ResizeObserverMock {
  public static instances: ResizeObserverMock[] = [];
  public observed: Element[] = [];
  public disconnect = jest.fn();

  constructor(public callback: ResizeObserverCallback) {
    ResizeObserverMock.instances.push(this);
  }

  public observe(target: Element): void {
    this.observed.push(target);
  }

  public unobserve(): void {}
}

const tabCount = 3;
const scrolledBy = 100;
const scrolledToEnd = 300;

const domMethods = [
  'scrollIntoView',
  'scrollBy',
  'scrollTo',
] as const;

let resizeObserverBackup: typeof ResizeObserver;
let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function render(): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

async function create(overrides: Partial<TestHostComponent> = {}): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  Object.assign(host, overrides);
  await render();
}

function tabs(): HTMLElement[] {
  return Array.from(element.querySelectorAll<HTMLElement>('li[role="tab"]'));
}

function panel(): HTMLElement | null {
  return element.querySelector<HTMLElement>('[role="tabpanel"]');
}

function groupElement(): HTMLElement {
  return element.querySelector<HTMLElement>('ids-tab-group')!;
}

function container(): HTMLElement {
  return element.querySelector<HTMLElement>('.ids-tab-group__container')!;
}

function wrapper(): HTMLElement {
  return element.querySelector<HTMLElement>('.ids-tab-group__header-wrapper')!;
}

function button(direction: 'previous' | 'next'): HTMLButtonElement | null {
  return element.querySelector<HTMLButtonElement>(`.ids-tab-group__scroll-button--${direction}`);
}

function internals(): GroupInternals {
  return host.group() as unknown as GroupInternals;
}

function press(target: HTMLElement, key: string): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
  target.dispatchEvent(event);
  return event;
}

function setLayout(target: Element, values: Record<string, number>): void {
  Object.entries(values).forEach(([
    key,
    value,
  ]) => {
    Object.defineProperty(target, key, { configurable: true, value });
  });
}

function selectedStates(): string[] {
  return tabs().map((tab) => tab.getAttribute('aria-selected')!);
}

function overflowHorizontally(scrollLeft: number): void {
  setLayout(wrapper(), { scrollWidth: 500, clientWidth: 200, scrollLeft });
  wrapper().dispatchEvent(new Event('scroll'));
}

function domMock(name: typeof domMethods[number]): jest.Mock {
  return HTMLElement.prototype[name] as unknown as jest.Mock;
}

beforeEach(async() => {
  resizeObserverBackup = globalThis.ResizeObserver;
  globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
  ResizeObserverMock.instances = [];
  // jsdom does not implement the element scrolling methods.
  domMethods.forEach((name) => {
    Object.defineProperty(HTMLElement.prototype, name, { configurable: true, writable: true, value: jest.fn() });
  });
  await TestBed.configureTestingModule({
    imports: [
      TestHostComponent,
      SingleTabHostComponent,
    ],
  }).compileComponents();
});

afterEach(() => {
  globalThis.ResizeObserver = resizeObserverBackup;
  domMethods.forEach((name) => {
    delete (HTMLElement.prototype as unknown as Record<string, unknown>)[name];
  });
});

describe('tab group defaults', () => {
  it('should provide the default configuration through the injection token', () => {
    expect(TestBed.inject(IDS_TAB_GROUP_DEFAULT_CONFIG)).toEqual(IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY());
    expect(IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY()).toEqual({
      size: 'compact',
      variant: 'primary',
      orientation: 'horizontal',
      stretchTabs: true,
      tabAlignment: 'start',
      tabPosition: 'left',
      indicatorPosition: 'bottom',
      activationMode: 'manual',
    });
  });
});

describe('IdsTabGroupComponent rendering', () => {
  it('should create with the default configuration', async() => {
    await create();
    const classes = groupElement().classList;

    expect(host.group()).toBeTruthy();
    expect(tabs()).toHaveLength(tabCount);
    [
      'ids-tab-group',
      'ids-tab-group-compact',
      'ids-tab-group-primary',
      'ids-tab-group-horizontal',
      'ids-tab-group-stretch-tabs',
      'ids-tab-group-indicator-bottom',
      'ids-tab-group-manual',
    ].forEach((className) => expect(classes.contains(className)).toBe(true));
    expect(classes.contains('ids-tab-group-disabled')).toBe(false);
    expect(classes.contains('ids-tab-group-start')).toBe(false);
    expect(classes.contains('ids-tab-group-left')).toBe(false);
  });

  it('should reflect the size, variant, activation mode and disabled state in the classes', async() => {
    await create({
      size: IdsSize.COMFORTABLE,
      variant: IdsTabGroupVariant.SURFACE,
      activationMode: IdsTabActivationMode.AUTOMATIC,
      disabled: true,
    });
    const classes = groupElement().classList;

    expect(classes.contains('ids-tab-group-comfortable')).toBe(true);
    expect(classes.contains('ids-tab-group-surface')).toBe(true);
    expect(classes.contains('ids-tab-group-automatic')).toBe(true);
    expect(classes.contains('ids-tab-group-disabled')).toBe(true);
  });

  it('should use the alignment class instead of stretching the tabs', async() => {
    await create({ stretchTabs: false, tabAlignment: IdsTabGroupAlignment.CENTER });
    const classes = groupElement().classList;

    expect(classes.contains('ids-tab-group-stretch-tabs')).toBe(false);
    expect(classes.contains('ids-tab-group-center')).toBe(true);
  });

  it('should use the vertical classes with the tab position and the left indicator', async() => {
    await create({ orientation: IdsOrientation.VERTICAL, tabPosition: IdsTabGroupPosition.RIGHT });
    const classes = groupElement().classList;

    expect(classes.contains('ids-tab-group-vertical')).toBe(true);
    expect(classes.contains('ids-tab-group-right')).toBe(true);
    expect(classes.contains('ids-tab-group-indicator-left')).toBe(true);
    expect(classes.contains('ids-tab-group-stretch-tabs')).toBe(false);
  });

  it('should prefer the explicit indicator position', async() => {
    await create({ indicatorPosition: 'top' });

    expect(groupElement().classList.contains('ids-tab-group-indicator-top')).toBe(true);
    expect(groupElement().classList.contains('ids-tab-group-indicator-bottom')).toBe(false);
  });

  it('should render a tab for every item with its label', async() => {
    await create();

    expect(tabs().map((tab) => tab.querySelector('.ids-tab__label')?.textContent)).toEqual([
      'First',
      'Second',
      'Third',
    ]);
  });

  it('should render the leading and trailing icons only when set', async() => {
    await create();

    expect(tabs()[0].querySelectorAll('ids-icon')).toHaveLength(2);
    expect(tabs()[1].querySelectorAll('ids-icon')).toHaveLength(0);
  });

  it('should render the prefix and suffix content of a tab', async() => {
    await create();

    expect(tabs()[2].querySelector('.prefix')?.textContent).toBe('P');
    expect(tabs()[2].querySelector('.suffix')?.textContent).toBe('S');
  });

  it('should mark the active and the disabled tabs with classes', async() => {
    await create({ secondDisabled: true });

    expect(tabs()[0].classList.contains('ids-tab--active')).toBe(true);
    expect(tabs()[1].classList.contains('ids-tab--active')).toBe(false);
    expect(tabs()[1].classList.contains('ids-tab-disabled')).toBe(true);
    expect(tabs()[0].classList.contains('ids-tab-disabled')).toBe(false);
  });

  it('should render only the content of the selected tab', async() => {
    await create();

    expect(panel()?.textContent).toContain('First content');
    expect(element.querySelectorAll('[role="tabpanel"]')).toHaveLength(1);
  });
});

describe('IdsTabGroupComponent initialization', () => {
  it('should select the first tab by default', async() => {
    await create();

    expect(host.group().selectedTabIndex()).toBe(0);
    expect(host.changes).toEqual([0]);
  });

  it('should select the tab given by setTabIndex', async() => {
    await create({ setTabIndex: 2 });

    expect(host.group().selectedTabIndex()).toBe(2);
    expect(panel()?.textContent).toContain('Third content');
    expect(selectedStates()).toEqual([
      'false',
      'false',
      'true',
    ]);
  });

  it('should select the first tab when setTabIndex is null', async() => {
    await create({ setTabIndex: null as unknown as number });

    expect(host.group().selectedTabIndex()).toBe(0);
  });

  it('should keep the default selection when setTabIndex is out of range', async() => {
    await create({ setTabIndex: 10 });

    expect(host.group().selectedTabIndex()).toBe(0);
    expect(panel()).toBeNull();
  });

  it('should throw with less than two tabs', () => {
    const singleFixture = TestBed.createComponent(SingleTabHostComponent);

    expect(() => singleFixture.detectChanges()).toThrow('ids-tab-group: Invalid count of tab items. Minimum item count is 2.');
    expect(() => singleFixture.destroy()).not.toThrow();
  });

  it.each([
    'left',
    'right',
  ] as const)('should throw with the %s indicator in horizontal mode', async(position) => {
    await expect(create({ indicatorPosition: position }))
      .rejects.toThrow(`Can not use ${position} indicator position with Horizontal mode`);
  });

  it.each([
    'top',
    'bottom',
  ] as const)('should throw with the %s indicator in vertical mode', async(position) => {
    await expect(create({ orientation: IdsOrientation.VERTICAL, indicatorPosition: position }))
      .rejects.toThrow(`Can not use ${position} indicator position with Vertical mode`);
  });

  it.each([
    [
      IdsOrientation.HORIZONTAL,
      'top',
    ],
    [
      IdsOrientation.HORIZONTAL,
      'bottom',
    ],
    [
      IdsOrientation.VERTICAL,
      'left',
    ],
    [
      IdsOrientation.VERTICAL,
      'right',
    ],
  ] as const)('should accept the %s orientation with the %s indicator', async(orientation, position) => {
    await create({ orientation, indicatorPosition: position });

    expect(groupElement().classList.contains(`ids-tab-group-indicator-${position}`)).toBe(true);
  });
});

describe('IdsTabGroupComponent selection', () => {
  beforeEach(async() => {
    await create();
  });

  it('should select a tab with a click and swap the content', async() => {
    tabs()[1].click();
    await render();

    expect(host.group().selectedTabIndex()).toBe(1);
    expect(selectedStates()).toEqual([
      'false',
      'true',
      'false',
    ]);
    expect(panel()?.textContent).toContain('Second content');
    expect(element.querySelectorAll('[role="tabpanel"]')).toHaveLength(1);
  });

  it('should emit the selected index when the selection changes', async() => {
    tabs()[2].click();
    await render();
    tabs()[1].click();
    await render();

    expect(host.changes).toEqual([
      0,
      2,
      1,
    ]);
  });

  it('should select a tab through the public API', async() => {
    host.group().selectTab(2);
    await render();

    expect(host.group().selectedTabIndex()).toBe(2);
  });

  it('should ignore a click on a disabled tab', async() => {
    host.secondDisabled = true;
    await render();

    tabs()[1].click();
    await render();

    expect(host.group().selectedTabIndex()).toBe(0);
  });

  it('should ignore an index that does not exist', async() => {
    host.group().selectTab(tabCount + 1);
    await render();

    expect(host.group().selectedTabIndex()).toBe(0);
  });

  it('should not select anything when the group is disabled', async() => {
    host.disabled = true;
    await render();

    tabs()[1].click();
    host.group().selectTab(2);
    await render();

    expect(host.group().selectedTabIndex()).toBe(0);
  });

  it('should select the focused tab in automatic mode', async() => {
    host.activationMode = IdsTabActivationMode.AUTOMATIC;
    await render();

    tabs()[1].dispatchEvent(new FocusEvent('focus'));
    await render();

    expect(host.group().selectedTabIndex()).toBe(1);
  });

  it('should not select the focused tab in manual mode', async() => {
    tabs()[1].dispatchEvent(new FocusEvent('focus'));
    await render();

    expect(host.group().selectedTabIndex()).toBe(0);
  });
});

describe('IdsTabGroupComponent keyboard navigation in horizontal mode', () => {
  beforeEach(async() => {
    await create();
  });

  it('should move the focus to the next tab with ArrowRight without selecting it', async() => {
    const event = press(tabs()[0], 'ArrowRight');
    await render();

    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(tabs()[1]);
    expect(host.group().selectedTabIndex()).toBe(0);
    expect(tabs().map((tab) => tab.getAttribute('tabindex'))).toEqual([
      '-1',
      '0',
      '-1',
    ]);
  });

  it('should move the focus to the previous tab with ArrowLeft', async() => {
    press(tabs()[0], 'End');
    await render();

    press(tabs()[2], 'ArrowLeft');
    await render();

    expect(document.activeElement).toBe(tabs()[1]);
  });

  it('should wrap around at both ends', async() => {
    press(tabs()[0], 'ArrowLeft');
    await render();
    expect(document.activeElement).toBe(tabs()[2]);

    press(tabs()[2], 'ArrowRight');
    await render();
    expect(document.activeElement).toBe(tabs()[0]);
  });

  it('should skip the disabled tabs', async() => {
    host.secondDisabled = true;
    await render();

    press(tabs()[0], 'ArrowRight');
    await render();

    expect(document.activeElement).toBe(tabs()[2]);
  });

  it('should keep the focus when there is no other enabled tab', async() => {
    host.secondDisabled = true;
    host.thirdDisabled = true;
    await render();

    const event = press(tabs()[0], 'ArrowRight');
    await render();

    expect(event.defaultPrevented).toBe(true);
    expect(internals()._focusedTabIndex()).toBe(0);
  });

});

describe('IdsTabGroupComponent keyboard navigation with the other keys', () => {
  beforeEach(async() => {
    await create();
  });

  it('should move the focus to the first and last tabs with Home and End', async() => {
    press(tabs()[0], 'End');
    await render();
    expect(document.activeElement).toBe(tabs()[2]);

    press(tabs()[2], 'Home');
    await render();
    expect(document.activeElement).toBe(tabs()[0]);
  });

  it('should skip the disabled tabs with Home and End', async() => {
    host.firstDisabled = true;
    host.thirdDisabled = true;
    await render();

    press(tabs()[0], 'Home');
    await render();
    expect(document.activeElement).toBe(tabs()[1]);

    press(tabs()[1], 'End');
    await render();
    expect(document.activeElement).toBe(tabs()[1]);
  });

  it('should keep the focus with Home and End when every tab is disabled', async() => {
    host.firstDisabled = true;
    host.secondDisabled = true;
    host.thirdDisabled = true;
    await render();

    const home = press(tabs()[0], 'Home');
    const end = press(tabs()[0], 'End');
    const next = press(tabs()[0], 'ArrowRight');
    await render();

    expect(home.defaultPrevented).toBe(true);
    expect(end.defaultPrevented).toBe(true);
    expect(next.defaultPrevented).toBe(true);
    expect(internals()._focusedTabIndex()).toBe(0);
  });

  it.each([
    'ArrowUp',
    'ArrowDown',
    'a',
    'Tab',
  ])('should ignore the "%s" key', async(key) => {
    const event = press(tabs()[0], key);
    await render();

    expect(event.defaultPrevented).toBe(false);
    expect(internals()._focusedTabIndex()).toBe(0);
  });

  it.each([
    'Enter',
    ' ',
  ])('should select the focused tab with the "%s" key in manual mode', async(key) => {
    press(tabs()[0], 'ArrowRight');
    await render();

    const event = press(tabs()[1], key);
    await render();

    expect(event.defaultPrevented).toBe(true);
    expect(host.group().selectedTabIndex()).toBe(1);
    expect(panel()?.textContent).toContain('Second content');
  });

  it('should not handle any key when the group is disabled', async() => {
    host.disabled = true;
    await render();

    const event = press(tabs()[0], 'ArrowRight');
    await render();

    expect(event.defaultPrevented).toBe(false);
    expect(internals()._focusedTabIndex()).toBe(0);
  });

  it('should do nothing when there are no tabs left', () => {
    Object.defineProperty(internals(), '_items', { value: (): unknown[] => [] });

    const event = press(tabs()[0], 'Home');

    expect(event.defaultPrevented).toBe(true);
    expect(internals()._nextEnabledTabIndex(1, 1)).toBe(1);
  });
});

describe('IdsTabGroupComponent keyboard navigation in other modes', () => {
  it('should select the tab with the arrow keys in automatic mode', async() => {
    await create({ activationMode: IdsTabActivationMode.AUTOMATIC });

    press(tabs()[0], 'ArrowRight');
    await render();
    expect(host.group().selectedTabIndex()).toBe(1);
    expect(document.activeElement).toBe(tabs()[1]);
    expect(panel()?.textContent).toContain('Second content');

    press(tabs()[1], 'End');
    await render();
    expect(host.group().selectedTabIndex()).toBe(2);
  });

  it.each([
    'Enter',
    ' ',
  ])('should not handle the "%s" key in automatic mode', async(key) => {
    await create({ activationMode: IdsTabActivationMode.AUTOMATIC });

    const event = press(tabs()[0], key);

    expect(event.defaultPrevented).toBe(false);
  });

  it('should navigate with the vertical arrow keys in vertical mode', async() => {
    await create({ orientation: IdsOrientation.VERTICAL });

    press(tabs()[0], 'ArrowDown');
    await render();
    expect(document.activeElement).toBe(tabs()[1]);

    press(tabs()[1], 'ArrowUp');
    await render();
    expect(document.activeElement).toBe(tabs()[0]);
  });

  it.each([
    'ArrowLeft',
    'ArrowRight',
  ])('should ignore the "%s" key in vertical mode', async(key) => {
    await create({ orientation: IdsOrientation.VERTICAL });

    const event = press(tabs()[0], key);

    expect(event.defaultPrevented).toBe(false);
  });
});

describe('IdsTabGroupComponent internals', () => {
  beforeEach(async() => {
    await create();
  });

  it('should not move the focus to a tab without an id', async() => {
    internals()._focusTabElement(tabCount + 1);
    await render();

    expect(document.activeElement).toBe(document.body);
  });

  it('should not fail when the tab element is not in the document anymore', async() => {
    const id = tabs()[1].id;
    tabs()[1].remove();

    internals()._focusTabElement(1);
    await render();

    expect(document.getElementById(id)).toBeNull();
  });
});

describe('IdsTabGroupComponent scrolling', () => {
  it('should not render the scroll buttons without overflow', async() => {
    await create();

    expect(button('previous')).toBeNull();
    expect(button('next')).toBeNull();
  });

  it('should render the scroll buttons when the tabs overflow', async() => {
    await create();

    overflowHorizontally(0);
    await render();

    expect(button('previous')).not.toBeNull();
    expect(button('next')).not.toBeNull();
    expect(button('previous')?.getAttribute('aria-label')).toBe('Scroll tabs left');
    expect(button('next')?.getAttribute('aria-label')).toBe('Scroll tabs right');
    expect(element.querySelector('ul')?.classList.contains('ids-tab-group__header--has-overflow')).toBe(true);
  });

  it('should enable only the scrollable directions', async() => {
    await create();

    overflowHorizontally(0);
    await render();
    expect(button('previous')?.disabled).toBe(true);
    expect(button('next')?.disabled).toBe(false);

    overflowHorizontally(scrolledBy);
    await render();
    expect(button('previous')?.disabled).toBe(false);
    expect(button('next')?.disabled).toBe(false);

    overflowHorizontally(scrolledToEnd);
    await render();
    expect(button('previous')?.disabled).toBe(false);
    expect(button('next')?.disabled).toBe(true);
  });

  it('should disable both scroll buttons when the group is disabled', async() => {
    await create({ disabled: true });

    overflowHorizontally(scrolledBy);
    await render();

    expect(button('previous')?.disabled).toBe(true);
    expect(button('next')?.disabled).toBe(true);
  });

  it('should update the scroll state when the size changes', async() => {
    await create();
    setLayout(wrapper(), { scrollWidth: 500, clientWidth: 200, scrollLeft: 0 });

    ResizeObserverMock.instances[0].callback([], {} as ResizeObserver);
    await render();

    expect(button('next')).not.toBeNull();
  });

  it('should observe the viewport and the tab list and disconnect on destroy', async() => {
    await create();
    const observer = ResizeObserverMock.instances[0];

    expect(observer.observed).toEqual([
      container(),
      wrapper(),
    ]);

    fixture.destroy();

    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });

});

describe('IdsTabGroupComponent scroll buttons', () => {
  it('should scroll the tabs horizontally by 80% of the viewport', async() => {
    await create();
    setLayout(container(), { clientWidth: 400 });
    overflowHorizontally(scrolledBy);
    await render();

    button('next')!.click();
    button('previous')!.click();

    expect(domMock('scrollBy')).toHaveBeenNthCalledWith(1, { left: 320, top: 0, behavior: 'smooth' });
    expect(domMock('scrollBy')).toHaveBeenNthCalledWith(2, { left: -320, top: 0, behavior: 'smooth' });
  });

  it('should scroll at least one pixel', async() => {
    await create();

    internals()._scrollTabs(1);

    expect(domMock('scrollBy')).toHaveBeenCalledWith({ left: 1, top: 0, behavior: 'smooth' });
  });

  it('should not scroll when the group is disabled', async() => {
    await create({ disabled: true });

    internals()._scrollTabs(1);

    expect(domMock('scrollBy')).not.toHaveBeenCalled();
  });

  it('should scroll vertically in vertical mode', async() => {
    await create({ orientation: IdsOrientation.VERTICAL });
    setLayout(container(), { clientHeight: 200 });
    setLayout(wrapper(), { scrollHeight: 600, clientHeight: 200, scrollTop: 100 });
    wrapper().dispatchEvent(new Event('scroll'));
    await render();

    expect(button('previous')?.getAttribute('aria-label')).toBe('Scroll tabs up');
    expect(button('next')?.getAttribute('aria-label')).toBe('Scroll tabs down');
    expect(button('previous')?.disabled).toBe(false);
    expect(button('next')?.disabled).toBe(false);

    button('next')!.click();

    expect(domMock('scrollBy')).toHaveBeenCalledWith({ left: 0, top: 160, behavior: 'smooth' });
  });

  it('should disable the vertical scroll buttons at the ends', async() => {
    await create({ orientation: IdsOrientation.VERTICAL });

    setLayout(wrapper(), { scrollHeight: 600, clientHeight: 200, scrollTop: 0 });
    wrapper().dispatchEvent(new Event('scroll'));
    await render();
    expect(button('previous')?.disabled).toBe(true);

    setLayout(wrapper(), { scrollTop: 400 });
    wrapper().dispatchEvent(new Event('scroll'));
    await render();
    expect(button('next')?.disabled).toBe(true);
  });
});

describe('IdsTabGroupComponent scrolling the selected tab into view', () => {
  function fakeTab(position: 'before' | 'after' | 'inside'): void {
    const { start, size } = {
      before: { start: 50, size: 40 },
      after: { start: 280, size: 60 },
      inside: { start: 150, size: 40 },
    }[position];
    Object.defineProperty(internals(), '_tabElements', {
      value: () => [{ nativeElement: { offsetLeft: start, offsetWidth: size, offsetTop: start, offsetHeight: size } }],
    });
  }

  describe('horizontally', () => {
    beforeEach(async() => {
      await create();
      setLayout(container(), { scrollLeft: 100, clientWidth: 200 });
    });

    it('should scroll back to a tab that starts before the viewport', () => {
      fakeTab('before');

      internals()._scrollTabIntoView(0);

      expect(domMock('scrollTo')).toHaveBeenCalledWith({ left: 50, behavior: 'smooth' });
    });

    it('should scroll forward to a tab that ends after the viewport', () => {
      fakeTab('after');

      internals()._scrollTabIntoView(0, false);

      expect(domMock('scrollTo')).toHaveBeenCalledWith({ left: 140, behavior: 'auto' });
    });

    it('should scroll back without animation when requested', () => {
      fakeTab('before');

      internals()._scrollTabIntoView(0, false);

      expect(domMock('scrollTo')).toHaveBeenCalledWith({ left: 50, behavior: 'auto' });
    });

    it('should not scroll to a tab that is fully visible', () => {
      fakeTab('inside');

      internals()._scrollTabIntoView(0);

      expect(domMock('scrollTo')).not.toHaveBeenCalled();
    });

    it('should scroll after a selection', async() => {
      fakeTab('after');

      host.group().selectTab(0);
      await render();

      expect(domMock('scrollTo')).toHaveBeenCalledWith({ left: 140, behavior: 'smooth' });
    });
  });

  describe('vertically', () => {
    beforeEach(async() => {
      await create({ orientation: IdsOrientation.VERTICAL });
      setLayout(container(), { scrollTop: 100, clientHeight: 200 });
    });

    it('should scroll back to a tab that starts above the viewport', () => {
      fakeTab('before');

      internals()._scrollTabIntoView(0);

      expect(domMock('scrollTo')).toHaveBeenCalledWith({ top: 50, behavior: 'smooth' });
    });

    it('should scroll forward to a tab that ends below the viewport', () => {
      fakeTab('after');

      internals()._scrollTabIntoView(0, false);

      expect(domMock('scrollTo')).toHaveBeenCalledWith({ top: 140, behavior: 'auto' });
    });

    it('should scroll with animation to a tab that ends below the viewport', () => {
      fakeTab('after');

      internals()._scrollTabIntoView(0);

      expect(domMock('scrollTo')).toHaveBeenCalledWith({ top: 140, behavior: 'smooth' });
    });

    it('should scroll back without animation when requested', () => {
      fakeTab('before');

      internals()._scrollTabIntoView(0, false);

      expect(domMock('scrollTo')).toHaveBeenCalledWith({ top: 50, behavior: 'auto' });
    });

    it('should not scroll to a tab that is fully visible', () => {
      fakeTab('inside');

      internals()._scrollTabIntoView(0);

      expect(domMock('scrollTo')).not.toHaveBeenCalled();
    });
  });
});

describe('IdsTabGroupComponent accessibility', () => {
  it('should expose the tab list with its orientation', async() => {
    await create();
    const tabList = element.querySelector('ul')!;

    expect(tabList.getAttribute('role')).toBe('tablist');
    expect(tabList.getAttribute('aria-orientation')).toBe('horizontal');

    fixture.destroy();
    await create({ orientation: IdsOrientation.VERTICAL });

    expect(element.querySelector('ul')?.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should expose every tab with the selected and disabled state', async() => {
    await create({ secondDisabled: true });

    expect(tabs().map((tab) => tab.getAttribute('role'))).toEqual([
      'tab',
      'tab',
      'tab',
    ]);
    expect(selectedStates()).toEqual([
      'true',
      'false',
      'false',
    ]);
    expect(tabs().map((tab) => tab.getAttribute('aria-disabled'))).toEqual([
      'false',
      'true',
      'false',
    ]);
  });

  it('should mark every tab as disabled when the group is disabled', async() => {
    await create({ disabled: true });

    expect(tabs().map((tab) => tab.getAttribute('aria-disabled'))).toEqual([
      'true',
      'true',
      'true',
    ]);
  });

  it('should keep only the focused tab in the tab order', async() => {
    await create();

    expect(tabs().map((tab) => tab.getAttribute('tabindex'))).toEqual([
      '0',
      '-1',
      '-1',
    ]);
  });

  it('should link the selected tab and its panel', async() => {
    await create();

    expect(tabs()[0].getAttribute('aria-controls')).toBe(`${tabs()[0].id}-panel`);
    expect(panel()?.id).toBe(tabs()[0].getAttribute('aria-controls'));
    expect(tabs()[1].getAttribute('aria-controls')).toBe(`${tabs()[1].id}-panel`);
  });

  it('should hide the decorative tab icons from assistive technologies', async() => {
    await create();

    tabs()[0].querySelectorAll('ids-icon').forEach((icon) => {
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('should give the scroll buttons an accessible name', async() => {
    await create();
    setLayout(wrapper(), { scrollWidth: 500, clientWidth: 200, scrollLeft: 100 });
    wrapper().dispatchEvent(new Event('scroll'));
    await render();

    expect(button('previous')?.getAttribute('aria-label')).toBeTruthy();
    expect(button('next')?.getAttribute('aria-label')).toBeTruthy();
  });

  it('should have no axe violations in the tab list', async() => {
    await create();

    expect(await axe(element.querySelector<HTMLElement>('ul')!)).toHaveNoViolations();
  });

  it('should have no axe violations in the tab list with a disabled tab', async() => {
    await create({ secondDisabled: true });

    expect(await axe(element.querySelector<HTMLElement>('ul')!)).toHaveNoViolations();
  });

  it('should have no axe violations in a vertical group', async() => {
    await create({ orientation: IdsOrientation.VERTICAL });

    expect(await axe(element.querySelector<HTMLElement>('ul')!)).toHaveNoViolations();
  });

  it('should have no axe violations with the scroll buttons', async() => {
    await create();
    setLayout(wrapper(), { scrollWidth: 500, clientWidth: 200, scrollLeft: 100 });
    wrapper().dispatchEvent(new Event('scroll'));
    await render();

    expect(await axe(container())).toHaveNoViolations();
  });

  it('should have no axe violations in the whole tab group', async() => {
    await create();

    expect(await axe(element)).toHaveNoViolations();
  });
});
