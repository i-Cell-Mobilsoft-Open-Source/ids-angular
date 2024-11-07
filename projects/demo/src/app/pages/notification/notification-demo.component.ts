import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { IconService } from '../../core/services/icon.service';

import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonAppearance, IdsButtonAppearanceType, IdsButtonComponent, IdsButtonVariant, IdsButtonVariantType } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsNotificationComponent, IdsNotificationActionButtonDirective, IdsNotificationVariantType, IdsNotificationAppearanceType, IDS_NOTIFICATION_DEFAULT_CONFIG_FACTORY, IdsNotificationAppearance, IdsNotificationVariant } from '@i-cell/ids-angular/notification';
import { TranslateModule } from '@ngx-translate/core';

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
};

type NotificationHelperControls = {
  showAction1Button: boolean,
  showAction2Button: boolean,
  action1Appearance: IdsButtonAppearanceType,
  action1Size: IdsSizeType,
  action1Variant: IdsButtonVariantType,
  action1Disabled: boolean,
  action1Text: string,
  action1HasLeadingIcon: boolean,
  action1HasTrailingIcon: boolean,
  action2Appearance: IdsButtonAppearanceType,
  action2Size: IdsSizeType,
  action2Variant: IdsButtonVariantType,
  action2Disabled: boolean,
  action2Text: string,
  action2HasLeadingIcon: boolean,
  action2HasTrailingIcon: boolean,
};

const defaultConfig = IDS_NOTIFICATION_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-notification-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
    IdsNotificationComponent,
    IdsButtonComponent,
    IdsNotificationActionButtonDirective,
  ],
  templateUrl: './notification-demo.component.html',
  styleUrl: './notification-demo.component.scss',
})
export class NotificationDemoComponent implements OnInit {
  private readonly _iconService = inject(IconService);
  private readonly _destroyRef = inject(DestroyRef);
  public displayComponent = signal<boolean>(true);

  protected _inputControlConfig: DemoControlConfig<NotificationInputControls> = {
    appearance: {
      description: 'Notification appearance.',
      type: 'IdsNotificationAppearanceType',
      default: defaultConfig.appearance,
      control: 'select',
      list: convertEnumToStringArray(IdsNotificationAppearance),
    },
    size: {
      description: 'Notification size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Notification variant.',
      type: 'IdsNotificationVariantType',
      default: defaultConfig.variant,
      control: 'select',
      list: convertEnumToStringArray(IdsNotificationVariant),
    },
    icon: {
      description: 'Name of leading icon.',
      type: 'string',
      default: '-',
      demoDefault: '',
      control: 'select',
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
      control: 'select',
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
      control: 'select',
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    urgent: {
      description: 'Whether the notification is urgent or not. It changes the role of the notification.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };

  protected _helperControlConfig: DemoControlConfig<NotificationHelperControls> = {
    showAction1Button: {
      description: 'Whether display the button or not',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    action1Appearance: {
      description: 'Button appearance.',
      type: 'IdsButtonAppearanceType',
      default: IdsButtonAppearance.TEXT,
      control: 'select',
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    action1Size: {
      description: 'Button size.',
      type: 'IdsSizeType',
      default: IdsSize.COMPACT,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    action1Variant: {
      description: 'Button variant.',
      type: 'IdsButtonVariantType',
      default: IdsButtonVariant.DARK,
      control: 'select',
      list: convertEnumToStringArray(IdsButtonVariant),
    },
    action1Disabled: {
      description: 'Whether the button is disabled or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
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
      control: 'checkbox',
    },
    action1HasTrailingIcon: {
      description: 'Whether the button has trailing icon or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    showAction2Button: {
      description: 'Whether display the button or not',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    action2Appearance: {
      description: 'Button appearance.',
      type: 'IdsButtonAppearanceType',
      default: IdsButtonAppearance.OUTLINED,
      control: 'select',
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    action2Size: {
      description: 'Button size.',
      type: 'IdsSizeType',
      default: IdsSize.COMPACT,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    action2Variant: {
      description: 'Button variant.',
      type: 'IdsButtonVariantType',
      default: IdsButtonVariant.DARK,
      control: 'select',
      list: convertEnumToStringArray(IdsButtonVariant),
    },
    action2Disabled: {
      description: 'Whether the button is disabled or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
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
      control: 'checkbox',
    },
    action2HasTrailingIcon: {
      description: 'Whether the button has trailing icon or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };

  public ngOnInit(): void {
    this._loadIcons();
  }

  private _loadIcons(): void {
    this._iconService.loadIcons().pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((list: string[]) => {
      this._inputControlConfig = {
        ...this._inputControlConfig,
        icon: { ...this._inputControlConfig.icon, list },
      };
    });
  }

  public defaults = getDefaultFromDemoConfig<NotificationInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<NotificationHelperControls>(this._helperControlConfig);

  public model: NotificationInputControls = { ...this.defaults };
  public helperModel: NotificationHelperControls = { ...this.helperDefaults };

  public onClick(buttonName: string): void {
    console.info(`${buttonName} button clicked`);
  }

  public reset(): void {
    this.displayComponent.set(true);
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }

  public delete(): void {
    this.displayComponent.set(false);
  }
}
