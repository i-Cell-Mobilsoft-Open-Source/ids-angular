import { MIN_DURATION, READ_SPEED_PER_ACTION, READ_SPEED_PER_CHAR } from './snackbar-defaults';
import { IdsSnackbarAction } from './types/snackbar-data.type';
import { SnackbarVariant, SnackbarVariantType } from './types/snackbar-variant.type';

import { A11yModule } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, HostBinding, HostListener, input, OnDestroy, output, ViewEncapsulation } from '@angular/core';
import { ButtonAppearance, IdsButtonComponent } from '@i-cell/ids-angular/button';
import { AllVariants, coerceBooleanAttribute, createClassList, Size } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IconButtonAppearance, IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

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
    '[id]': 'uniqueId()',
    '[role]': 'role()',
  },
})
export class IdsSnackbarComponent implements AfterViewInit, OnDestroy {
  /** @ignore **/
  private readonly _componentClass = 'ids-snackbar';

  /** @ignore **/
  private _timer?: ReturnType<typeof setTimeout>;

  /** @ignore **/
  public readonly size = Size;
  /** @ignore **/
  public readonly iconButtonAppearance = IconButtonAppearance;
  /** @ignore **/
  public readonly buttonAppearance = ButtonAppearance;

  public id = input.required<number>();
  public message = input.required<string>();
  public variant = input<SnackbarVariantType | undefined>();
  public icon = input<string | undefined>();
  public actions = input<IdsSnackbarAction[] | undefined>([]);
  public allowDismiss = input<boolean, boolean | undefined>(false, { transform: coerceBooleanAttribute });
  public closeButtonLabel = input<string | undefined>();
  public autoClose = input<boolean, boolean | undefined>(false, { transform: coerceBooleanAttribute });
  public urgent = input<boolean, boolean | undefined>(false, { transform: coerceBooleanAttribute });

  public closed = output<void>();

  /** @ignore **/
  private _canAutoClose = computed(() => !this.allowDismiss() && this.autoClose());
  /** @ignore **/
  private _duration = computed(() => {
    const actionReadDuration = (this.actions()?.length ?? 0) * READ_SPEED_PER_ACTION;
    return Math.max(this.message().length * READ_SPEED_PER_CHAR + actionReadDuration, MIN_DURATION);
  });

  /** @ignore **/
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this.variant(),
    this.allowDismiss() && !this.closeButtonLabel() ? 'width-close-x-button' : null,
  ]));

  /** @ignore **/
  public role = computed(() => (this.urgent() ? 'alert' : 'status'));
  /** @ignore **/
  public uniqueId = computed(() => `${this._componentClass}-${this.id()}`);
  /** @ignore **/
  public buttonVariant = computed(() => (this.variant() === SnackbarVariant.DARK ? AllVariants.LIGHT : AllVariants.SURFACE));
  /** @ignore **/
  private _defaultIcon = computed<string | null>(() => {
    switch (this.variant()) {
      case SnackbarVariant.DARK:
        return null;
      case SnackbarVariant.INFO:
        return 'exclamation-circle';
      case SnackbarVariant.SUCCESS:
        return 'check-circle';
      case SnackbarVariant.WARNING:
        return 'exclamation-triangle';
      case SnackbarVariant.ERROR:
        return 'exclamation-circle';

      default:
        return null;
    }
  });

  protected _safeIcon = computed(() => this.icon() ?? this._defaultIcon());

  /** @ignore **/
  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  /** @ignore **/
  @HostListener('mouseenter', ['$event']) private _onMouseEnter(): void {
    this._stopTimer();
  }

  /** @ignore **/
  @HostListener('mouseleave', ['$event']) private _onMouseLeave(): void {
    this._startTimer();
  }

  /** @ignore **/
  private _startTimer(): void {
    if (this._canAutoClose()) {
      this._timer = setTimeout(() => {
        this.close();
      }, this._duration());
    }
  }

  /** @ignore **/
  private _stopTimer(): void {
    if (this._canAutoClose()) {
      clearTimeout(this._timer);
    }
  }

  /** @ignore **/
  public ngAfterViewInit(): void {
    this._startTimer();
  }

  /** @ignore **/
  public close(): void {
    this._stopTimer();
    this.closed.emit();
  }

  /** @ignore **/
  public callAction(action: () => void): void {
    action();
    this.close();
  }

  /** @ignore **/
  public ngOnDestroy(): void {
    clearTimeout(this._timer);
  }
}
