export interface ContentData {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  imageLink: string;
  comp_img_light_mode?: Array<{ url: string }>;
  comp_img_dark_mode?: Array<{ url: string }>;
  comp_description?: string; // <-- Add this property for mapping
  description: string;
  last_modified?: string;
  date?: string;
  tags?: Array<{
    id?: number;
    title?: string;
  }>;
}
