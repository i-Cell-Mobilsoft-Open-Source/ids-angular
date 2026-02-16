import { computed, inject, Injectable, ViewContainerRef } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY, IdsSnackbarAction, IdsSnackbarPosition, IdsSnackbarPositionType, IdsSnackbarService, IdsSnackbarVariant, IdsSnackbarVariantType } from '@i-cell/ids-angular/snackbar';

type SnackbarInputControls = {
  message: string,
  variant: IdsSnackbarVariantType,
  icon: string | undefined,
  allowDismiss: boolean,
  closeButtonLabel: string | undefined,
  autoClose: boolean,
  urgent: boolean,
};

type SnackbarHelperControls = {
  useAction: boolean,
  size: IdsSizeType,
  position: IdsSnackbarPositionType,
  newestAtStartPosition: boolean
  viewportMargin: number
  useActualViewContainer: boolean
};

type SnackbarMethodControls = {
  close: void;
  callAction: void;
};

type SnackbarGroupMethodControls = {
  closeSnackbar: void;
};

const defaultConfig = IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY();

@Injectable()
export class SnackbarDemoService {
  private readonly _snackbarService = inject(IdsSnackbarService);
  private _viewContainerRef: ViewContainerRef | null = null;
  private readonly _customActions: IdsSnackbarAction[] = [{ label: 'Log to console', action: this.action }];
  protected _areSnackbarsOpen = computed(() => this._snackbarService.snackbars().length > 0);

  public inputControlConfig: DemoControlConfig<SnackbarInputControls> = {
    message: {
      description: 'Snackbar message',
      type: 'string',
      default: '-',
      demoDefault: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    },
    variant: {
      description: 'Snackbar variant.',
      type: 'IdsSnackbarVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSnackbarVariant),
    },
    icon: {
      description: 'Custom icon for snackbar. Overwites default icon. Default icon depends on variant.',
      type: 'string',
      default: '-',
      demoDefault: '',
    },
    allowDismiss: {
      description: 'Whether the the user can close the snackbar or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    closeButtonLabel: {
      description: 'Custom close button. If any text is provided,' +
      ' the close button will be a button with this text against the default "x" button',
      type: 'string',
      default: '-',
      demoDefault: '',
    },
    autoClose: {
      description: 'Whether the snackbar should close automatically or not. The duration is a computed data based on some constant value.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    urgent: {
      description: 'Whether the snackbar is urgent or not. It changes the role of the snackbar.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public helperControlConfig: DemoControlConfig<SnackbarHelperControls> = {
    useAction: {
      description: 'Whether the snackbar is urgent or not. It changes the role of the snackbar.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    size: {
      description: 'Snackbar size. Size is an application-wide default value. Can not overwrite at runtime.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
      disabled: true,
    },
    position: {
      description: 'Snackbar position. Position is an application-wide default value. Can not overwrite at runtime.',
      type: 'IdsSnackbarPositionType',
      default: defaultConfig.position,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSnackbarPosition),
      disabled: true,
    },
    newestAtStartPosition: {
      description: 'Whether the newest snackbar opens in start position, or not.'+
      ' newestAtStartPosition is an application-wide default value. Can not overwrite at runtime.',
      type: 'boolean',
      default: defaultConfig.newestAtStartPosition,
      control: DemoControl.SWITCH,
      disabled: true,
    },
    viewportMargin: {
      description: 'Viewport margin. viewportMargin is an application-wide default value. Can not overwrite at runtime.',
      type: 'number',
      default: defaultConfig.viewportMargin,
      disabled: true,
      control: DemoControl.NUMBER,
      min: 0,
      step: 1,
    },
    useActualViewContainer: {
      description: 'Snackbars open in snackbar group.'+
      ' This group can connect to the viewport by default, or we can connect to a viewContainerRef.'+
      ' With this boolean, we can switch between actual viewContainerRef or viewPort.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
  };

  public readonly methodControlConfig: DemoMethodConfig<SnackbarMethodControls> = {
    close: {
      name: 'close()',
      description: 'Closes the currently opened snackbar.',
      returnType: 'void',
    },
    callAction: {
      name: 'callAction(action: ()=>void)',
      description: 'Calls the provided action.',
      returnType: 'void',
      parameters: ['action'],
      parameterTypes: ['() => void'],
      parameterDescriptions: ['The action to call.'],
    },
  };

  public readonly groupMethodControlConfig: DemoMethodConfig<SnackbarGroupMethodControls> = {
    closeSnackbar: {
      name: 'closeSnackbar(id: number)',
      description: 'Snackbar-group: Closes the snackbar at the given index.',
      returnType: 'void',
      parameters: ['id'],
      parameterTypes: ['number'],
      parameterDescriptions: ['The index of the snackbar to close.'],
    },
  };

  public defaults = getDefaultFromDemoConfig<SnackbarInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<SnackbarHelperControls>(this.helperControlConfig);

  public model: SnackbarInputControls = { ...this.defaults };
  public helperModel: SnackbarHelperControls = { ...this.helperDefaults };

  constructor() {
    this.helperControlConfig.useActualViewContainer.onModelChange = this.setActualViewContainer.bind(this);
  }

  public registerViewContainerRef(vcr: ViewContainerRef): void {
    this._viewContainerRef = vcr;
    this.setActualViewContainer();
  }

  public setActualViewContainer = (): void => {
    if (!this.helperModel) {
      return;
    }

    if (this.helperModel.useActualViewContainer && this._viewContainerRef) {
      this._snackbarService.setViewContainerRef(this._viewContainerRef);
    } else {
      this._snackbarService.clearViewContainerRef();
    }
  };

  public openSnackbar(): void {
    this._snackbarService.add({
      message: this.model.message,
      icon: this.model.icon,
      variant: this.model.variant,
      actions: this.helperModel.useAction ? this._customActions : undefined,
      allowDismiss: this.model.allowDismiss,
      closeButtonLabel: this.model.closeButtonLabel,
      autoClose: this.model.autoClose,
      urgent: this.model.urgent,
    });
  }

  public action(): void {
    console.info('action was called');
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }

  public getMethodConfig(): DemoMethodConfig<unknown>[] {
    return [
      this.methodControlConfig,
      this.groupMethodControlConfig,
    ];
  }
}
