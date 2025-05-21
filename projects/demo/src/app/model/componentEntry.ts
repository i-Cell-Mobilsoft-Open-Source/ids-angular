export interface ComponentEntry {
  id: string;
  title: string;
  slug: string;
  comp_description: string;
  comp_img_light_mode?: { url: string }[];
  comp_img_dark_mode?: { url: string }[];
  content: ComponentContent[];
}

export type ComponentContent = SetContentCard | SetContentHeading;

export interface SetContentCard {
  __typename: 'Set_Content_Card';
  type: 'card';
  id: string;
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
    card_orientation?: { value: 'horizontal' | 'vertical' };
    card_variant?: { value: 'surface' | 'light' | 'dark' };
  };
  group_image?: {
    img_caption?: string;
    img_light_mode?: { url: string }[];
    img_dark_mode?: { url: string }[];
  };
}

export interface SetContentHeading {
  __typename: 'Set_Content_Heading';
  type: 'heading';
  heading: string;
}
