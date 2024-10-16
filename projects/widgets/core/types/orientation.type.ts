export const IdsOrientation = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
} as const;

export type IdsOrientationType = (typeof IdsOrientation)[keyof typeof IdsOrientation];
