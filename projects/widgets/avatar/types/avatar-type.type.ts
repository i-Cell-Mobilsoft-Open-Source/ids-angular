export const AvatarType = {
  INITIALS: 'initials',
  ICON: 'icon',
  IMAGE: 'image',
} as const;

export type AvatarTypeType = (typeof AvatarType)[keyof typeof AvatarType];
