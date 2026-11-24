import { StatamicNavsField } from '../services/graphql.service';

export interface EntryData {
  title?: string;
  hero_description?: string;
  hero_image_light?: { url?: string };
  hero_image_dark?: { url?: string };
  navs_field?: StatamicNavsField[];
}
