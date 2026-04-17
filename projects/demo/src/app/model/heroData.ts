export interface HeroData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isBackButton?: boolean;
  imageUrlLight?: string;
  imageUrlDark?: string;
  localImageUrl?: string;
  date?: string;
  tags?: string[] | { title: string }[];
  writtenBy?: string;
}
