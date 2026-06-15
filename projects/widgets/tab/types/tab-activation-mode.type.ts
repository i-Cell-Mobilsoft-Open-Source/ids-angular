export const IdsTabActivationMode = {
  MANUAL: 'manual',
  AUTOMATIC: 'automatic',
} as const;

export type IdsTabActivationModeType = (typeof IdsTabActivationMode)[keyof typeof IdsTabActivationMode];
