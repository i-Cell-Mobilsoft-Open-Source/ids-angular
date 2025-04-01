import { IdsNotificationActionButtonDirective } from './notification-action-button.directive';
import { IDS_NOTIFICATION_DEFAULT_CONFIG, IDS_NOTIFICATION_DEFAULT_CONFIG_FACTORY, IdsNotificationDefaultConfig } from './notification-defaults';
import { IdsNotificationAppearance, IdsNotificationAppearanceType } from './types/notification-appearance.type';
import { IdsNotificationVariant, IdsNotificationVariantType } from './types/notification-variant.type';

import { ChangeDetectionStrategy, Component, computed, contentChildren, input, output, signal, ViewEncapsulation } from '@angular/core';
import { IDS_BUTTON_PARENT, IdsButtonAppearanceType, IdsButtonComponent, IdsButtonParent, IdsButtonVariant } from '@i-cell/ids-angular/button';
import { coerceBooleanAttribute, coerceStringAttribute, ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IDS_ICON_BUTTON_PARENT, IdsIconButtonAppearance, IdsIconButtonAppearanceType, IdsIconButtonComponent, IdsIconButtonParent, IdsIconButtonVariant, IdsIconButtonVariantType } from '@i-cell/ids-angular/icon-button';

const defaultConfig = IDS_NOTIFICATION_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-notification',
  imports: [
    IdsIconComponent,
    IdsButtonComponent,
    IdsIconButtonComponent,
  ],
  templateUrl: './notification.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[role]': '_role()',
  },
  providers: [
    {
      provide: IDS_BUTTON_PARENT,
      useExisting: IdsNotificationComponent,
    },
    {
      provide: IDS_ICON_BUTTON_PARENT,
      useExisting: IdsNotificationComponent,
    },
  ],
})
export class IdsNotificationComponent extends ComponentBaseWithDefaults<IdsNotificationDefaultConfig>
  implements IdsButtonParent, IdsIconButtonParent {
  protected override get _hostName(): string {
    return 'notification';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_NOTIFICATION_DEFAULT_CONFIG);

  public size = input<IdsSizeType>(this._defaultConfig.size);
  public appearance = input<IdsNotificationAppearanceType>(this._defaultConfig.appearance);
  public variant = input<IdsNotificationVariantType>(this._defaultConfig.variant);
  public icon = input<string | undefined>();
  public title = input<string>('');
  public urgent = input<boolean, boolean | undefined>(false, { transform: coerceBooleanAttribute });
  public displayActionsAtBottom = input<boolean, boolean | undefined>(false, { transform: coerceBooleanAttribute });
  public closeButtonSize = input<IdsSizeType>(this._defaultConfig.closeButtonSize);
  public closeLabelButtonAppearance = input<IdsButtonAppearanceType>(this._defaultConfig.closeLabelButtonAppearance);
  public closeButtonLabel = input<string, string>('', { transform: coerceStringAttribute });

  public embeddedIconButtonAppearance = signal<IdsIconButtonAppearanceType>(IdsIconButtonAppearance.STANDARD);
  public disabled = signal<boolean>(false);

  protected _actionButtons = contentChildren<IdsNotificationActionButtonDirective>(IdsNotificationActionButtonDirective);

  public closed = output<void>();

  private _role = computed(() => (this.urgent() ? 'alert' : 'status'));

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.appearance(),
    this.variant(),
    this.displayActionsAtBottom() ? 'actions-bottom-mode' : null,
  ]));

  protected _closeLabelButtonClass = computed(() => (this.closeButtonLabel() ? 'ids-notification__label-button' : ''));

  public embeddedButtonVariant = computed<IdsIconButtonVariantType>(() => {
    const notificationVariant = this.variant();
    const notificationAppearance = this.appearance();

    if (notificationAppearance === IdsNotificationAppearance.OUTLINED) {
      switch (notificationVariant) {
        case IdsNotificationVariant.DARK:
          return IdsButtonVariant.DARK;
        case IdsNotificationVariant.LIGHT:
          return IdsButtonVariant.LIGHT;
        default:
          return IdsButtonVariant.SURFACE;
      }
    } else {
      switch (notificationVariant) {
        case IdsNotificationVariant.SURFACE:
        case IdsNotificationVariant.LIGHT:
          return IdsButtonVariant.DARK;
        default:
          return IdsButtonVariant.LIGHT;
      }
    }
  });

  public embeddedIconButtonVariant = computed<IdsIconButtonVariantType>(() => {
    const notificationVariant = this.variant();
    const notificationAppearance = this.appearance();

    if (notificationAppearance === IdsNotificationAppearance.OUTLINED) {
      switch (notificationVariant) {
        case IdsNotificationVariant.DARK:
          return IdsIconButtonVariant.DARK;
        case IdsNotificationVariant.LIGHT:
          return IdsIconButtonVariant.LIGHT;
        default:
          return IdsIconButtonVariant.SURFACE;
      }
    } else {
      switch (notificationVariant) {
        case IdsNotificationVariant.SURFACE:
        case IdsNotificationVariant.LIGHT:
          return IdsIconButtonVariant.DARK;
        default:
          return IdsIconButtonVariant.LIGHT;
      }
    }
  });

  protected _close(): void {
    this.closed.emit();
  }
}
