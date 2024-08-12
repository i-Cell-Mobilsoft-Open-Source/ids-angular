import { Overlay, RepositionScrollStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { inject, InjectionToken } from '@angular/core';

export const SCROLL_THROTTLE_MS = 20;

export const IDS_TOOLTIP_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>(
  'ids-tooltip-scroll-strategy',
{
  providedIn: 'root',
  factory: () => {
    const overlay = inject(Overlay);
    return (): RepositionScrollStrategy => overlay.scrollStrategies.reposition({ scrollThrottle: SCROLL_THROTTLE_MS });
  },
},
);

/** @docs-private */
export function IDS_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition({ scrollThrottle: SCROLL_THROTTLE_MS });
}

/** @docs-private */
export const IDS_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: IDS_TOOLTIP_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: IDS_TOOLTIP_SCROLL_STRATEGY_FACTORY,
};
