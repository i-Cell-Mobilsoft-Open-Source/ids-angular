export interface EntryListData {
  id(id: number): number;
  title?: string;
  hero_description?: string;
  hero_image_light?: { url?: string };
  hero_image_dark?: { url?: string };
  collections_contents?: Array<{
    title?: string;
    structure?:{
      handle?: string;
      tree?: Array<{
        entry?: {
          slug: string;
          title?: string;
          id?: number;
          hero_description?: string;
          hero_image_light?: { url?: string };
          hero_image_dark?: { url?: string };
          last_modified?: string;
          date?: string;
          tags?: Array<{
            id?: number;
            title?: string;
          }>;
        };
      }>
    };
  }>;
}
