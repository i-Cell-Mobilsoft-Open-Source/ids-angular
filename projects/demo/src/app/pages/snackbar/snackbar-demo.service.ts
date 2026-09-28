import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable, computed } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY, IdsSnackbarAction, IdsSnackbarPosition, IdsSnackbarPositionType, IdsSnackbarService, IdsSnackbarVariant, IdsSnackbarVariantType } from '@i-cell/ids-angular/snackbar';
import { TranslateService } from '@ngx-translate/core';

const SNACKBAR_DOCS_PATH = 'snackbar/snackbar.component.docs.json';

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
  clearOnNavigation: boolean,
};

const defaultConfig = IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY();

@Injectable()
export class SnackbarDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _customActions: IdsSnackbarAction[] = [{ label: 'Log to console', action: this.action }];
  protected _areSnackbarsOpen = computed(() => this._snackbarService.snackbars().length > 0);

  public inputControlConfig: DemoControlConfig<SnackbarInputControls> = {
    message: {
      description: this._widgetDocs.getDescription(SNACKBAR_DOCS_PATH, 'message', 'Snackbar message'),
      type: 'string',
      default: '-',
      demoDefault: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    },
    variant: {
      description: this._widgetDocs.getDescription(SNACKBAR_DOCS_PATH, 'variant', 'Snackbar variant.'),
      type: 'IdsSnackbarVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSnackbarVariant),
    },
    icon: {
      description: this._widgetDocs.getDescription(
        SNACKBAR_DOCS_PATH,
        'icon',
        'Custom icon for snackbar. Overwites default icon. Default icon depends on variant.',
      ),
      type: 'string',
      default: '-',
      demoDefault: '',
    },
    allowDismiss: {
      description: this._widgetDocs.getDescription(
        SNACKBAR_DOCS_PATH,
        'allowDismiss',
        'Whether the the user can close the snackbar or not.',
      ),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    closeButtonLabel: {
      description: this._widgetDocs.getDescription(
        SNACKBAR_DOCS_PATH,
        'closeButtonLabel',
        'Custom close button. If any text is provided,' +
        ' the close button will be a button with this text against the default "x" button',
      ),
      type: 'string',
      default: '-',
      demoDefault: '',
    },
    autoClose: {
      description: this._widgetDocs.getDescription(
        SNACKBAR_DOCS_PATH,
        'autoClose',
        'Whether the snackbar should close automatically or not. The duration is a computed data based on some constant value.',
      ),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    urgent: {
      description: this._widgetDocs.getDescription(
        SNACKBAR_DOCS_PATH,
        'urgent',
        'Whether to announce the notification as urgent: uses role="alert" instead of role="status".',
      ),
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
      disabled: false,
    },
    position: {
      description: 'Snackbar position. Position is an application-wide default value. Can not overwrite at runtime.',
      type: 'IdsSnackbarPositionType',
      default: defaultConfig.position,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSnackbarPosition),
      disabled: false,
    },
    newestAtStartPosition: {
      description: 'Whether the newest snackbar opens in start position, or not.' +
        ' newestAtStartPosition is an application-wide default value. Can not overwrite at runtime.',
      type: 'boolean',
      default: defaultConfig.newestAtStartPosition,
      control: DemoControl.SWITCH,
      disabled: false,
    },
    viewportMargin: {
      description: 'Viewport margin. viewportMargin is an application-wide default value. Can not overwrite at runtime.',
      type: 'number',
      default: defaultConfig.viewportMargin,
      disabled: false,
      control: DemoControl.NUMBER,
      min: 0,
      step: 1,
    },
    clearOnNavigation: {
      description: 'Whether the snackbar should be cleared automatically on navigation or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
  };

  public readonly methodControlConfig: DemoMethodConfig = [
    {
      name: 'close()',
      description: 'Closes the currently opened snackbar.',
      returnType: 'void',
    },
    {
      name: 'callAction(action: ()=>void)',
      description: 'Calls the provided action.',
      returnType: 'void',
      parameters: ['action'],
      parameterTypes: ['() => void'],
      parameterDescriptions: ['The action to call.'],
    },
  ];

  public readonly groupMethodControlConfig: DemoMethodConfig = [
    {
      name: 'closeSnackbar(id: number)',
      description: 'Closes the snackbar at the given index.',
      returnType: 'void',
      parameters: ['id'],
      parameterTypes: ['number'],
      parameterDescriptions: ['The index of the snackbar to close.'],
    },
  ];

  public defaults = getDefaultFromDemoConfig<SnackbarInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<SnackbarHelperControls>(this.helperControlConfig);

  public model: SnackbarInputControls = { ...this.defaults };
  public helperModel: SnackbarHelperControls = { ...this.helperDefaults };

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
      clearOnNavigation: this.helperModel.clearOnNavigation,
    });
  }

  public action(): void {
    console.info('action was called');
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }

  public readonly propControlConfig: DemoControlConfig<unknown> = {
    actions: {
      description: this._widgetDocs.getDescription(
        SNACKBAR_DOCS_PATH,
        'actions',
        'Array of actions (label + callback) rendered as buttons inside the snackbar.',
      ),
      type: 'IdsSnackbarAction[]',
      default: [],
    },
    closed: {
      description: this._widgetDocs.getDescription(SNACKBAR_DOCS_PATH, 'closed', 'Emitted when the snackbar is closed.'),
      type: 'EventEmitter<void>',
      default: '-',
    },
  };

  public getMethodConfig(): DemoMethodConfig[] {
    return [
      this.methodControlConfig,
      this.groupMethodControlConfig,
    ];
  }

  public getMethodTitles(): string[] {
    return [
      'Snackbar Methods',
      'Snackbar Group Methods',
    ];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.SNACKBAR', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.inputControlConfig, ...this.propControlConfig },
      },
    ];
  }
}
