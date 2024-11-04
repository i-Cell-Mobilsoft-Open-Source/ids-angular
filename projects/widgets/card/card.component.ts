import { IDS_CARD_DEFAULT_CONFIG, IDS_CARD_DEFAULT_CONFIG_FACTORY, IdsCardDefaultConfig } from './card-defaults';
import { IdsCardHeaderComponent } from './card-header.component';
import { IdsCardAppearanceType } from './types/card-appearances.type';
import { IdsCardVariantType } from './types/card-variant.type';

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';
import {
  ComponentBaseWithDefaults,
  IdsOrientationType,
  IdsSizeType,
  coerceBooleanAttribute,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-disabled]': 'this.disabled()? "" : null',
    '[attr.tabindex]': ' this._hasClickHandler() ? 0 : null',
  },
})
export class IdsCardComponent extends ComponentBaseWithDefaults<IdsCardDefaultConfig> implements OnInit {
  protected override get _hostName(): string {
    return 'card';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_CARD_DEFAULT_CONFIG);

  public appearance = input<IdsCardAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsCardVariantType>(this._defaultConfig.variant);
  public orientation = input<IdsOrientationType>(this._defaultConfig.orientation);
  public disabled = input(false, { transform: (value: boolean | string) => coerceBooleanAttribute(value) });

  // Old fashion output for now, signal outputs cannot be queried as of now for subscribers
  @Output()
  // eslint-disable-next-line @angular-eslint/no-output-native
  public click = new EventEmitter();

  private _hasClickHandler = signal(false);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
    this.variant(),
    this.orientation(),
    this.disabled() && this._hasClickHandler() ? 'disabled' : null,
    this._hasClickHandler() ? 'clickable' : null,
  ]));

  public ngOnInit(): void {
    this._hasClickHandler.set(this.click.observed);
  }
}
