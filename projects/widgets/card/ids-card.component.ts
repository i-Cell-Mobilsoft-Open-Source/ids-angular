import { IdsCardHeaderComponent } from './ids-card-header.component';

import {
  Component,
  EventEmitter,
  HostBinding,
  OnInit,
  Output,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import {
  AllVariants,
  AllVariantsType,
  CardAppearance,
  CardAppearanceType,
  Orientation,
  OrientationType,
  Size,
  SizeType,
  addClassPrefix,
  coerceBooleanAttribute,
} from '@i-cell/widgets/core';

@Component({
  selector:
    'ids-card,div[idsCard],article[idsCard],aside[idsCard],section[idsCard]',
  standalone: true,
  imports: [IdsCardHeaderComponent],
  template: `
    <ng-content />
    <ng-content select="ids-card-footer,footer[idsCardFooter]" />
  `,
  encapsulation: ViewEncapsulation.None,
})
export class IdsCardComponent implements OnInit {
  private readonly _componentClass = 'ids-card';

  public appearance = input<CardAppearanceType | null>(CardAppearance.FILLED);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.SURFACE);
  public orientation = input<OrientationType | null>(Orientation.VERTICAL);
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  // Old fashion output for now, signal outputs cannot be queried as of now for subscribers
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  public click = new EventEmitter();

  private _hasClickHandler = signal(false);

  private _hostClasses = computed(() =>
    [
      this._componentClass,
      addClassPrefix(this._componentClass, this.appearance()),
      addClassPrefix(this._componentClass, this.size()),
      addClassPrefix(this._componentClass, this.variant()),
      addClassPrefix(this._componentClass, this.orientation()),
      ...[
        this.disabled() && this._hasClickHandler()
          ? [addClassPrefix(this._componentClass, 'disabled')]
          : [],
      ],
      ...[this._hasClickHandler() ? [addClassPrefix(this._componentClass, 'clickable')] : []],
    ]
      .filter(Boolean)
      .join(' '),
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean | null {
    return this.disabled() || null;
  }

  @HostBinding('attr.tabindex') get tabIndex(): number | null {
    return this._hasClickHandler() ? 0 : null;
  }

  public ngOnInit(): void {
    this._hasClickHandler.set(this.click.observed);
  }
}
