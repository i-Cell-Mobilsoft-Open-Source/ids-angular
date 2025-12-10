import { ComponentData } from '../model/componentData';

export interface EntryData {
  title?: string;
  hero_description?: string;
  hero_image_light?: { url?: string };
  hero_image_dark?: { url?: string };
  navs_field?: Array<{
    tree?: Array<{
      children?: Array<{
        children?: Array<{
          page?: ComponentData;
        }>;
      }>;
    }>;
  }>;
}
