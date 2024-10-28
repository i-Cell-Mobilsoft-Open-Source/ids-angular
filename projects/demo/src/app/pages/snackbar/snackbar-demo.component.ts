import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, computed, inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY, IdsSnackbarAction, IdsSnackbarService, IdsSnackbarPositionType, IdsSnackbarVariant, IdsSnackbarVariantType, IdsSnackbarPosition } from '@i-cell/ids-angular/snackbar';
import { TranslateModule } from '@ngx-translate/core';

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

const defaultConfig = IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-snackbar-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsButtonComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './snackbar-demo.component.html',
  styleUrl: './snackbar-demo.component.scss',
})
export class SnackbarDemoComponent implements OnInit {
  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _customActions: IdsSnackbarAction[] = [{ label: 'Log to console', action: this.action }];
  protected _areSnackbarsOpen = computed(() => this._snackbarService.snackbars().length > 0);

  public setActualViewContainer = (): void => {
    if (this.helperModel.useActualViewContainer) {
      this._snackbarService.setViewContainerRef(this._viewContainerRef);
    } else {
      this._snackbarService.clearViewContainerRef();
    }
  };

  protected _inputControlConfig: DemoControlConfig<SnackbarInputControls> = {
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
      control: 'select',
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
      control: 'checkbox',
    },
    closeButtonLabel: {
      // eslint-disable-next-line @stylistic/js/max-len
      description: 'Custom close button. If any text is provided, the close button will be a button with this text against the default "x" button',
      type: 'string',
      default: '-',
      demoDefault: '',
    },
    autoClose: {
      description: 'Whether the snackbar should close automatically or not. The duration is a computed data based on some constant value.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    urgent: {
      description: 'Whether the snackbar is urgent or not. It changes the role of the snackbar.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };

  protected _helperControlConfig: DemoControlConfig<SnackbarHelperControls> = {
    useAction: {
      description: 'Whether the snackbar is urgent or not. It changes the role of the snackbar.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    size: {
      description: 'Snackbar size. Size is an application-wide default value. Can not be overwrite at runtime.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
      disabled: true,
    },
    position: {
      description: 'Snackbar position. Position is an application-wide default value. Can not be overwrite at runtime.',
      type: 'IdsSnackbarPositionType',
      default: defaultConfig.position,
      control: 'select',
      list: convertEnumToStringArray(IdsSnackbarPosition),
      disabled: true,
    },
    newestAtStartPosition: {
      // eslint-disable-next-line @stylistic/js/max-len
      description: 'Whether the newest snackbar opens in start position, or not. newestAtStartPosition is an application-wide default value. Can not be overwrite at runtime.',
      type: 'boolean',
      default: defaultConfig.newestAtStartPosition,
      control: 'checkbox',
      disabled: true,
    },
    viewportMargin: {
      description: 'Viewport margin. viewportMargin is an application-wide default value. Can not be overwrite at runtime.',
      type: 'number',
      default: defaultConfig.viewportMargin,
      disabled: true,
      control: 'number',
      min: 0,
      step: 1,
    },
    useActualViewContainer: {
      // eslint-disable-next-line @stylistic/js/max-len
      description: 'Snackbars open in snackbar group. This group can connect to the viewport by default, or we can connect to a viewContainerRef. With this boolean, we can switch between actual viewContainerRef or viewPort.',
      type: 'boolean',
      default: true,
      control: 'checkbox',
      onModelChange: this.setActualViewContainer,
    },
  };

  public defaults = getDefaultFromDemoConfig<SnackbarInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<SnackbarHelperControls>(this._helperControlConfig);

  public model: SnackbarInputControls = { ...this.defaults };
  public helperModel: SnackbarHelperControls = { ...this.helperDefaults };

  public ngOnInit(): void {
    this.setActualViewContainer();
  }

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
}
