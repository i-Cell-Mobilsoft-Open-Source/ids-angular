// The accordion must load before the item because of their circular import.
import { IdsAccordionComponent } from '../accordion.component';
// eslint-disable-next-line import/order
import { IDS_ACCORDION_DEFAULT_CONFIG } from '../accordion-defaults';
import { IdsAccordionHeadingLevelType } from '../types/accordion-heading-level.type';

// eslint-disable-next-line import/order
import { IdsAccordionItemComponent } from './accordion-item.component';

import { Component, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { axe } from 'jest-axe';

@Component({
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  template: `
    <ids-accordion [headingLevel]="headingLevel" [disabled]="accordionDisabled" [hasLeadingIcon]="leadingIcon">
      <ids-accordion-item summary="First" [disabled]="firstDisabled">First content</ids-accordion-item>
      <ids-accordion-item summary="Second" [expanded]="true">Second content</ids-accordion-item>
    </ids-accordion>
  `,
})
class TestHostComponent {
  public items = viewChildren(IdsAccordionItemComponent);
  public headingLevel: IdsAccordionHeadingLevelType = 'h3';
  public accordionDisabled = false;
  public firstDisabled = false;
  public leadingIcon = false;
}

@Component({
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  template: `
    <ids-accordion>
      <ids-accordion-item summary="With icons" hasLeadingIcon hasTrailingIcon>Content</ids-accordion-item>
      <ids-accordion-item summary="Without icons">Content</ids-accordion-item>
    </ids-accordion>
  `,
})
class ItemLevelIconsHostComponent {}

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function render(): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
}

function item(index: number): IdsAccordionItemComponent {
  return host.items()[index];
}

function header(index: number): HTMLButtonElement {
  return element.querySelectorAll<HTMLButtonElement>('.ids-accordion-item-summary')[index];
}

function region(index: number): HTMLElement {
  return element.querySelectorAll<HTMLElement>('[role="region"]')[index];
}

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [
      TestHostComponent,
      ItemLevelIconsHostComponent,
    ],
    providers: [provideNoopAnimations()],
  }).compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  await render();
});

describe('IdsAccordionItemComponent rendering', () => {
  it('should create', () => {
    expect(item(0)).toBeTruthy();
    expect(item(1)).toBeTruthy();
  });

  it('should render the summary and the projected content', () => {
    expect(header(0).textContent?.trim()).toBe('First');
    expect(region(0).textContent?.trim()).toBe('First content');
  });

  it('should apply the disabled class only to disabled items', async() => {
    host.firstDisabled = true;
    await render();

    const [
      first,
      second,
    ] = Array.from(element.querySelectorAll('ids-accordion-item'));
    expect(first.classList.contains('ids-accordion-item-disabled')).toBe(true);
    expect(second.classList.contains('ids-accordion-item-disabled')).toBe(false);
  });

  it('should render the item expanded through the expanded input', () => {
    expect(item(0).isExpanded).toBe(false);
    expect(item(1).isExpanded).toBe(true);
  });
});

describe('IdsAccordionItemComponent opening and closing', () => {
  it('should toggle when the header is clicked', async() => {
    header(0).click();
    await render();
    expect(item(0).isExpanded).toBe(true);

    header(0).click();
    await render();
    expect(item(0).isExpanded).toBe(false);
  });

  it('should open, close and toggle through the public API', async() => {
    item(0).open();
    await render();
    expect(item(0).isExpanded).toBe(true);

    item(0).close();
    await render();
    expect(item(0).isExpanded).toBe(false);

    item(0).toggle();
    await render();
    expect(item(0).isExpanded).toBe(true);
  });

  it('should not react to the header click or the public API when disabled', async() => {
    host.firstDisabled = true;
    await render();

    header(0).click();
    item(0).open();
    item(0).toggle();
    await render();
    expect(item(0).isExpanded).toBe(false);

    item(1).close();
    host.accordionDisabled = true;
    await render();
    item(1).open();
    item(1).close();
    await render();
    expect(item(1).isExpanded).toBe(false);
  });

  it('should not close an expanded item through the public API when the accordion is disabled', async() => {
    host.accordionDisabled = true;
    await render();

    item(1).close();
    await render();

    expect(item(1).isExpanded).toBe(true);
  });

  it('should move the focus to the header with focus()', () => {
    item(0).focus();

    expect(document.activeElement).toBe(header(0));
  });
});

describe('IdsAccordionItemComponent icons', () => {
  it('should render only the trailing icon by default', () => {
    expect(element.querySelectorAll('ids-icon[icon-trailing]')).toHaveLength(2);
    expect(element.querySelectorAll('ids-icon[icon-leading]')).toHaveLength(0);
  });

  it('should render the leading icons when the accordion enables them', async() => {
    host.leadingIcon = true;
    await render();

    expect(element.querySelectorAll('ids-icon[icon-leading]')).toHaveLength(2);
  });

  it('should switch the chevron with the expanded state', async() => {
    const icon = (): string | null | undefined => header(0).querySelector('ids-icon')?.getAttribute('fonticon');
    expect(icon()).toBe('chevron-down');

    header(0).click();
    await render();

    expect(icon()).toBe('chevron-up');
  });
});

describe('IdsAccordionItemComponent item-level icons', () => {
  it('should use the item inputs when the accordion does not define the icon settings', async() => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [ItemLevelIconsHostComponent],
      providers: [
        provideNoopAnimations(),
        {
          provide: IDS_ACCORDION_DEFAULT_CONFIG,
          useValue: {
            hasLeadingIcon: undefined,
            hasTrailingIcon: undefined,
          },
        },
      ],
    }).compileComponents();
    const iconFixture = TestBed.createComponent(ItemLevelIconsHostComponent);
    iconFixture.detectChanges();
    await iconFixture.whenStable();
    iconFixture.detectChanges();
    const [
      withIcons,
      withoutIcons,
    ] = Array.from(iconFixture.nativeElement.querySelectorAll('ids-accordion-item')) as HTMLElement[];

    expect(withIcons.querySelector('ids-icon[icon-leading]')).not.toBeNull();
    expect(withIcons.querySelector('ids-icon[icon-trailing]')).not.toBeNull();
    expect(withoutIcons.querySelector('ids-icon[icon-leading]')).toBeNull();
    expect(withoutIcons.querySelector('ids-icon[icon-trailing]')).toBeNull();
  });
});

describe('IdsAccordionItemComponent accessibility', () => {
  it.each([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ] as const)('should wrap the header button in a %s heading', async(level) => {
    host.headingLevel = level;
    await render();

    expect(header(0).parentElement?.tagName.toLowerCase()).toBe(level);
  });

  it('should fall back to an h3 heading for an unknown heading level', async() => {
    host.headingLevel = 'h7' as IdsAccordionHeadingLevelType;
    await render();

    expect(header(0).parentElement?.tagName.toLowerCase()).toBe('h3');
  });

  it('should link the header button and the region with aria-controls and aria-labelledby', () => {
    expect(header(0).getAttribute('aria-controls')).toBe(region(0).id);
    expect(region(0).getAttribute('aria-labelledby')).toBe(header(0).id);
    expect(region(0).getAttribute('role')).toBe('region');
  });

  it('should reflect the expanded state in aria-expanded', async() => {
    expect(header(0).getAttribute('aria-expanded')).toBe('false');
    expect(header(1).getAttribute('aria-expanded')).toBe('true');

    header(0).click();
    await render();

    expect(header(0).getAttribute('aria-expanded')).toBe('true');
  });

  it('should hide the collapsed region from assistive technology and show the expanded one', async() => {
    expect(region(0).style.visibility).toBe('hidden');
    expect(region(1).style.visibility).not.toBe('hidden');

    header(0).click();
    await render();

    expect(region(0).style.visibility).not.toBe('hidden');
  });

  it('should make an enabled header focusable and a disabled one not', async() => {
    expect(header(0).getAttribute('tabindex')).toBe('0');
    expect(header(0).getAttribute('aria-disabled')).toBe('false');

    host.firstDisabled = true;
    await render();

    expect(header(0).getAttribute('tabindex')).toBe('-1');
    expect(header(0).getAttribute('aria-disabled')).toBe('true');
  });

  it('should disable every item header when the accordion is disabled', async() => {
    host.accordionDisabled = true;
    await render();

    expect(header(0).getAttribute('aria-disabled')).toBe('true');
    expect(header(1).getAttribute('aria-disabled')).toBe('true');
  });

  it('should hide the decorative icons from assistive technology', async() => {
    host.leadingIcon = true;
    await render();

    element.querySelectorAll('ids-icon').forEach((icon) => {
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('should have no axe violations by default', async() => {
    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations with icons and an opened item', async() => {
    host.leadingIcon = true;
    await render();
    header(0).click();
    await render();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations with a disabled item', async() => {
    host.firstDisabled = true;
    await render();

    expect(await axe(element)).toHaveNoViolations();
  });

  it.each([
    'h1',
    'h2',
    'h4',
    'h6',
  ] as const)('should have no axe violations with %s headings', async(level) => {
    host.headingLevel = level;
    await render();

    expect(await axe(element, { rules: { 'heading-order': { enabled: false } } })).toHaveNoViolations();
  });
});
