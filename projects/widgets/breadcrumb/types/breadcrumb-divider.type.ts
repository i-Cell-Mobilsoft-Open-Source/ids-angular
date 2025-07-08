export const IdsBreadcrumbDivider = {
  FORESLASH: 'foreslash',
  ICON: 'icon',
} as const;

export type IdsBreadcrumbDividerType = (typeof IdsBreadcrumbDivider)[keyof typeof IdsBreadcrumbDivider];
