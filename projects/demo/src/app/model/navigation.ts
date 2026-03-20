export interface NavigationNode {
  page?: { slug?: string; title?: string; id?: string; generated?: boolean };
  tree?: NavigationNode[];
  children?: NavigationNode[];
  max_depth?: number | null;
  title?: string;
}

export interface NavigationQueryResult {
  navs: NavigationNode[];
}
