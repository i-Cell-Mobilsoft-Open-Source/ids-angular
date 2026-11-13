/* eslint-disable no-magic-numbers -- the specs are driven by concrete pixel widths */
import { areWidthsStale, calcTruncationIndex } from './breadcrumb-truncation.util';

import { IdsBreadcrumbWidthsType } from '../types/breadcrumb-widths.type';

// Four items: [Home, divider, Products, divider, Phones, divider, Details]; the content takes 304 pixels including the gaps.
const widths: IdsBreadcrumbWidthsType = {
  gap: 4,
  trigger: 30,
  divider: 10,
  content: [
    40,
    10,
    80,
    10,
    60,
    10,
    70,
  ],
};
const itemCount = 4;

describe('calcTruncationIndex', () => {
  it('should not truncate fewer than two items', () => {
    expect(calcTruncationIndex({ ...widths, content: [40] }, 1, 10)).toBe(0);
  });

  it('should not truncate when the content fits', () => {
    expect(calcTruncationIndex(widths, itemCount, 304)).toBe(0);
    expect(calcTruncationIndex(widths, itemCount, 400)).toBe(0);
  });

  it('should hide the first item when it is enough', () => {
    expect(calcTruncationIndex(widths, itemCount, 300)).toBe(1);
  });

  it('should hide as many items as needed', () => {
    expect(calcTruncationIndex(widths, itemCount, 200)).toBe(2);
  });

  it('should keep only the last item when nothing else fits', () => {
    expect(calcTruncationIndex(widths, itemCount, 100)).toBe(itemCount - 1);
  });
});

describe('areWidthsStale', () => {
  const rendered = [...widths.content];

  it('should not be stale when every width matches', () => {
    expect(areWidthsStale(widths, rendered, 0)).toBe(false);
  });

  it('should tolerate a sub-pixel difference', () => {
    expect(areWidthsStale(widths, rendered.map((width) => width + 0.4), 0)).toBe(false);
  });

  it('should be stale when an item width changed', () => {
    expect(areWidthsStale(widths, rendered.map((width, index) => (index === 2 ? width + 1 : width)), 0)).toBe(true);
  });

  describe('when the first items are truncated', () => {
    const truncated = [
      widths.trigger,
      widths.divider,
      ...widths.content.slice(4),
    ];

    it('should not be stale when every width matches', () => {
      expect(areWidthsStale(widths, truncated, 2)).toBe(false);
    });

    it('should be stale when the trigger width changed', () => {
      expect(areWidthsStale(widths, truncated.map((width, index) => (index === 0 ? width + 1 : width)), 2)).toBe(true);
    });

    it('should be stale when a visible item width changed', () => {
      expect(areWidthsStale(widths, truncated.map((width, index) => (index === 2 ? width + 1 : width)), 2)).toBe(true);
    });
  });
});
