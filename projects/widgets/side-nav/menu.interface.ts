export interface Menu {
  name?: string;
  path?: string;
  children?: Menu[];
  $open?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  isDisabled?: boolean;
  isActive?: boolean;
}
