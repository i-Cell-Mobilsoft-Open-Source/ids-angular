import { ContentCardData } from './contentCardData';
export type ContentBlock = { type: 'heading'; heading: string } | (ContentCardData & { type: 'card' });

export interface ContentEntry {
  id?: string;
  title?: string;
  hero_description?: string;
  hero_image_light?: { url?: string; };
  hero_image_dark?: { url?: string; };
  date?: string;
  tags?: Array<{
    id?: number;
    title?: string;
  }>;
  author?: {
    name?: string;
    id?: string;
    avatar?: { url?: string };
  };
  contentBlocks?: ContentContent[];
  content?: ContentContent[];
}

export type ContentContent = SetContentCard | SetContentHeading;

export interface SetContentCard {
  __typename: 'Set_Content_Card';
  type: 'card';
  id: string;
  content_heading?: string;
  content: {
    content_over_title: string;
    content_title: string;
    content_description: string;
  };
  button?: {
    button?: {
      button_url?: string;
      button_label?: string;
    };
  };
  card_properties?: {
    card_bg_transparent?: boolean;
    card_orientation?: { value: 'horizontal' | 'vertical' };
    card_variant?: { value: 'surface' | 'light' | 'dark' };
    appearance?: { value: 'filled' | 'elevated' };
  };
  group_image?: {
    img_caption?: string;
    img_light_mode?: { url: string }[];
    img_dark_mode?: { url: string }[];
    img_aspect_ratio?: { value: '1/1' | '16/9' | '16/10' };
    img_bg_color?: { value: 'surface' | 'primary' | 'light' };
    bg_transparent?: boolean;
    filled_in_container?: boolean;
    state?: { value: 'do' | 'dont' | 'no_state' };
  };
}

export interface SetContentHeading {
  __typename: 'Set_Content_Heading';
  type: 'heading';
  heading: string;
}
