export const IdsSnackbarVariant = {
  DARK: 'dark',
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
} as const;

export type IdsSnackbarVariantType = (typeof IdsSnackbarVariant)[keyof typeof IdsSnackbarVariant];
