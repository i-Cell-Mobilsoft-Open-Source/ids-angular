import { TooltipPosition, TooltipPositionType } from './types/tooltip-position';
import { TooltipVariant, TooltipVariantType } from './types/tooltip-variant';

import { InjectionToken } from '@angular/core';
import { SizeType, Size } from '@i-cell/ids-angular/core';

const DEFAULT_SHOW_DELAY = 0;
const DEFAULT_HIDE_DELAY = 1_000;
const DEFAULT_VIEWPORT_MARGIN = 8;
const DEFAULT_LONGPRESS_DELAY = 500;
const DEFAULT_TOUCHEND_HIDE_DELAY = 1500;
const DEFAULT_SCROLL_DEBOUNCE_TIME = 20;

export interface IdsTooltipDefaultConfig {
  position?: TooltipPositionType
  size?: SizeType
  variant?: TooltipVariantType
  showDelay?: number
  hideDelay?: number
  touchLongPressShowDelay?: number
  viewPortMargin?: number
  touchendHideDelay?: number
  scrollDebounceTime?: number
}

export const IDS_TOOLTIP_DEFAULT_CONFIG = new InjectionToken<IdsTooltipDefaultConfig>(
  'IDS_TOOLTIP_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_TOOLTIP_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_TOOLTIP_DEFAULT_CONFIG_FACTORY(): Required<IdsTooltipDefaultConfig> {
  return {
    position: TooltipPosition.NORTH,
    size: Size.COMFORTABLE,
    variant: TooltipVariant.DARK,
    showDelay: DEFAULT_SHOW_DELAY,
    hideDelay: DEFAULT_HIDE_DELAY,
    touchLongPressShowDelay: DEFAULT_LONGPRESS_DELAY,
    viewPortMargin: DEFAULT_VIEWPORT_MARGIN,
    touchendHideDelay: DEFAULT_TOUCHEND_HIDE_DELAY,
    scrollDebounceTime: DEFAULT_SCROLL_DEBOUNCE_TIME,
  };
}