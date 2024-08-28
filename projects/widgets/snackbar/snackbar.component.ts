import { MIN_DURATION, READ_SPEED_PER_CHAR } from './snackbar-default-options';
import { IdsSnackbarItemAction } from './types/snackbar-item.type';
import { SnackbarVariant, SnackbarVariantType } from './types/snackbar-variant.type';

import { AfterViewInit, ChangeDetectionStrategy, Component, computed, HostBinding, HostListener, input, OnDestroy, output, ViewEncapsulation } from '@angular/core';
import { ButtonAppearance, IdsButtonComponent } from '@i-cell/ids-angular/button';
import { AllVariants, createClassList, Size } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IconButtonAppearance, IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { mdiAlertCircleOutline, mdiAlertOutline, mdiCheckCircleOutline, mdiClose, mdiInformationSlabCircleOutline } from '@mdi/js';

let nextUniqueId = 0;

@Component({
  selector: 'ids-snackbar',
  standalone: true,
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsButtonComponent,
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'id',
  },
})
export class IdsSnackbarComponent implements AfterViewInit, OnDestroy {
  private readonly _componentClass = 'ids-snackbar';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;

  private _timer?: ReturnType<typeof setTimeout>;

  public readonly id = this._uniqueId;
  public readonly size = Size;
  public readonly iconButtonAppearance = IconButtonAppearance;
  public readonly buttonAppearance = ButtonAppearance;
  public readonly closeIcon = mdiClose;

  public message = input.required<string>();
  public variant = input<SnackbarVariantType>();
  public icon = input<string | undefined>();
  public actions = input<IdsSnackbarItemAction[] | undefined>([]);
  public closeButtonLabel = input<string | undefined>();

  public closed = output<void>();

  private _duration = computed(() => Math.max(this.message().length * READ_SPEED_PER_CHAR, MIN_DURATION));
  private _hasActions = computed(() => Boolean(this.actions()?.length));
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this.variant(),
    this.closeButtonLabel() ? 'width-custom-close-button' : null,
  ]));

  public defaultIcon = computed(() => {
    switch (this.variant()) {
      case SnackbarVariant.DARK:
        return mdiAlertCircleOutline;
      case SnackbarVariant.INFO:
        return mdiInformationSlabCircleOutline;
      case SnackbarVariant.SUCCESS:
        return mdiCheckCircleOutline;
      case SnackbarVariant.WARNING:
      case SnackbarVariant.ERROR:
        return mdiAlertOutline;

      default:
        return mdiAlertOutline;
    }
  });

  public buttonVariant = computed(() => (this.variant() === SnackbarVariant.DARK ? AllVariants.LIGHT : AllVariants.SURFACE));

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  @HostListener('mouseenter', ['$event']) private _onMouseEnter(): void {
    this._stopTimer();
  }

  @HostListener('mouseleave', ['$event']) private _onMouseLeave(): void {
    this._startTimer();
  }

  private _startTimer(): void {
    if (!this._hasActions()) {
      this._timer = setTimeout(() => {
        this.close();
      }, this._duration());
    }
  }

  private _stopTimer(): void {
    if (!this._hasActions()) {
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
