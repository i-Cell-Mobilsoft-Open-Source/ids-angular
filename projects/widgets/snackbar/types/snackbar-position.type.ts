export const IdsSnackbarPosition = {
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  TOP_CENTER: 'top-center',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
} as const;

export type IdsSnackbarPositionType = (typeof IdsSnackbarPosition)[keyof typeof IdsSnackbarPosition];
