export interface Menu {
  icon?: string;
  name?: string;
  path?: string;
  children?: Menu[];
  $open?: boolean;
}
