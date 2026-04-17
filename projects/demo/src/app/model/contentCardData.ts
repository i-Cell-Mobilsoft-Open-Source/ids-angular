export type ContentCardData = Partial<{
  id: number;
  card: {
    variant: 'surface' | 'light' | 'dark';
    orientation: 'horizontal' | 'vertical';
    appearance: 'filled' | 'elevated';
    transparent: boolean;
  }
  isImage: boolean;
  image: {
    imageUrl: string;
    aspectRatio: '1/1' | '16/9' | '16/10';
    lightUrl: string;
    darkUrl: string;
    caption: string;
    bgColorVariant: 'surface' | 'primary' | 'light';
    bgTransparent: boolean;
    filledInContainer: boolean;
    state: 'no_state' | 'do' | 'dont';
  };
  isButton: boolean;
  button: Array<{
    text: string;
    url: string;
  }>;
  title: string;
  overTitle: string;
  description: string;
  content_heading: string;
  last_modified: string;
  date: string;
  tags: Array<{
    id: number;
    title: string;
  }>;
}>;
