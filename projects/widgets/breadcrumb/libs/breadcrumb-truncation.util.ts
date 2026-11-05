import { IdsBreadcrumbWidthsType } from '../types/breadcrumb-widths.type';

const WIDTH_TOLERANCE = 0.5;

// Returns the index of the first visible item
export function calcTruncationIndex(widths: IdsBreadcrumbWidthsType, itemCount: number, availableWidth: number): number {
  const { gap, trigger, divider, content } = widths;
  let contentWidth = content.reduce((total, width) => total + width, 0) + gap * (content.length - 1);
  if (itemCount < 2 || contentWidth <= availableWidth) {
    return 0;
  }

  const prefixWidth = trigger + divider + gap * 2;
  for (let index = 0; index < itemCount - 1; index++) {
    contentWidth -= content[index * 2] + content[index * 2 + 1] + gap * 2;
    if (prefixWidth + contentWidth <= availableWidth) {
      return index + 1;
    }
  }
  return itemCount - 1;
}

// Cached widths are stale if a rendered element is no longer as wide as it was measured
export function areWidthsStale(widths: IdsBreadcrumbWidthsType, renderedWidths: number[], truncationIndex: number): boolean {
  const offset = truncationIndex > 0 ? 2 : 0;
  if (offset && Math.abs(renderedWidths[0] - widths.trigger) > WIDTH_TOLERANCE) {
    return true;
  }
  return renderedWidths
    .slice(offset)
    .some((width, i) => Math.abs(width - widths.content[truncationIndex * 2 + i]) > WIDTH_TOLERANCE);
}
