export const IdsIconFontSet = {
  IDS_BASE: 'idsbase',
  DEFAULT: 'default',
  UNIQUE: 'unique',
} as const;

export type IdsIconFontSetType = (typeof IdsIconFontSet)[keyof typeof IdsIconFontSet];
