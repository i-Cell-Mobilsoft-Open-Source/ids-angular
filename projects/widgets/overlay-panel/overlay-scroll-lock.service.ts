import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ElementRef, Injectable } from '@angular/core';

export const scrollLockTargetClass = 'ids-overlay-panel-scroll-lock-target';
export const scrollBlockedClass = 'ids-overlay-panel-scroll-blocked';

export type IdsOverlayScrollLockOrigin = CdkOverlayOrigin | ElementRef<HTMLElement> | HTMLElement;

export type IdsOverlayScrollLock = {
  unlock(): void;
};

type LockedElement = {
  element: HTMLElement;
  scrollLeft: number;
  scrollTop: number;
  scrollListener: EventListener;
  touchMoveListener: EventListener;
  wheelListener: EventListener;
};

type LockedElementStyle = {
  overflow: string;
  overflowX: string;
  overflowY: string;
};

@Injectable({
  providedIn: 'root',
})
export class IdsOverlayScrollLockService {
  private readonly _scrollLockCounters = new WeakMap<HTMLElement, number>();
  private readonly _scrollLockTargetCounters = new WeakMap<HTMLElement, number>();
  private readonly _scrollLockStyles = new WeakMap<HTMLElement, LockedElementStyle>();

  public getScrollableAncestors(origin: IdsOverlayScrollLockOrigin): HTMLElement[] {
    const scrollableAncestors: HTMLElement[] = [];
    const originElement = this.getOriginElement(origin);
    const body = originElement.ownerDocument.body;
    let currentElement = originElement.parentElement;

    while (currentElement && currentElement !== body) {
      if (this.isScrollable(currentElement)) {
        scrollableAncestors.push(currentElement);
      }

      currentElement = currentElement.parentElement;
    }

    return scrollableAncestors;
  }

  public getOriginElement(origin: IdsOverlayScrollLockOrigin): HTMLElement {
    if (origin instanceof CdkOverlayOrigin) {
      return origin.elementRef.nativeElement;
    }

    return origin instanceof ElementRef ? origin.nativeElement : origin;
  }

  public isScrollable(element: HTMLElement): boolean {
    const style = getComputedStyle(element);
    const scrollableOverflowValues = [
      'auto',
      'scroll',
      'overlay',
    ];
    const overflowXIsScrollable =
      scrollableOverflowValues.includes(style.overflowX) && element.scrollWidth > element.clientWidth;
    const overflowYIsScrollable =
      scrollableOverflowValues.includes(style.overflowY) && element.scrollHeight > element.clientHeight;

    return overflowXIsScrollable || overflowYIsScrollable;
  }

  public markScrollLockTargets(elements: HTMLElement[]): void {
    elements.forEach((element) => this._markScrollLockTarget(element));
  }

  public unmarkScrollLockTargets(elements: HTMLElement[]): void {
    elements.forEach((element) => this._unmarkScrollLockTarget(element));
  }

  public lockMarkedTargets(elements: HTMLElement[]): IdsOverlayScrollLock {
    const lockedElements = elements
      .filter((element) => element.classList.contains(scrollLockTargetClass))
      .map((element) => this._createLockedElement(element));

    lockedElements.forEach((lockedElement) => this._lockElement(lockedElement));

    return {
      unlock: () => lockedElements.forEach((lockedElement) => this._unlockElement(lockedElement)),
    };
  }

  private _markScrollLockTarget(element: HTMLElement): void {
    const lockTargetCount = this._scrollLockTargetCounters.get(element) ?? 0;

    if (lockTargetCount === 0) {
      element.classList.add(scrollLockTargetClass);
    }

    this._scrollLockTargetCounters.set(element, lockTargetCount + 1);
  }

  private _unmarkScrollLockTarget(element: HTMLElement): void {
    const lockTargetCount = this._scrollLockTargetCounters.get(element) ?? 0;

    if (lockTargetCount <= 1) {
      element.classList.remove(scrollLockTargetClass);
      this._scrollLockTargetCounters.delete(element);

      return;
    }

    this._scrollLockTargetCounters.set(element, lockTargetCount - 1);
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
    const lockCount = this._scrollLockCounters.get(element) ?? 0;

    if (lockCount === 0) {
      this._scrollLockStyles.set(element, {
        overflow: element.style.overflow,
        overflowX: element.style.overflowX,
        overflowY: element.style.overflowY,
      });
      element.classList.add(scrollBlockedClass);
      element.style.overflow = 'hidden';
      element.style.overflowX = 'hidden';
      element.style.overflowY = 'hidden';
    }

    element.addEventListener('scroll', lockedElement.scrollListener);
    element.addEventListener('touchmove', lockedElement.touchMoveListener, { passive: false });
    element.addEventListener('wheel', lockedElement.wheelListener, { passive: false });
    this._scrollLockCounters.set(element, lockCount + 1);
  }

  private _unlockElement(lockedElement: LockedElement): void {
    const element = lockedElement.element;
    const lockCount = this._scrollLockCounters.get(element) ?? 0;

    element.removeEventListener('scroll', lockedElement.scrollListener);
    element.removeEventListener('touchmove', lockedElement.touchMoveListener);
    element.removeEventListener('wheel', lockedElement.wheelListener);

    if (lockCount <= 1) {
      const previousStyle = this._scrollLockStyles.get(element);

      if (previousStyle) {
        element.style.overflow = previousStyle.overflow;
        element.style.overflowX = previousStyle.overflowX;
        element.style.overflowY = previousStyle.overflowY;
        this._scrollLockStyles.delete(element);
      }

      element.classList.remove(scrollBlockedClass);
      this._scrollLockCounters.delete(element);

      return;
    }

    this._scrollLockCounters.set(element, lockCount - 1);
  }
}
