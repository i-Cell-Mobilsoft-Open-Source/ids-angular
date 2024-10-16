import { IdsSnackbarVariantType } from './snackbar-variant.type';

export interface IdsSnackbarData {
  message: string
  variant?: IdsSnackbarVariantType
  icon?: string
  actions?: IdsSnackbarAction[]
  allowDismiss?: boolean
  closeButtonLabel?: string
  autoClose?: boolean
  urgent?: boolean
}

export interface IdsSnackbarAction {
  label: string
  action: () => void
}
