export const AccordionAppearance = {
  FILLED: 'filled',
  TEXT: 'text',
} as const;

export type AccordionAppearanceType = (typeof AccordionAppearance)[keyof typeof AccordionAppearance];
