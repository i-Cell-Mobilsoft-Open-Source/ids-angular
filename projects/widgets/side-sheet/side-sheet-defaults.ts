import {
  IdsBackdropType,
  IdsBackdropTypeType,
  IdsSideSheetHeader,
  IdsSideSheetHeaderType, IdsSideSheetPosition,
  IdsSideSheetPositionType, IdsSideSheetType,
  IdsSideSheetTypeType,
} from './types/side-sheet.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsSideSheetDefaultConfig {
  type: IdsSideSheetTypeType
  position: IdsSideSheetPositionType
  header: IdsSideSheetHeaderType
  isScrollable: boolean
  isBackdrop: boolean
  backdropType: IdsBackdropTypeType
  backdropOpacity: IdsSizeType
  isClosable: boolean
  isShowFooter: boolean
  isShowHeader: boolean
  isStatic: boolean
  closeTooltipText: string
  size: IdsSizeType
}

export const IDS_SIDE_SHEET_DEFAULT_CONFIG = new InjectionToken<IdsSideSheetDefaultConfig>(
  'IDS_SIDE_SHEET_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY(): Required<IdsSideSheetDefaultConfig> {
  return {
    type: IdsSideSheetType.INLINE,
    position: IdsSideSheetPosition.LEFT,
    header: IdsSideSheetHeader.DEFAULT,
    isScrollable: false,
    isBackdrop: true,
    backdropType: IdsBackdropType.DEFAULT,
    backdropOpacity: IdsSize.COMPACT,
    isClosable: true,
    isShowFooter: true,
    isShowHeader: true,
    isStatic: false,
    closeTooltipText: '',
    size: IdsSize.COMPACT,
  };
};
