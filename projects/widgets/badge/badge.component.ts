import { IdsBadgeAppearanceType } from './types/badge-appearance.type';
import { IdsBadgeVariantType } from './types/badge-variant.type';

import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  contentChildren,
  Injector,
  input,
} from '@angular/core';
import { BadgeLimitPipe } from '@i-cell/ids-angular/badge/badge-limit.pipe';
import { ComponentBase, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  imports: [
    BadgeLimitPipe,
    NgClass,
  ],
})
export class IdsBadgeComponent extends ComponentBase  {
  protected override get _hostName(): string {
    return 'badge';
  }

  public appearance = input<IdsBadgeAppearanceType>();
  public variant = input<IdsBadgeVariantType>();
  public label = input<string>('');
  public size = input<IdsSizeType>();
  public limit = input<null | number>(null);

  protected _iconLeading = contentChildren<IdsIconComponent>('ids-icon[icon-leading]');

  constructor(
    private _injector: Injector) {
    super();
  }

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
  ]));
}
