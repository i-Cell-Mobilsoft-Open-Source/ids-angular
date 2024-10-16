export const IdsAvatarType = {
  INITIALS: 'initials',
  ICON: 'icon',
  IMAGE: 'image',
} as const;

export type IdsAvatarTypeType = (typeof IdsAvatarType)[keyof typeof IdsAvatarType];
