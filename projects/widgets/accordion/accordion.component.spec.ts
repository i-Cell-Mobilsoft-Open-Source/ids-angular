// The accordion must load before the item because of their circular import.
import { IdsAccordionComponent } from './accordion.component';
// eslint-disable-next-line import/order
import { IdsAccordionItemComponent } from './accordion-item/accordion-item.component';
import { IdsAccordionHeadingLevelType } from './types/accordion-heading-level.type';

import { Component, viewChild, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { axe } from 'jest-axe';

@Component({
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  template: `
    <ids-accordion
      [multi]="multi"
      [disabled]="disabled"
      [headingLevel]="headingLevel"
      [expandBtnLabel]="expandLabel"
      [collapseBtnLabel]="collapseLabel"
    >
      <ids-accordion-item summary="First">First content</ids-accordion-item>
      <ids-accordion-item summary="Second">Second content</ids-accordion-item>
      <ids-accordion-item summary="Third">Third content</ids-accordion-item>
    </ids-accordion>
  `,
})
class TestHostComponent {
  public accordion = viewChild.required(IdsAccordionComponent);
  public items = viewChildren(IdsAccordionItemComponent);
  public multi = false;
  public disabled = false;
  public headingLevel: IdsAccordionHeadingLevelType = 'h3';
  public expandLabel = 'Expand all';
  public collapseLabel = 'Collapse all';
}

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function render(): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

function headers(): HTMLButtonElement[] {
  return Array.from(element.querySelectorAll<HTMLButtonElement>('.ids-accordion-item-summary'));
}

function controlButton(id: 'expand' | 'collapse'): HTMLButtonElement | null {
  return element.querySelector<HTMLButtonElement>(`#${host.accordion().id()}-${id}-btn`);
}

function press(target: HTMLElement, key: string): KeyboardEvent {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
  target.dispatchEvent(event);
  return event;
}

function expandedStates(): boolean[] {
  return host.items().map((item) => item.isExpanded);
}

const itemCount = 3;

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [provideNoopAnimations()],
  }).compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  await render();
});

describe('IdsAccordionComponent rendering', () => {
  it('should create with the default configuration', () => {
    const accordionElement = element.querySelector('ids-accordion')!;

    expect(host.accordion()).toBeTruthy();
    expect(host.items()).toHaveLength(itemCount);
    expect(accordionElement.classList.contains('ids-accordion-compact')).toBe(true);
    expect(accordionElement.classList.contains('ids-accordion-filled')).toBe(true);
    expect(accordionElement.classList.contains('ids-accordion-h3')).toBe(true);
    expect(accordionElement.classList.contains('ids-accordion-disabled')).toBe(false);
  });

  it('should add the disabled class when disabled', async() => {
    host.disabled = true;
    await render();

    expect(element.querySelector('ids-accordion')?.classList.contains('ids-accordion-disabled')).toBe(true);
  });

  it('should not render the expand and collapse all buttons when not multi', () => {
    expect(controlButton('expand')).toBeNull();
    expect(controlButton('collapse')).toBeNull();
  });

  it('should render the expand and collapse all buttons with the default labels when multi', async() => {
    host.multi = true;
    await render();

    expect(controlButton('expand')?.textContent?.trim()).toBe('Expand all');
    expect(controlButton('collapse')?.textContent?.trim()).toBe('Collapse all');
  });

  it('should render custom control labels', async() => {
    host.multi = true;
    host.expandLabel = 'Open everything';
    host.collapseLabel = 'Close everything';
    await render();

    expect(controlButton('expand')?.textContent?.trim()).toBe('Open everything');
    expect(controlButton('collapse')?.textContent?.trim()).toBe('Close everything');
  });
});

describe('IdsAccordionComponent opening and closing', () => {
  it('should open all items with the expand all button when multi', async() => {
    host.multi = true;
    await render();

    controlButton('expand')!.click();
    await render();

    expect(expandedStates()).toEqual([
      true,
      true,
      true,
    ]);
  });

  it('should close all items with the collapse all button when multi', async() => {
    host.multi = true;
    await render();
    controlButton('expand')!.click();
    await render();

    controlButton('collapse')!.click();
    await render();

    expect(expandedStates()).toEqual([
      false,
      false,
      false,
    ]);
  });

  it('should open and close all items through the public API', async() => {
    host.multi = true;
    await render();

    host.accordion().openAll();
    await render();
    expect(expandedStates()).toEqual([
      true,
      true,
      true,
    ]);

    host.accordion().closeAll();
    await render();
    expect(expandedStates()).toEqual([
      false,
      false,
      false,
    ]);
  });

  it('should keep a single item open at a time when not multi', async() => {
    headers()[0].click();
    await render();
    headers()[1].click();
    await render();

    expect(expandedStates()).toEqual([
      false,
      true,
      false,
    ]);
  });

  it('should not open or close items through the public API when disabled', async() => {
    host.multi = true;
    await render();
    host.items()[0].open();
    await render();

    host.disabled = true;
    await render();
    host.accordion().openAll();
    host.accordion().closeAll();
    await render();

    expect(expandedStates()).toEqual([
      true,
      false,
      false,
    ]);
  });

  it('should disable the control buttons when disabled', async() => {
    host.multi = true;
    host.disabled = true;
    await render();

    expect(controlButton('expand')?.disabled).toBe(true);
    expect(controlButton('collapse')?.disabled).toBe(true);
  });
});

describe('IdsAccordionComponent keyboard navigation', () => {
  it('should move the focus to the next item with ArrowDown', () => {
    const [
      first,
      second,
    ] = headers();
    first.focus();

    const event = press(first, 'ArrowDown');

    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(second);
  });

  it('should keep the focus on the last item with ArrowDown', () => {
    const last = headers()[2];
    last.focus();

    press(last, 'ArrowDown');

    expect(document.activeElement).toBe(last);
  });

  it('should move the focus to the previous item with ArrowUp', () => {
    const [
      first,
      second,
    ] = headers();
    second.focus();

    press(second, 'ArrowUp');

    expect(document.activeElement).toBe(first);
  });

  it('should keep the focus on the first item with ArrowUp', () => {
    const first = headers()[0];
    first.focus();

    press(first, 'ArrowUp');

    expect(document.activeElement).toBe(first);
  });

  it('should move the focus to the first item with Home', () => {
    const [
      first, , last,
    ] = headers();
    last.focus();

    press(last, 'Home');

    expect(document.activeElement).toBe(first);
  });

  it('should move the focus to the last item with End', () => {
    const [
      first, , last,
    ] = headers();
    first.focus();

    press(first, 'End');

    expect(document.activeElement).toBe(last);
  });

  it.each([
    'Enter',
    ' ',
  ])('should toggle the focused item with the "%s" key', async(key) => {
    const first = headers()[0];
    first.focus();

    const openEvent = press(first, key);
    await render();
    expect(openEvent.defaultPrevented).toBe(true);
    expect(first.getAttribute('aria-expanded')).toBe('true');

    press(first, key);
    await render();
    expect(first.getAttribute('aria-expanded')).toBe('false');
  });

  it('should ignore keys that are not navigation keys', () => {
    const first = headers()[0];
    first.focus();

    const event = press(first, 'a');

    expect(event.defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(first);
  });

  it('should not toggle a disabled item with the keyboard', async() => {
    host.disabled = true;
    await render();
    const first = headers()[0];

    press(first, 'Enter');
    await render();

    expect(first.getAttribute('aria-expanded')).toBe('false');
  });
});

describe('IdsAccordionComponent accessibility', () => {
  it('should have no axe violations by default', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations with an expanded item', async() => {
    headers()[0].click();
    await render();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when multi with control buttons', async() => {
    host.multi = true;
    await render();
    controlButton('expand')!.click();
    await render();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when disabled', async() => {
    host.multi = true;
    host.disabled = true;
    await render();

    expect(await axe(element)).toHaveNoViolations();
  });

  it.each([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ] as const)('should render the item headers as %s headings', async(level) => {
    host.headingLevel = level;
    await render();

    expect(element.querySelectorAll(`${level} > button.ids-accordion-item-summary`)).toHaveLength(itemCount);
  });

  it('should expose every header as a button that controls its own region', () => {
    const regions = Array.from(element.querySelectorAll('[role="region"]'));

    headers().forEach((header, index) => {
      expect(header.getAttribute('aria-controls')).toBe(regions[index].id);
      expect(regions[index].getAttribute('aria-labelledby')).toBe(header.id);
    });
  });

  it('should keep every header reachable with the tab key and reflect the collapsed state', () => {
    headers().forEach((header) => {
      expect(header.getAttribute('tabindex')).toBe('0');
      expect(header.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
