import { IDS_TAG_DEFAULT_CONFIG, IDS_TAG_DEFAULT_CONFIG_FACTORY, IdsTagDefaultConfig } from './tag-defaults';
import { IdsTagAppearanceType } from './types/tag-appearance.type';
import { IdsTagVariantType } from './types/tag-variant.type';

import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, computed, contentChildren, inject, input } from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_TAG_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-tag,button[idsTag]',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[type]': '_hostType()',
  },
})
export class IdsTagComponent extends ComponentBaseWithDefaults<IdsTagDefaultConfig> {
  protected override get _componentName(): string {
    return 'tag';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_TAG_DEFAULT_CONFIG);

  private _hostElement = inject(ElementRef).nativeElement as HTMLElement;

  public appearance = input<IdsTagAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsTagVariantType>(this._defaultConfig.variant);

  public iconLeading = contentChildren<unknown>('[icon-leading]');
  public iconTrailing = contentChildren<unknown>('[icon-trailing]');

  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
    this.variant(),
  ]));

  private _hostType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }
}
