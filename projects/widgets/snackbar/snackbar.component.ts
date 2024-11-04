import { MIN_DURATION, READ_SPEED_PER_ACTION, READ_SPEED_PER_CHAR } from './snackbar-defaults';
import { IdsSnackbarAction } from './types/snackbar-data.type';
import { IdsSnackbarVariant, IdsSnackbarVariantType } from './types/snackbar-variant.type';

import { A11yModule } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, input, OnDestroy, output, ViewEncapsulation } from '@angular/core';
import { IdsButtonAppearance, IdsButtonComponent, IdsButtonVariant } from '@i-cell/ids-angular/button';
import { coerceBooleanAttribute, ComponentBase, IdsSize } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonAppearance, IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'ids-snackbar',
  standalone: true,
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsButtonComponent,
    A11yModule,
  ],
  templateUrl: './snackbar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[role]': 'role()',
    '(mouseenter)': '_onMouseEnter()',
    '(mouseleave)': '_onMouseLeave()',
  },
})
export class IdsSnackbarComponent extends ComponentBase implements AfterViewInit, OnDestroy {
  protected override get _componentName(): string {
    return 'snackbar';
  }

  private _timer?: ReturnType<typeof setTimeout>;

  public readonly size = IdsSize;
  public readonly iconButtonAppearance = IdsIconButtonAppearance;
  public readonly buttonAppearance = IdsButtonAppearance;

  public message = input.required<string>();
  public variant = input<IdsSnackbarVariantType | undefined>();
  public icon = input<string | undefined>();
  public actions = input<IdsSnackbarAction[] | undefined>([]);
  public allowDismiss = input<boolean, boolean | undefined>(false, { transform: coerceBooleanAttribute });
  public closeButtonLabel = input<string | undefined>();
  public autoClose = input<boolean, boolean | undefined>(false, { transform: coerceBooleanAttribute });
  public urgent = input<boolean, boolean | undefined>(false, { transform: coerceBooleanAttribute });

  public closed = output<void>();

  private _canAutoClose = computed(() => !this.allowDismiss() && this.autoClose());
  private _duration = computed(() => {
    const actionReadDuration = (this.actions()?.length ?? 0) * READ_SPEED_PER_ACTION;
    return Math.max(this.message().length * READ_SPEED_PER_CHAR + actionReadDuration, MIN_DURATION);
  });

  protected _hostClasses = computed(() => this._getHostClasses([
    this.variant(),
    this.allowDismiss() && !this.closeButtonLabel() ? 'width-close-x-button' : null,
  ]));

  public role = computed(() => (this.urgent() ? 'alert' : 'status'));
  public uniqueId = computed(() => `${this._componentClass}-${this.id()}`);
  public buttonVariant = computed(() => (this.variant() === IdsSnackbarVariant.DARK ? IdsButtonVariant.LIGHT : IdsButtonVariant.SURFACE));
  private _defaultIcon = computed<string | null>(() => {
    switch (this.variant()) {
      case IdsSnackbarVariant.DARK:
        return null;
      case IdsSnackbarVariant.INFO:
        return 'exclamation-circle';
      case IdsSnackbarVariant.SUCCESS:
        return 'check-circle';
      case IdsSnackbarVariant.WARNING:
        return 'exclamation-triangle';
      case IdsSnackbarVariant.ERROR:
        return 'exclamation-circle';

      default:
        return null;
    }
  });

  protected _safeIcon = computed(() => this.icon() ?? this._defaultIcon());

  private _onMouseEnter(): void {
    this._stopTimer();
  }

  private _onMouseLeave(): void {
    this._startTimer();
  }

  private _startTimer(): void {
    if (this._canAutoClose()) {
      this._timer = setTimeout(() => {
        this.close();
      }, this._duration());
    }
  }

  private _stopTimer(): void {
    if (this._canAutoClose()) {
      clearTimeout(this._timer);
    }
  }

  public ngAfterViewInit(): void {
    this._startTimer();
  }

  public close(): void {
    this._stopTimer();
    this.closed.emit();
  }

  public callAction(action: () => void): void {
    action();
    this.close();
  }

  public ngOnDestroy(): void {
    clearTimeout(this._timer);
  }
}
