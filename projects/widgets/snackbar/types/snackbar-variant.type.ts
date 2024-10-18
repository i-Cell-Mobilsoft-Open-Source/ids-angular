export const IdsSnackbarVariant = {
  DARK: 'dark',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

export type IdsSnackbarVariantType = (typeof IdsSnackbarVariant)[keyof typeof IdsSnackbarVariant];
