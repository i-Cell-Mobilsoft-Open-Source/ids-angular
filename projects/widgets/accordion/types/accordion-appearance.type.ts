export const IdsAccordionAppearance = {
  FILLED: 'filled',
  TEXT: 'text',
} as const;

export type IdsAccordionAppearanceType = (typeof IdsAccordionAppearance)[keyof typeof IdsAccordionAppearance];
