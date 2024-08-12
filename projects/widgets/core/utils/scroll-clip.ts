import { PositionType } from '../types/position.type';

import { CdkScrollable } from '@angular/cdk/scrolling';

export type DOMRectBase = Omit<DOMRect, 'x' | 'y' | 'toJSON'>;

export function elementOutsideViewFrom(elementRect: DOMRectBase, scrollContainers: CdkScrollable[]): Set<PositionType> | null {
  const outsideFrom: Set<PositionType> = new Set();
  scrollContainers.forEach((scrollContainer) => {
    const scrollContainerRect = scrollContainer.getElementRef().nativeElement.getBoundingClientRect();
    if (elementRect.bottom < scrollContainerRect.top) {
      outsideFrom.add('top');
    }
    if (elementRect.top > scrollContainerRect.bottom) {
      outsideFrom.add('bottom');
    }
    if (elementRect.right < scrollContainerRect.left) {
      outsideFrom.add('left');
    }
    if (elementRect.left > scrollContainerRect.right) {
      outsideFrom.add('right');
    }
  });

  if (outsideFrom.size === 0) {
    return null;
  }

  return outsideFrom;
}

export function elementClippedFrom(elementRect: DOMRectBase, scrollContainers: CdkScrollable[]): Set<PositionType> | null {
  const clippedFrom: Set<PositionType> = new Set();
  scrollContainers.forEach((scrollContainer) => {
    const scrollContainerRect = scrollContainer.getElementRef().nativeElement.getBoundingClientRect();
    if (elementRect.top < scrollContainerRect.top) {
      clippedFrom.add('top');
    }
    if (elementRect.bottom > scrollContainerRect.bottom) {
      clippedFrom.add('bottom');
    }
    if (elementRect.left < scrollContainerRect.left) {
      clippedFrom.add('left');
    }
    if (elementRect.right > scrollContainerRect.right) {
      clippedFrom.add('right');
    }
  });

  if (clippedFrom.size === 0) {
    return null;
  }

  return clippedFrom;
}
