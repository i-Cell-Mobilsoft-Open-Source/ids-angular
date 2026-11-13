import { IdsBreadcrumbTruncationComponent } from './breadcrumb-truncation.component';

import { InteractivityChecker } from '@angular/cdk/a11y';
import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconButtonVariantType } from '@i-cell/ids-angular/icon-button';
import { axe } from 'jest-axe';

@Component({
  imports: [IdsBreadcrumbTruncationComponent],
  template: `
    <ol>
      <li idsBreadcrumbTruncation [size]="size" [variant]="variant" [overlayClass]="overlayClass" [panelClass]="panelClass">
        @for (item of items; track item.path) {
          <li class="item"><a [href]="item.path">{{ item.label }}</a></li>
        }
      </li>
    </ol>
  `,
})
class TestHostComponent {
  public truncation = viewChild.required(IdsBreadcrumbTruncationComponent);
  public items = [
    { label: 'Home', path: '/home' },
    { label: 'Products', path: '/products' },
  ];

  public size: IdsSizeType = IdsSize.COMPACT;
  public variant: IdsIconButtonVariantType = 'surface';
  public overlayClass = 'custom-overlay';
  public panelClass = 'panel-one panel-two';
}

interface TruncationInternals {
  _open(): void;
  _close(): void;
  _toggle(): void;
  _handlePanelOpenChange(open: boolean): void;
}

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function render(): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  TestBed.tick();
  fixture.detectChanges();
}

function trigger(): HTMLButtonElement {
  return element.querySelector<HTMLButtonElement>('button')!;
}

function overlay(): HTMLElement | null {
  return document.querySelector<HTMLElement>('.cdk-overlay-container .ids-breadcrumb-overlay-panel');
}

function internals(): TruncationInternals {
  return host.truncation() as unknown as TruncationInternals;
}

beforeEach(async() => {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  await render();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('IdsBreadcrumbTruncationComponent rendering', () => {
  it('should create closed', () => {
    expect(host.truncation()).toBeTruthy();
    expect(host.truncation().isPanelOpen()).toBe(false);
    expect(overlay()).toBeNull();
  });

  it('should render a button trigger with a decorative icon', () => {
    expect(trigger().getAttribute('type')).toBe('button');
    expect(trigger().querySelector('ids-icon')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should not render the projected items while closed', () => {
    expect(document.querySelector('.item')).toBeNull();
  });

  it('should render the projected items in the overlay when opened', async() => {
    trigger().click();
    await render();

    expect(host.truncation().isPanelOpen()).toBe(true);
    expect(overlay()?.querySelectorAll('.item')).toHaveLength(2);
  });

  it('should add the panel classes and the overlay class', async() => {
    trigger().click();
    await render();

    expect(overlay()?.classList.contains('panel-one')).toBe(true);
    expect(overlay()?.classList.contains('panel-two')).toBe(true);
    expect(overlay()?.querySelector('ol')?.classList.contains('custom-overlay')).toBe(true);
    expect(overlay()?.querySelector('ol')?.classList.contains('ids-breadcrumb-list')).toBe(true);
  });
});

describe('IdsBreadcrumbTruncationComponent opening and closing', () => {
  it('should close when the trigger is clicked again', async() => {
    trigger().click();
    await render();

    trigger().click();
    await render();

    expect(host.truncation().isPanelOpen()).toBe(false);
    expect(overlay()).toBeNull();
  });

  it('should close when the outside of the panel is clicked', async() => {
    trigger().click();
    await render();

    document.body.click();
    await render();

    expect(host.truncation().isPanelOpen()).toBe(false);
    expect(overlay()).toBeNull();
  });

  it('should stay open when opened again', async() => {
    internals()._open();
    internals()._open();
    await render();

    expect(host.truncation().isPanelOpen()).toBe(true);
  });

  it('should stay closed when closed again', async() => {
    internals()._close();
    await render();

    expect(host.truncation().isPanelOpen()).toBe(false);
  });

  it('should close when the panel reports that it was closed', () => {
    internals()._open();

    internals()._handlePanelOpenChange(false);

    expect(host.truncation().isPanelOpen()).toBe(false);
  });

  it('should stay open when the panel reports that it was opened', () => {
    internals()._open();

    internals()._handlePanelOpenChange(true);

    expect(host.truncation().isPanelOpen()).toBe(true);
  });
});

describe('IdsBreadcrumbTruncationComponent accessibility', () => {
  it('should be reachable and operable with the keyboard', () => {
    trigger().focus();

    expect(document.activeElement).toBe(trigger());
  });

  it('should move the focus into the opened panel', async() => {
    // jsdom has no layout, so every element would be considered invisible by the focus trap.
    jest.spyOn(InteractivityChecker.prototype, 'isVisible').mockReturnValue(true);
    trigger().click();
    await render();

    expect(overlay()?.contains(document.activeElement)).toBe(true);
  });

  it('should have no axe violations in the opened panel', async() => {
    trigger().click();
    await render();

    expect(await axe(overlay()!)).toHaveNoViolations();
  });
});
