export const IdsIconFontSet = {
  IDS_BASE: 'idsBase',
  DEFAULT: 'default',
  UNIQUE: 'unique',
} as const;

export type IdsIconFontSetType = (typeof IdsIconFontSet)[keyof typeof IdsIconFontSet];
