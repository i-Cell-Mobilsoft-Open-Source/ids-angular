export const ButtonAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  TEXT: 'text'
} as const;

export type ButtonAppearanceType = (typeof ButtonAppearance)[keyof typeof ButtonAppearance];

export const IconButtonAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  STANDARD: 'standard'
} as const;

export type IconButtonAppearanceType = (typeof IconButtonAppearance)[keyof typeof IconButtonAppearance];

export const ActionPanelAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  ELEVATED: 'elevated'
} as const;

export type ActionPanelAppearanceType = (typeof ActionPanelAppearance)[keyof typeof ActionPanelAppearance];

export const ActionItemAppearance = {
  FILLED: 'filled',
  TEXT: 'text'
} as const;

export type ActionItemAppearanceType = (typeof ActionItemAppearance)[keyof typeof ActionItemAppearance];

export const TagAppearance = {
  FILLED: 'filled',
  OUTLINED: 'outlined'
} as const;

export type TagAppearanceType = (typeof TagAppearance)[keyof typeof TagAppearance];
