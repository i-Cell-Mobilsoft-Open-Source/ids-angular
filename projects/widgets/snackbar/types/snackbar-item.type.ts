import { SnackbarVariantType } from './snackbar-variant.type';

export interface IdsSnackbarItem {
  message: string
  variant?: SnackbarVariantType
  icon?: string
  actions?: IdsSnackbarItemAction[]
  allowDismiss?: boolean
  closeButtonLabel?: string
  autoClose?: boolean
}

export interface IdsSnackbarItemAction {
  label: string
  action: () => void
}
