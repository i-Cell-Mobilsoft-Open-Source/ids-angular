export const IdsSideNavAppearance = {
  STANDARD: 'standard',
} as const;

export type IdsSideNavAppearanceType = (typeof IdsSideNavAppearance)[keyof typeof IdsSideNavAppearance];
