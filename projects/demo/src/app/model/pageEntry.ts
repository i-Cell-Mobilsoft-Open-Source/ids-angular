export interface ComponentEntry {
  id: string;
  title: string;
  slug: string;
  hero_description: string;
  hero?: {
    hero_description: string;
  }
  comp_img_light_mode?: { url: string }[];
  comp_img_dark_mode?: { url: string }[];
  content: ComponentContent[];
}

export interface PageEntry {
  id: string;
  title: string;
  slug: string;
  hero_description: string;
  hero?: {
    hero_description: string;
  }
  hero_image_light?: { url: string };
  hero_image_dark?: { url: string };
  content: ComponentContent[];
}

export type ComponentContent = SetContentCard | SetContentHeading;

export interface SetContentCard {
  __typename: 'Set_Content_Card';
  type: 'card';
  id: string;
  content_heading?: string;
  filled_in_container?: boolean;
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
    appearance?: { value: 'filled' | 'elevated' };
    card_bg_transparent ?: boolean;
    card_orientation?: { value: 'horizontal' | 'vertical' };
    card_variant?: { value: 'surface' | 'light' | 'dark' };
  };
  group_image?: {
    filled_in_container?: boolean;
    img_caption?: string;
    img_light_mode?: { url: string }[];
    img_dark_mode?: { url: string }[];
    img_aspect_ratio?: { value: '1/1' | '16/9' | '16/10' };
    img_bg_color?: { value: 'surface' | 'primary' | 'light' };
    bg_transparent?: boolean;
    state?: { value: 'do' | 'dont' | 'no_state' };
  };
}

export interface SetContentHeading {
  __typename: 'Set_Content_Heading';
  type: 'heading';
  heading: string;
}
