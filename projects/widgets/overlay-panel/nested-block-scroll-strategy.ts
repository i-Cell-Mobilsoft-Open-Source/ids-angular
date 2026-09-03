import { OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';

export const scrollLockTargetClass = 'ids-overlay-panel-scroll-lock-target';
export const scrollBlockedClass = 'ids-overlay-panel-scroll-blocked';

const scrollLockCounters = new WeakMap<HTMLElement, number>();
const scrollLockTargetCounters = new WeakMap<HTMLElement, number>();

type LockedElement = {
  element: HTMLElement;
  scrollLeft: number;
  scrollTop: number;
  scrollListener: EventListener;
  touchMoveListener: EventListener;
  wheelListener: EventListener;
};

export class IdsNestedBlockScrollStrategy implements ScrollStrategy {
  private _overlayRef?: OverlayRef;
  private _scrollLockTargets: HTMLElement[] = [];
  private _lockedElements: LockedElement[] = [];
  private _enabled = false;

  constructor(private readonly _blockScrollStrategy: ScrollStrategy) {}

  public attach(overlayRef: OverlayRef): void {
    this._overlayRef = overlayRef;
    this._blockScrollStrategy.attach(overlayRef);
  }

  public enable(): void {
    this._enabled = true;
    this._blockScrollStrategy.enable();
    this._lockMarkedElements();
  }

  public disable(): void {
    this._enabled = false;
    this._unlockElements();
    this._blockScrollStrategy.disable();
  }

  public refresh(): void {
    if (!this._enabled) {
      return;
    }

    this._unlockElements();
    this._lockMarkedElements();
  }

  public setScrollLockTargets(scrollLockTargets: HTMLElement[]): void {
    this._scrollLockTargets = scrollLockTargets;

    if (this._enabled) {
      this.refresh();
    }
  }

  public detach(): void {
    this.disable();
    this._blockScrollStrategy.detach?.();
    this._overlayRef = undefined;
  }

  private _lockMarkedElements(): void {
    if (!this._overlayRef) {
      return;
    }

    this._lockedElements = this._scrollLockTargets
      .filter((element) => element.classList.contains(scrollLockTargetClass))
      .map((element) => this._createLockedElement(element));
    this._lockedElements.forEach((element) => this._lockElement(element));
  }

  private _unlockElements(): void {
    this._lockedElements.forEach((lockedElement) => this._unlockElement(lockedElement));
    this._lockedElements = [];
  }

  private _createLockedElement(element: HTMLElement): LockedElement {
    const lockedElement: LockedElement = {
      element,
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
      scrollListener: () => {
        element.scrollLeft = lockedElement.scrollLeft;
        element.scrollTop = lockedElement.scrollTop;
      },
      touchMoveListener: (event) => event.preventDefault(),
      wheelListener: (event) => event.preventDefault(),
    };

    return lockedElement;
  }

  private _lockElement(lockedElement: LockedElement): void {
    const element = lockedElement.element;
    const lockCount = scrollLockCounters.get(element) ?? 0;

    if (lockCount === 0) {
      element.classList.add(scrollBlockedClass);
    }

    element.addEventListener('scroll', lockedElement.scrollListener);
    element.addEventListener('touchmove', lockedElement.touchMoveListener, { passive: false });
    element.addEventListener('wheel', lockedElement.wheelListener, { passive: false });
    scrollLockCounters.set(element, lockCount + 1);
  }

  private _unlockElement(lockedElement: LockedElement): void {
    const element = lockedElement.element;
    const lockCount = scrollLockCounters.get(element) ?? 0;

    element.removeEventListener('scroll', lockedElement.scrollListener);
    element.removeEventListener('touchmove', lockedElement.touchMoveListener);
    element.removeEventListener('wheel', lockedElement.wheelListener);

    if (lockCount <= 1) {
      element.classList.remove(scrollBlockedClass);
      scrollLockCounters.delete(element);

      return;
    }

    scrollLockCounters.set(element, lockCount - 1);
  }
}

export function markScrollLockTarget(element: HTMLElement): void {
  const lockTargetCount = scrollLockTargetCounters.get(element) ?? 0;

  if (lockTargetCount === 0) {
    element.classList.add(scrollLockTargetClass);
  }

  scrollLockTargetCounters.set(element, lockTargetCount + 1);
}

export function unmarkScrollLockTarget(element: HTMLElement): void {
  const lockTargetCount = scrollLockTargetCounters.get(element) ?? 0;

  if (lockTargetCount <= 1) {
    element.classList.remove(scrollLockTargetClass);
    scrollLockTargetCounters.delete(element);

    return;
  }

  scrollLockTargetCounters.set(element, lockTargetCount - 1);
}
