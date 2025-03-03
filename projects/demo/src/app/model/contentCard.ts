export interface ContentCard  {
  id?: number;
  orientation: 'horizontal' | 'vertical';
  aspectRatio?: '1/1' | '16/9' | '16/10';
  imageBgColorVariant?: 'surface' | 'primary' | 'light';
  overTitle?: string;
  title?: string;
  description?: string;
  caption?: string;
  buttonOne?: string;
  buttonTwo?: string;
  state?: 'do' | 'dont';
  imageURL?: string;
}
