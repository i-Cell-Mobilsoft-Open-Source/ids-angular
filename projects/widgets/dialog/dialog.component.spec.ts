import { IdsCustomDialogBase } from './custom-dialog-base';
import { IDS_DIALOG_DEFAULT_CONFIG, IDS_DIALOG_DEFAULT_CONFIG_FACTORY } from './dialog-defaults';
import { IdsDialogHeaderDirective } from './dialog-header.directive';
import { IdsDialogComponent } from './dialog.component';
import { IdsDialogService } from './dialog.service';

import { IdsSize, IdsSizeType } from '../core';

import { InteractivityChecker } from '@angular/cdk/a11y';
import { Dialog } from '@angular/cdk/dialog';
import { Component, input, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { axe } from 'jest-axe';
import { Subject } from 'rxjs';

class ResizeObserverMock {
  public static callback: ResizeObserverCallback | undefined;

  constructor(callback: ResizeObserverCallback) {
    ResizeObserverMock.callback = callback;
  }

  public observe(): void {}
  public unobserve(): void {}
  public disconnect(): void {}
}

@Component({
  imports: [
    IdsDialogComponent,
    IdsDialogHeaderDirective,
  ],
  template: `
    <button type="button" id="trigger">Trigger</button>
    <dialog
      idsDialog
      [mainTitle]="mainTitle"
      [subTitle]="subTitle"
      [size]="size"
      [showCloseButton]="showCloseButton"
      [isCloseButtonDisabled]="isCloseButtonDisabled"
      [showBackdrop]="showBackdrop"
    >
      @if (customHeader) {
        <div *idsDialogHeader><h2 id="custom-title">Custom header</h2></div>
      }
      <p idsDialogContent>Dialog body</p>
      <div idsDialogActions><button type="button" id="action">OK</button></div>
    </dialog>
  `,
})
class TestHostComponent {
  public dialog = viewChild.required(IdsDialogComponent);
  public mainTitle = 'Dialog title';
  public subTitle: string | undefined = undefined;
  public size: IdsSizeType = IdsSize.COMPACT;
  public showCloseButton = false;
  public isCloseButtonDisabled = false;
  public showBackdrop = true;
  public customHeader = false;
}

@Component({
  imports: [IdsDialogComponent],
  template: '<dialog idsDialog mainTitle="Default title" id="default-dialog"></dialog>',
})
class DefaultsHostComponent {
  public dialog = viewChild.required(IdsDialogComponent);
}

@Component({
  imports: [IdsDialogComponent],
  template: `
    <ids-dialog subTitle="Subtitle" [mainTitle]="heading()" [showCloseButton]="true">
      <p idsDialogContent>Custom body</p>
      <div idsDialogActions>
        <button type="button" id="confirm" (click)="close('confirmed')">OK</button>
      </div>
    </ids-dialog>
  `,
})
class CustomDialogComponent extends IdsCustomDialogBase {
  public heading = input('Custom title');
}

class TestCustomDialog extends IdsCustomDialogBase {}

let resizeObserverBackup: typeof ResizeObserver;

function overlayContainer(): HTMLElement {
  return document.querySelector<HTMLElement>('.cdk-overlay-container') ?? document.body;
}

function query<T extends HTMLElement = HTMLElement>(selector: string): T | null {
  return overlayContainer().querySelector<T>(selector);
}

async function renderAll<T>(target: ComponentFixture<T>): Promise<void> {
  target.detectChanges();
  await target.whenStable();
  TestBed.tick();
  target.detectChanges();
}

beforeEach(() => {
  resizeObserverBackup = globalThis.ResizeObserver;
  globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
  ResizeObserverMock.callback = undefined;
  // jsdom has no layout, so the focus trap would consider every element invisible.
  jest.spyOn(InteractivityChecker.prototype, 'isVisible').mockReturnValue(true);
});

afterEach(() => {
  globalThis.ResizeObserver = resizeObserverBackup;
  jest.restoreAllMocks();
});

describe('dialog defaults', () => {
  it('should provide the default configuration through the injection token', () => {
    expect(TestBed.inject(IDS_DIALOG_DEFAULT_CONFIG)).toEqual(IDS_DIALOG_DEFAULT_CONFIG_FACTORY());
    expect(IDS_DIALOG_DEFAULT_CONFIG_FACTORY()).toEqual({
      size: IdsSize.COMPACT,
      showCloseButton: false,
      isCloseButtonDisabled: false,
      showBackdrop: true,
    });
  });
});

let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let element: HTMLElement;

async function render(): Promise<void> {
  await renderAll(fixture);
}

async function openDialog(): Promise<void> {
  host.dialog().open();
  await render();
}

async function createHost(): Promise<void> {
  await TestBed.configureTestingModule({
    imports: [TestHostComponent],
  }).compileComponents();

  fixture = TestBed.createComponent(TestHostComponent);
  host = fixture.componentInstance;
  element = fixture.nativeElement as HTMLElement;
  await render();
}

describe('IdsDialogComponent rendering', () => {
  beforeEach(createHost);

  it('should create', () => {
    expect(host.dialog()).toBeTruthy();
  });

  it('should set the host classes and attributes', () => {
    const dialogElement = element.querySelector('dialog')!;

    expect(dialogElement.classList.contains('ids-dialog')).toBe(true);
    expect(dialogElement.classList.contains('ids-dialog-compact')).toBe(true);
    expect(dialogElement.classList.contains('ids-dialog-with-backdrop')).toBe(true);
    expect(dialogElement.getAttribute('role')).toBe('dialog');
    expect(dialogElement.getAttribute('aria-modal')).toBe('true');
    expect(dialogElement.getAttribute('aria-labelledby')).toBe(`${host.dialog().id()}-title`);
  });

  it('should reflect the size and the backdrop on the host classes', async() => {
    host.size = IdsSize.COMFORTABLE;
    host.showBackdrop = false;
    await render();
    const dialogElement = element.querySelector('dialog')!;

    expect(dialogElement.classList.contains('ids-dialog-comfortable')).toBe(true);
    expect(dialogElement.classList.contains('ids-dialog-with-backdrop')).toBe(false);
  });

  it('should not render the content inline while closed', () => {
    expect(element.querySelector('.ids-dialog-container')).toBeNull();
    expect(query('.ids-dialog-container')).toBeNull();
  });

  it('should render the title, the content and the actions when opened', async() => {
    await openDialog();

    expect(query('.ids-dialog-title')?.textContent).toBe('Dialog title');
    expect(query('.ids-dialog-title')?.tagName).toBe('H2');
    expect(query('.ids-dialog-content')?.textContent).toContain('Dialog body');
    expect(query('.ids-dialog-actions #action')).not.toBeNull();
  });

  it('should not render the subtitle without a value', async() => {
    await openDialog();

    expect(query('.ids-dialog-subtitle')).toBeNull();
  });

  it('should render the subtitle as an h3 when provided', async() => {
    host.subTitle = 'Dialog subtitle';
    await render();
    await openDialog();

    expect(query('.ids-dialog-subtitle')?.textContent).toBe('Dialog subtitle');
    expect(query('.ids-dialog-subtitle')?.tagName).toBe('H3');
  });

  it('should render the custom header instead of the default one', async() => {
    host.customHeader = true;
    await render();
    await openDialog();

    expect(query('#custom-title')?.textContent).toBe('Custom header');
    expect(query('.ids-dialog-header-default-content')).toBeNull();
    expect(query('.ids-dialog-title')).toBeNull();
  });

  it('should not render the close button by default', async() => {
    await openDialog();

    expect(query('.ids-dialog-close-button')).toBeNull();
  });

  it('should render the close button when requested', async() => {
    host.showCloseButton = true;
    await render();
    await openDialog();

    const closeButton = query<HTMLButtonElement>('.ids-dialog-close-button')!;
    expect(closeButton).not.toBeNull();
    expect(closeButton.getAttribute('type')).toBe('button');
    expect(closeButton.disabled).toBe(false);
  });

  it('should disable the close button when requested', async() => {
    host.showCloseButton = true;
    host.isCloseButtonDisabled = true;
    await render();
    await openDialog();

    expect(query<HTMLButtonElement>('.ids-dialog-close-button')?.disabled).toBe(true);
  });

  it('should mark the content as scrollable only when it overflows', async() => {
    await openDialog();
    const overflow = query('.ids-dialog-content-overflow')!;
    const content = query('.ids-dialog-content')!;
    Object.defineProperty(overflow, 'scrollHeight', { configurable: true, value: 300 });
    Object.defineProperty(overflow, 'clientHeight', { configurable: true, value: 100 });

    ResizeObserverMock.callback?.([{ target: overflow } as unknown as ResizeObserverEntry], {} as ResizeObserver);
    await render();
    expect(content.classList.contains('ids-dialog-content-scrollable')).toBe(true);

    Object.defineProperty(overflow, 'scrollHeight', { configurable: true, value: 100 });
    ResizeObserverMock.callback?.([{ target: overflow } as unknown as ResizeObserverEntry], {} as ResizeObserver);
    await render();
    expect(content.classList.contains('ids-dialog-content-scrollable')).toBe(false);
  });
});

describe('IdsDialogComponent opening and closing', () => {
  beforeEach(createHost);

  it('should open an overlay with the panel and backdrop classes', async() => {
    await openDialog();

    const panel = query('.cdk-global-overlay-wrapper .ids-dialog')!;
    expect(panel).not.toBeNull();
    expect(panel.classList.contains('ids-dialog-compact')).toBe(true);
    expect(panel.classList.contains('ids-dialog-with-backdrop')).toBe(true);
    expect(query('.cdk-overlay-backdrop.ids-dialog-backdrop')).not.toBeNull();
  });

  it('should use the size in the panel class', async() => {
    host.size = IdsSize.COMFORTABLE;
    await render();
    await openDialog();

    expect(query('.ids-dialog-comfortable')).not.toBeNull();
  });

  it('should use a transparent backdrop without the backdrop panel class', async() => {
    host.showBackdrop = false;
    await render();
    await openDialog();

    expect(query('.cdk-overlay-backdrop.ids-dialog-transparent-backdrop')).toBeNull();
    expect(query('.ids-dialog-with-backdrop')).toBeNull();
    expect(query('.ids-dialog')).not.toBeNull();
  });

  it('should not open a second overlay when already open', async() => {
    await openDialog();
    await openDialog();

    expect(overlayContainer().querySelectorAll('.ids-dialog-container')).toHaveLength(1);
  });

  it('should close with the close method', async() => {
    await openDialog();

    host.dialog().close();
    await render();

    expect(query('.ids-dialog-container')).toBeNull();
  });

  it('should do nothing when closing a dialog that is not open', async() => {
    expect(() => host.dialog().close()).not.toThrow();
    await render();

    expect(query('.ids-dialog-container')).toBeNull();
  });

  it('should be reopenable after it was closed', async() => {
    await openDialog();
    host.dialog().close();
    await render();

    await openDialog();

    expect(overlayContainer().querySelectorAll('.ids-dialog-container')).toHaveLength(1);
  });

  it('should close when the close button is clicked', async() => {
    host.showCloseButton = true;
    await render();
    await openDialog();

    query<HTMLButtonElement>('.ids-dialog-close-button')!.click();
    await render();

    expect(query('.ids-dialog-container')).toBeNull();
  });

  it('should not close when the disabled close button is clicked', async() => {
    host.showCloseButton = true;
    host.isCloseButtonDisabled = true;
    await render();
    await openDialog();

    query<HTMLButtonElement>('.ids-dialog-close-button')!.click();
    await render();

    expect(query('.ids-dialog-container')).not.toBeNull();
  });

  it('should not close with the Escape key', async() => {
    await openDialog();

    const event = new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true, cancelable: true });
    query('.ids-dialog-container')!.dispatchEvent(event);
    await render();

    expect(query('.ids-dialog-container')).not.toBeNull();
  });

  it('should not close when the backdrop is clicked', async() => {
    await openDialog();

    query('.cdk-overlay-backdrop')!.click();
    await render();

    expect(query('.ids-dialog-container')).not.toBeNull();
  });

  it('should prevent the native cancel event', () => {
    const event = new Event('cancel', { cancelable: true });
    const component = host.dialog() as unknown as { _onCancel(event: Event): void };

    component._onCancel(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('should do nothing on the native close event', () => {
    const component = host.dialog() as unknown as { _onNativeClose(): void };

    expect(() => component._onNativeClose()).not.toThrow();
  });
});

describe('IdsDialogComponent accessibility', () => {
  beforeEach(createHost);

  it('should expose the overlay container as a modal dialog labelled by the title', async() => {
    await openDialog();

    const container = query('.cdk-dialog-container')!;
    const titleId = container.getAttribute('aria-labelledby')!;

    expect(container.getAttribute('role')).toBe('dialog');
    expect(container.getAttribute('aria-modal')).toBe('true');
    expect(titleId).toBe(`${host.dialog().id()}-title`);
    expect(query(`#${titleId}`)?.textContent).toBe('Dialog title');
  });

  it('should keep the title as the accessible name when a subtitle is present', async() => {
    host.subTitle = 'Dialog subtitle';
    await render();
    await openDialog();

    expect(query(`#${query('.cdk-dialog-container')!.getAttribute('aria-labelledby')}`)?.textContent)
      .toBe('Dialog title');
  });

  it('should move the focus into the dialog when opened', async() => {
    await openDialog();

    expect(document.activeElement).toBe(query('#action'));
  });

  it('should focus the close button first when it is shown', async() => {
    host.showCloseButton = true;
    await render();
    await openDialog();

    expect(document.activeElement).toBe(query('.ids-dialog-close-button'));
  });

  it('should restore the focus to the opener when closed', async() => {
    const trigger = element.querySelector<HTMLButtonElement>('#trigger')!;
    trigger.focus();
    await openDialog();
    expect(document.activeElement).not.toBe(trigger);

    host.dialog().close();
    await render();

    expect(document.activeElement).toBe(trigger);
  });

  it('should keep the keyboard focus inside the dialog while it is open', async() => {
    host.showCloseButton = true;
    await render();
    await openDialog();

    expect(query('.cdk-dialog-container')!.contains(document.activeElement)).toBe(true);
  });

  it('should hide the decorative close icon from assistive technologies', async() => {
    host.showCloseButton = true;
    await render();
    await openDialog();

    const icon = query('.ids-dialog-close-button ids-icon')!;
    expect(icon.getAttribute('aria-hidden')).toBe('true');
  });

  it('should have no axe violations with the default header', async() => {
    await openDialog();

    expect(await axe(overlayContainer())).toHaveNoViolations();
  });

  it('should have no axe violations with a subtitle', async() => {
    host.subTitle = 'Dialog subtitle';
    await render();
    await openDialog();

    expect(await axe(overlayContainer())).toHaveNoViolations();
  });
});

describe('IdsDialogComponent default configuration', () => {
  it('should use the default configuration', async() => {
    await TestBed.configureTestingModule({ imports: [DefaultsHostComponent] }).compileComponents();
    const defaultsFixture = TestBed.createComponent(DefaultsHostComponent);
    await renderAll(defaultsFixture);

    defaultsFixture.componentInstance.dialog().open();
    await renderAll(defaultsFixture);

    expect(query('.ids-dialog-compact.ids-dialog-with-backdrop')).not.toBeNull();
    expect(query('.ids-dialog-close-button')).toBeNull();
    expect((defaultsFixture.nativeElement as HTMLElement).querySelector('dialog')?.id).toBe('default-dialog');
  });

  it('should use a provided configuration', async() => {
    await TestBed.configureTestingModule({
      imports: [DefaultsHostComponent],
      providers: [
        {
          provide: IDS_DIALOG_DEFAULT_CONFIG,
          useValue: {
            size: IdsSize.COMFORTABLE,
            showCloseButton: true,
            isCloseButtonDisabled: true,
            showBackdrop: false,
          },
        },
      ],
    }).compileComponents();
    const defaultsFixture = TestBed.createComponent(DefaultsHostComponent);
    await renderAll(defaultsFixture);

    defaultsFixture.componentInstance.dialog().open();
    await renderAll(defaultsFixture);

    expect(query('.ids-dialog-comfortable')).not.toBeNull();
    expect(query('.ids-dialog-with-backdrop')).toBeNull();
    expect(query<HTMLButtonElement>('.ids-dialog-close-button')?.disabled).toBe(true);
  });
});

let service: IdsDialogService;
let serviceFixture: ComponentFixture<DefaultsHostComponent>;

async function renderService(): Promise<void> {
  await renderAll(serviceFixture);
}

async function createService(): Promise<void> {
  await TestBed.configureTestingModule({
    imports: [
      DefaultsHostComponent,
      CustomDialogComponent,
    ],
  }).compileComponents();

  service = TestBed.inject(IdsDialogService);
  serviceFixture = TestBed.createComponent(DefaultsHostComponent);
  await renderService();
}

describe('IdsDialogService', () => {
  beforeEach(createService);

  it('should open a component in an overlay panel with a backdrop', async() => {
    service.open(CustomDialogComponent).subscribe();
    await renderService();

    const panel = query('.cdk-global-overlay-wrapper .ids-dialog-overlay-panel')!;
    expect(panel.classList.contains('ids-dialog')).toBe(true);
    expect(panel.classList.contains('ids-dialog-with-backdrop')).toBe(true);
    expect(query('.cdk-overlay-backdrop.ids-dialog-backdrop')).not.toBeNull();
  });

  it('should apply the size of the component to the panel', async() => {
    service.open(CustomDialogComponent).subscribe();
    await renderService();

    expect(query('.ids-dialog-overlay-panel.ids-dialog-compact')).not.toBeNull();
  });

  it('should not add a size class when the component has no size', async() => {
    service.open(CustomDialogComponent, {
      providers: [{ provide: IDS_DIALOG_DEFAULT_CONFIG, useValue: {} }],
    }).subscribe();
    await renderService();

    expect(query('.ids-dialog-overlay-panel')).not.toBeNull();
    expect(query('.ids-dialog-overlay-panel.ids-dialog-compact')).toBeNull();
  });

  it('should use a transparent backdrop when the backdrop is turned off', async() => {
    service.open(CustomDialogComponent, { showBackdrop: false }).subscribe();
    await renderService();

    expect(query('.cdk-overlay-backdrop.ids-dialog-transparent-backdrop')).not.toBeNull();
    expect(query('.ids-dialog-overlay-panel.ids-dialog-with-backdrop')).toBeNull();
  });

  it('should keep the backdrop when it is explicitly turned on', async() => {
    service.open(CustomDialogComponent, { showBackdrop: true }).subscribe();
    await renderService();

    expect(query('.cdk-overlay-backdrop.ids-dialog-backdrop')).not.toBeNull();
    expect(query('.ids-dialog-overlay-panel.ids-dialog-with-backdrop')).not.toBeNull();
  });

  it('should set the inputs of the opened component', async() => {
    service.open(CustomDialogComponent, { inputs: { heading: 'From the service' } }).subscribe();
    await renderService();

    expect(query('.ids-dialog-title')?.textContent).toBe('From the service');
  });

  it('should render the dialog inline inside the opened component', async() => {
    service.open(CustomDialogComponent).subscribe();
    await renderService();

    expect(query('ids-dialog .ids-dialog-container')).not.toBeNull();
    expect(query('.ids-dialog-title')?.textContent).toBe('Custom title');
    expect(query('.ids-dialog-subtitle')?.textContent).toBe('Subtitle');
  });

  it('should emit the result when the component closes the dialog', async() => {
    const results: unknown[] = [];
    service.open(CustomDialogComponent).subscribe((result) => results.push(result));
    await renderService();

    query<HTMLButtonElement>('#confirm')!.click();
    await renderService();

    expect(results).toEqual(['confirmed']);
    expect(query('.ids-dialog-container')).toBeNull();
  });

  it('should emit undefined when the close button is clicked', async() => {
    const results: unknown[] = [];
    service.open(CustomDialogComponent).subscribe((result) => results.push(result));
    await renderService();

    query<HTMLButtonElement>('.ids-dialog-close-button')!.click();
    await renderService();

    expect(results).toEqual([undefined]);
  });

  it('should not close with the Escape key or a backdrop click', async() => {
    service.open(CustomDialogComponent).subscribe();
    await renderService();

    query('.ids-dialog-container')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true, cancelable: true }),
    );
    query('.cdk-overlay-backdrop')!.click();
    await renderService();

    expect(query('.ids-dialog-container')).not.toBeNull();
  });
});

describe('IdsDialogService accessibility', () => {
  beforeEach(createService);

  it('should expose the inline dialog as a modal dialog labelled by its title', async() => {
    service.open(CustomDialogComponent).subscribe();
    await renderService();

    const dialog = query('ids-dialog')!;
    expect(dialog.getAttribute('role')).toBe('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(query(`#${dialog.getAttribute('aria-labelledby')}`)?.textContent).toBe('Custom title');
  });
});

describe('IdsDialogService without a component reference', () => {
  const dialogRef = {
    closed: new Subject<unknown>(),
    componentRef: undefined,
    componentInstance: undefined as { size: () => IdsSizeType | undefined } | undefined,
    addPanelClass: jest.fn(),
  };
  const dialogOpen = jest.fn().mockReturnValue(dialogRef);

  beforeEach(() => {
    dialogRef.addPanelClass.mockClear();
    dialogOpen.mockClear();
    TestBed.configureTestingModule({
      providers: [{ provide: Dialog, useValue: { open: dialogOpen } }],
    });
    service = TestBed.inject(IdsDialogService);
  });

  it('should apply the size immediately and ignore the inputs', () => {
    dialogRef.componentInstance = { size: (): IdsSizeType => IdsSize.COMFORTABLE };

    service.open(TestCustomDialog, { inputs: { size: undefined } }).subscribe();

    expect(dialogRef.addPanelClass).toHaveBeenCalledWith('ids-dialog-comfortable');
  });

  it('should not add a class when the size is not resolved', () => {
    dialogRef.componentInstance = { size: (): undefined => undefined };

    service.open(TestCustomDialog).subscribe();

    expect(dialogRef.addPanelClass).not.toHaveBeenCalled();
  });

  it('should not add a class when there is no component instance', () => {
    dialogRef.componentInstance = undefined;

    service.open(TestCustomDialog).subscribe();

    expect(dialogRef.addPanelClass).not.toHaveBeenCalled();
  });
});

describe('IdsCustomDialogBase', () => {
  it('should expose the default size', () => {
    const dialog = TestBed.runInInjectionContext(() => new TestCustomDialog());

    expect(dialog.size()).toBe(IdsSize.COMPACT);
  });

  it('should not throw when closed without a dialog reference', () => {
    const dialog = TestBed.runInInjectionContext(() => new TestCustomDialog());

    expect(() => dialog.close('result')).not.toThrow();
  });
});
