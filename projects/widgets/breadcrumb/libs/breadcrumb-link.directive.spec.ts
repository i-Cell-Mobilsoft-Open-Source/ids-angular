import { IdsBreadcrumbLinkDirective } from './breadcrumb-link.directive';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { axe } from 'jest-axe';

@Component({
  imports: [IdsBreadcrumbLinkDirective],
  template: `
    <a idsBreadcrumbLink [link]="link" [disabled]="disabled" (hasTooltip)="events.push($event)">Products</a>
  `,
})
class TestHostComponent {
  public link: string | null = '/products';
  public disabled = false;
  public events: boolean[] = [];
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

let resizeObserverBackup: typeof ResizeObserver;
let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function render(): Promise<void> {
  fixture.detectChanges();
  await fixture.whenStable();
  TestBed.tick();
  fixture.detectChanges();
}

async function create(overrides: Partial<TestHostComponent> = {}): Promise<void> {
  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  Object.assign(host, overrides);
  await render();
}

function anchor(): HTMLAnchorElement {
  return element.querySelector<HTMLAnchorElement>('a')!;
}

function setClipped(clipped: boolean): void {
  Object.defineProperty(anchor(), 'offsetWidth', { configurable: true, value: clipped ? 0 : 1 });
  Object.defineProperty(anchor(), 'scrollWidth', { configurable: true, value: 1 });
}

beforeEach(async() => {
  resizeObserverBackup = globalThis.ResizeObserver;
  globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
  ResizeObserverMock.instances = [];
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
    providers: [provideRouter([])],
  }).compileComponents();
});

afterEach(() => {
  globalThis.ResizeObserver = resizeObserverBackup;
});

describe('IdsBreadcrumbLinkDirective', () => {
  it('should add the link class', async() => {
    await create();

    expect(anchor().classList.contains('ids-breadcrumb-link')).toBe(true);
  });

  it('should link to the given path', async() => {
    await create();

    expect(anchor().getAttribute('href')).toBe('/products');
  });

  it('should not link without a path', async() => {
    await create({ link: null });

    expect(anchor().hasAttribute('href')).toBe(false);
  });

  it('should not be disabled by default', async() => {
    await create();

    expect(anchor().hasAttribute('aria-disabled')).toBe(false);
    expect(anchor().hasAttribute('disabled')).toBe(false);
  });

  it('should reflect the disabled state', async() => {
    await create({ disabled: true });

    expect(anchor().getAttribute('aria-disabled')).toBe('');
    expect(anchor().getAttribute('disabled')).toBe('');
  });
});

describe('IdsBreadcrumbLinkDirective clipping', () => {
  it('should report that the label is not clipped after the first render', async() => {
    await create();

    expect(host.events).toEqual([false]);
  });

  it('should report the clipped label only once', async() => {
    await create();
    setClipped(true);

    await render();
    await render();

    expect(host.events).toEqual([
      false,
      true,
    ]);
  });

  it('should report when the label is not clipped anymore', async() => {
    await create();
    setClipped(true);
    await render();

    setClipped(false);
    await render();

    expect(host.events).toEqual([
      false,
      true,
      false,
    ]);
  });

  it('should observe the size of the host and report the changes', async() => {
    await create();
    const observer = ResizeObserverMock.instances.find((instance) => instance.observed.includes(anchor()))!;
    expect(observer).toBeDefined();

    setClipped(true);
    observer.callback([], {} as ResizeObserver);

    expect(host.events).toEqual([
      false,
      true,
    ]);
  });

  it('should stop observing when destroyed', async() => {
    await create();
    const observer = ResizeObserverMock.instances.find((instance) => instance.observed.includes(anchor()))!;

    fixture.destroy();

    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });
});

describe('IdsBreadcrumbLinkDirective accessibility', () => {
  it('should be reachable with the keyboard when it has a path', async() => {
    await create();

    anchor().focus();

    expect(document.activeElement).toBe(anchor());
  });

  it('should not be reachable with the keyboard when disabled', async() => {
    await create({ link: null, disabled: true });

    anchor().focus();

    expect(document.activeElement).not.toBe(anchor());
  });

  it('should have no axe violations', async() => {
    await create();

    expect(await axe(element)).toHaveNoViolations();
  });

  it('should have no axe violations when disabled', async() => {
    await create({ link: null, disabled: true });

    expect(await axe(element)).toHaveNoViolations();
  });
});
