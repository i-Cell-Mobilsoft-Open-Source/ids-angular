export interface ContentCardData {
  variant?: 'surface' | 'light' | 'dark';
  id?: number;
  orientation: 'horizontal' | 'vertical';
  aspectRatio?: '1/1' | '16/9' | '16/10';
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
}
