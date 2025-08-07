export const IdsSideSheetType = {
  OVERLAY: 'overlay',
  INLINE: 'inline',
} as const;

export type IdsSideSheetTypeType = (typeof IdsSideSheetType)[keyof typeof IdsSideSheetType];

export const IdsSideSheetPosition = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type IdsSideSheetPositionType = (typeof IdsSideSheetPosition)[keyof typeof IdsSideSheetPosition];

export const IdsSideSheetHeader = {
  DEFAULT: 'default',
  CUSTOM: 'custom',
} as const;

export const IdsBackdropType = {
  DEFAULT: 'default',
  TRANSPARENT: 'transparent',
} as const;

export type IdsBackdropTypeType = (typeof IdsBackdropType)[keyof typeof IdsBackdropType];

export type IdsSideSheetHeaderType = (typeof IdsSideSheetHeader)[keyof typeof IdsSideSheetHeader];
