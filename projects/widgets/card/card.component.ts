import { IDS_CARD_DEFAULT_CONFIG, IDS_CARD_DEFAULT_CONFIG_FACTORY, IdsCardDefaultConfig } from './card-defaults';
import { IdsCardHeaderComponent } from './card-header.component';
import { CardAppearanceType } from './types/card-appearances';

import {
  Component,
  EventEmitter,
  HostBinding,
  InjectionToken,
  OnInit,
  Output,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  AllVariantsType,
  OrientationType,
  SizeType,
  coerceBooleanAttribute,
  createClassList,
} from '@i-cell/ids-angular/core';

const defaultConfig = IDS_CARD_DEFAULT_CONFIG_FACTORY();

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

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_CARD_DEFAULT_CONFIG);

  public appearance = input<CardAppearanceType>(this._defaultConfig.appearance);
  public size = input<SizeType>(this._defaultConfig.size);
  public variant = input<AllVariantsType>(this._defaultConfig.variant);
  public orientation = input<OrientationType>(this._defaultConfig.orientation);
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  // Old fashion output for now, signal outputs cannot be queried as of now for subscribers
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  public click = new EventEmitter();

  private _hasClickHandler = signal(false);

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.appearance(),
      this.size(),
      this.variant(),
      this.orientation(),
      this.disabled() && this._hasClickHandler() ? 'disabled' : null,
      this._hasClickHandler() ? 'clickable' : null,
    ]),
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

  // eslint-disable-next-line @stylistic/js/max-len
  protected _getDefaultConfig(defaultConfig: Required<IdsCardDefaultConfig>, injectionToken: InjectionToken<IdsCardDefaultConfig>): Required<IdsCardDefaultConfig> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
