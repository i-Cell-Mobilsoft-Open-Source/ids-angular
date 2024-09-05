export const SnackbarVariant = {
  DARK: 'dark',
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
} as const;

export type SnackbarVariantType = (typeof SnackbarVariant)[keyof typeof SnackbarVariant];
