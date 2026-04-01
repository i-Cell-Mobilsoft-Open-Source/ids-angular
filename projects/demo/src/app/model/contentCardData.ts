export interface ContentCardData {
  variant?: 'surface' | 'light' | 'dark';
  id?: number;
  orientation: 'horizontal' | 'vertical';
  aspectRatio?: '1/1' | '16/9' | '16/10';
  image?: {
    lightUrl?: string;
    darkUrl?: string;
    caption?: string;
    bgColorVariant?: 'surface' | 'primary' | 'light';
    bgTransparent?: boolean;
    filledInContainer?: boolean;
    state?: 'no_state' | 'do' | 'dont';
  };
  isImage?: boolean;
  isButton?: boolean;
  imageURL?: string;
  imageUrlLight?: string;
  imageUrlDark?: string;
  imageBgColorVariant?: 'surface' | 'primary' | 'light';
  imageCaption?: string;
  overTitle?: string;
  title?: string;
  description?: string;
  caption?: string;
  buttonOne?: string;
  buttonOneUrl?: string;
  buttonTwo?: string;
  buttonTwoUrl?: string;
  state?: 'no_state' | 'do' | 'dont';
  transparent?: boolean;
  heading?: string;
  content_heading?: string;
  imageBGTransparent?: boolean
  appearance?: 'filled' | 'elevated';
  filledInContainer?: boolean;
  last_modified?: string;
  date?: string;
  tags?: Array<{
    id?: number;
    title?: string;
  }>;
}
