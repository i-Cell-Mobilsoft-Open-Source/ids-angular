import { SnackbarVariantType } from './snackbar-variant.type';

export interface IdsSnackbarItem {
  message: string
  variant?: SnackbarVariantType
  icon?: string
  actions?: IdsSnackbarItemAction[]
}

export interface IdsSnackbarItemAction {
  label: string
  action: () => void
}
