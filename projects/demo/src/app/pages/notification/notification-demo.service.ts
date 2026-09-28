import { IconService } from '../../core/services/icon.service';
import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoSlotConfig } from '@demo-types/demo-slot.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsButtonAppearance, IdsButtonAppearanceType } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_NOTIFICATION_DEFAULT_CONFIG_FACTORY, IdsNotificationAppearance, IdsNotificationAppearanceType, IdsNotificationVariant, IdsNotificationVariantType } from '@i-cell/ids-angular/notification';
import { TranslateService } from '@ngx-translate/core';

const NOTIFICATION_DOCS_PATH = 'notification/notification.component.docs.json';
const NOTIFICATION_SLOTS_DOCS_PATH = 'notification/notification.component.slots.docs.json';

type NotificationInputControls = {
  size: IdsSizeType,
  appearance: IdsNotificationAppearanceType,
  variant: IdsNotificationVariantType,
  icon: string,
  title: string,
  closable: boolean,
  closeButtonSize: IdsSizeType,
  closeLabelButtonAppearance: IdsButtonAppearanceType,
  closeButtonLabel: string,
  urgent: boolean,
  displayActionsAtBottom: boolean,
};

type NotificationHelperControls = {
  showAction1Button: boolean,
  showAction2Button: boolean,
  action1Appearance: IdsButtonAppearanceType,
  action1Size: IdsSizeType,
  action1Disabled: boolean,
  action1Text: string,
  action1HasLeadingIcon: boolean,
  action1HasTrailingIcon: boolean,
  action2Appearance: IdsButtonAppearanceType,
  action2Size: IdsSizeType,
  action2Disabled: boolean,
  action2Text: string,
  action2HasLeadingIcon: boolean,
  action2HasTrailingIcon: boolean,
};

const defaultConfig = IDS_NOTIFICATION_DEFAULT_CONFIG_FACTORY();

@Injectable()
export class NotificationDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  private readonly _iconService = inject(IconService);
  private readonly _destroyRef = inject(DestroyRef);
  public displayComponent = signal<boolean>(true);
  public isLoaded = signal(false);

  public inputControlConfig = signal<DemoControlConfig<NotificationInputControls>>({
    appearance: {
      description: this._widgetDocs.getDescription(NOTIFICATION_DOCS_PATH, 'appearance', 'Notification appearance.'),
      type: 'IdsNotificationAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsNotificationAppearance),
    },
    size: {
      description: this._widgetDocs.getDescription(NOTIFICATION_DOCS_PATH, 'size', 'Notification size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(NOTIFICATION_DOCS_PATH, 'variant', 'Notification variant.'),
      type: 'IdsNotificationVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsNotificationVariant),
    },
    icon: {
      description: this._widgetDocs.getDescription(NOTIFICATION_DOCS_PATH, 'icon', 'Name of leading icon.'),
      type: 'string',
      default: '-',
      demoDefault: '',
      control: DemoControl.SELECT,
      list: [],
    },
    title: {
      description: this._widgetDocs.getDescription(NOTIFICATION_DOCS_PATH, 'title', 'Title of notification'),
      type: 'string',
      default: '-',
      demoDefault: 'Sample Title',
    },
    closable: {
      description: this._widgetDocs.getDescription(NOTIFICATION_DOCS_PATH, 'closable', 'Whether the notification is closable or not.'),
      type: 'boolean',
      default: defaultConfig.closable,
      control: DemoControl.SWITCH,
    },
    closeButtonSize: {
      description: this._widgetDocs.getDescription(NOTIFICATION_DOCS_PATH, 'closeButtonSize', 'Close Button size.'),
      type: 'IdsSizeType',
      default: defaultConfig.closeButtonSize,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    closeButtonLabel: {
      description: this._widgetDocs.getDescription(NOTIFICATION_DOCS_PATH, 'closeButtonLabel', 'Title of close button'),
      type: 'string',
      default: '-',
      demoDefault: '',
    },
    closeLabelButtonAppearance: {
      description: this._widgetDocs.getDescription(
        NOTIFICATION_DOCS_PATH,
        'closeLabelButtonAppearance',
        'Close Label Button appearance.',
      ),
      type: 'IdsButtonAppearanceType',
      default: defaultConfig.closeLabelButtonAppearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    urgent: {
      description: this._widgetDocs.getDescription(
        NOTIFICATION_DOCS_PATH,
        'urgent',
        'Whether to announce the notification as urgent: uses role="alert" instead of role="status".',
      ),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    displayActionsAtBottom: {
      description: this._widgetDocs.getDescription(
        NOTIFICATION_DOCS_PATH,
        'displayActionsAtBottom',
        'Whether display the notification actions at bottom or not.',
      ),
      type: 'boolean',
      default: defaultConfig.displayActionsAtBottom,
      control: DemoControl.SWITCH,
    },
  });

  public readonly helperControlConfig: DemoControlConfig<NotificationHelperControls> = {
    showAction1Button: {
      description: 'Whether display the button or not',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    action1Appearance: {
      description: 'Button appearance.',
      type: 'IdsButtonAppearanceType',
      default: IdsButtonAppearance.TEXT,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    action1Size: {
      description: 'Button size.',
      type: 'IdsSizeType',
      default: IdsSize.COMPACT,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    action1Disabled: {
      description: 'Whether the button is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    action1Text: {
      description: 'Text of button',
      type: 'string',
      default: '-',
      demoDefault: 'Link button',
    },
    action1HasLeadingIcon: {
      description: 'Whether the button has leading icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    action1HasTrailingIcon: {
      description: 'Whether the button has trailing icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    showAction2Button: {
      description: 'Whether display the button or not',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    action2Appearance: {
      description: 'Button appearance.',
      type: 'IdsButtonAppearanceType',
      default: IdsButtonAppearance.OUTLINED,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    action2Size: {
      description: 'Button size.',
      type: 'IdsSizeType',
      default: IdsSize.COMPACT,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    action2Disabled: {
      description: 'Whether the button is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    action2Text: {
      description: 'Text of button',
      type: 'string',
      default: '-',
      demoDefault: 'Simple Button',
    },
    action2HasLeadingIcon: {
      description: 'Whether the button has leading icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    action2HasTrailingIcon: {
      description: 'Whether the button has trailing icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public loadIcons(): void {
    this._iconService.loadIcons().pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((list: string[]) => {

      this.inputControlConfig.update((currentConfig) => ({
        ...currentConfig,
        icon: { ...currentConfig.icon, list: list },
      }));

      this.defaults = getDefaultFromDemoConfig<NotificationInputControls>(this.inputControlConfig());
      this.model = { ...this.defaults };

      this.isLoaded.set(true);
    });
  }

  public defaults = getDefaultFromDemoConfig<NotificationInputControls>(this.inputControlConfig());
  public helperDefaults = getDefaultFromDemoConfig<NotificationHelperControls>(this.helperControlConfig);

  public model: NotificationInputControls = { ...this.defaults };
  public helperModel: NotificationHelperControls = { ...this.helperDefaults };

  public onClick(buttonName: string): void {
    console.info(`${buttonName} button clicked`);
  }

  public reset(): void {
    this.displayComponent.set(true);
    this.defaults = getDefaultFromDemoConfig<NotificationInputControls>(this.inputControlConfig());
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }

  public delete(): void {
    this.displayComponent.set(false);
  }

  public onRestoreButtonClick(): void {
    this.displayComponent.set(true);
  }

  public readonly propControlConfig: DemoControlConfig<unknown> = {
    closed: {
      description: this._widgetDocs.getDescription(
        NOTIFICATION_DOCS_PATH,
        'closed',
        'Emitted when the notification is closed (either via the close button or programmatically).',
      ),
      type: 'EventEmitter<void>',
      default: '-',
    },
  };

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.NOTIFICATION', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.inputControlConfig(), ...this.propControlConfig },
      },
    ];
  }

  public readonly slotControlConfig: DemoSlotConfig = [
    {
      name: 'content',
      description: this._widgetDocs.getDescription(
        NOTIFICATION_SLOTS_DOCS_PATH,
        'content',
        'Default content of the notification, i.e. the notification\'s message.',
      ),
    },
    {
      name: 'actionButton',
      selector: '[idsNotificationActionButton]',
      description: this._widgetDocs.getDescription(
        NOTIFICATION_SLOTS_DOCS_PATH,
        'actionButton',
        'Action button(s) or link(s) projected into the notification (marked with the idsNotificationActionButton attribute).',
      ),
    },
  ];

  public getSlotConfig(): DemoSlotConfig[] {
    return [this.slotControlConfig];
  }

  public getSlotTitles(): string[] {
    return ['Notification'];
  }
}
