export interface MenuConfig {
  sections: MenuSection[];
}

export interface MenuSection {
  title: MenuItem;
  items: MenuItem[];
}

export interface MenuItem {
  type: 'ITEM' | 'TITLE';
  name?: string;
  path?: string;
  items?: MenuItem[];
  $open?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  isDisabled?: boolean;
  isActive?: boolean;
  hasDarkBackground?: boolean;
}
