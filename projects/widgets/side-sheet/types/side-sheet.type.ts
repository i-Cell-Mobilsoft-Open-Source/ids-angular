export const IdsSideSheetType = {
  OVERLAY: 'overlay',
  INLINE: 'inline',
} as const;

export type IdsSideSheetTypeType = (typeof IdsSideSheetType)[keyof typeof IdsSideSheetType];

export const IdsSideSheetPosition = {
  START: 'start',
  END: 'end',
} as const;

export type IdsSideSheetPositionType = (typeof IdsSideSheetPosition)[keyof typeof IdsSideSheetPosition];

export const IdsSideSheetHeader = {
  DEFAULT: 'default',
  CUSTOM: 'custom',
} as const;

export type IdsSideSheetHeaderType = (typeof IdsSideSheetHeader)[keyof typeof IdsSideSheetHeader];
