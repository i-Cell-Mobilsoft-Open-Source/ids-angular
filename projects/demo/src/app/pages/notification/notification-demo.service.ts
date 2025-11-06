import { IconService } from '../../core/services/icon.service';

import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonAppearance, IdsButtonAppearanceType } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_NOTIFICATION_DEFAULT_CONFIG_FACTORY, IdsNotificationAppearance, IdsNotificationAppearanceType, IdsNotificationVariant, IdsNotificationVariantType } from '@i-cell/ids-angular/notification';

type NotificationInputControls = {
  size: IdsSizeType,
  appearance: IdsNotificationAppearanceType,
  variant: IdsNotificationVariantType,
  icon: string,
  title: string,
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
  private readonly _iconService = inject(IconService);
  private readonly _destroyRef = inject(DestroyRef);
  public displayComponent = signal<boolean>(true);
  public isLoaded = signal(false);

  public inputControlConfig = signal<DemoControlConfig<NotificationInputControls>>({
    appearance: {
      description: 'Notification appearance.',
      type: 'IdsNotificationAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsNotificationAppearance),
    },
    size: {
      description: 'Notification size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Notification variant.',
      type: 'IdsNotificationVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsNotificationVariant),
    },
    icon: {
      description: 'Name of leading icon.',
      type: 'string',
      default: '-',
      demoDefault: '',
      control: DemoControl.SELECT,
      list: [],
    },
    title: {
      description: 'Title of notification',
      type: 'string',
      default: '-',
      demoDefault: 'Sample Title',
    },
    closeButtonSize: {
      description: 'Close Button size.',
      type: 'IdsSizeType',
      default: defaultConfig.closeButtonSize,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    closeButtonLabel: {
      description: 'Title of close button',
      type: 'string',
      default: '-',
      demoDefault: '',
    },
    closeLabelButtonAppearance: {
      description: 'Close Label Button appearance.',
      type: 'IdsButtonAppearanceType',
      default: defaultConfig.closeLabelButtonAppearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    urgent: {
      description: 'Whether the notification is urgent or not. It changes the role of the notification.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    displayActionsAtBottom: {
      description: 'Whether display the notification actions at bottom or not.',
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
      demoDefault: 'Action1 button',
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
      demoDefault: 'Action2 button',
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

      // ⭐️ 6. Frissítsd a signalt .update()-tel
      this.inputControlConfig.update((currentConfig) => ({
        ...currentConfig,
        icon: { ...currentConfig.icon, list: list },
      }));

      // ⭐️ 7. Frissítsd a defaultokat és a modellt a betöltés után
      this.defaults = getDefaultFromDemoConfig<NotificationInputControls>(this.inputControlConfig());
      this.model = { ...this.defaults };

      // ⭐️ 8. Jelezd, hogy betöltődtek az adatok
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
}
