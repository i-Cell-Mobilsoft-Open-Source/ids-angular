export const IdsTableDetailTriggerMode = {
  DEFAULT: 'default',
  CUSTOM: 'custom',
} as const;

export type IdsTableDetailTriggerModeType = (typeof IdsTableDetailTriggerMode)[keyof typeof IdsTableDetailTriggerMode];
