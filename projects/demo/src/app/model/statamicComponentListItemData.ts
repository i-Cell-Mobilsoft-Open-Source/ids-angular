export interface StatamicComponentListItem {
  id: string | number;
  title: string;
  slug: string;
  comp_img_light_mode: Array<{ url?: string }>;
  comp_img_dark_mode: Array<{ url?: string }>;
  comp_description: string;
}
