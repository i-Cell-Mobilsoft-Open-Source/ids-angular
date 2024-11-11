import { IDS_TAG_DEFAULT_CONFIG, IDS_TAG_DEFAULT_CONFIG_FACTORY, IdsTagDefaultConfig } from './tag-defaults';
import { IdsTagGroupComponent } from './tag-group.component';
import { IdsTagAppearanceType } from './types/tag-appearance.type';
import { IdsTagVariantType } from './types/tag-variant.type';

import { IdsIconComponent } from '../icon';

import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, computed, contentChildren, inject, input } from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_TAG_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-tag,a[idsTag]',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[type]': '_hostType',
  },
})
export class IdsTagComponent extends ComponentBaseWithDefaults<IdsTagDefaultConfig> {
  protected override get _hostName(): string {
    return 'tag';
  }

  private readonly _tagGroup = inject(IdsTagGroupComponent, { optional: true });

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_TAG_DEFAULT_CONFIG);

  private _hostElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  public iconLeading = contentChildren<IdsIconComponent>('ids-icon[icon-leading]');
  public iconTrailing = contentChildren<IdsIconComponent>('ids-icon[icon-trailing]');

  public appearance = input<IdsTagAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsTagVariantType>(this._defaultConfig.variant);

  private _parentOrSelfAppearance = computed(() => this._tagGroup?.appearance() ?? this.appearance());
  private _parentOrSelfSize = computed(() => this._tagGroup?.size() ?? this.size());

  protected _hostClasses = computed(() => this._getHostClasses([
    this._parentOrSelfAppearance(),
    this._parentOrSelfSize(),
    this.variant(),
  ]));

  private get _hostType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }
}
