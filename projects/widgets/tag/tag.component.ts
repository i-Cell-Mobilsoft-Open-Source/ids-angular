import { IDS_TAG_DEFAULT_CONFIG, IDS_TAG_DEFAULT_CONFIG_FACTORY, IdsTagDefaultConfig } from './tag-defaults';
import { IdsTagAppearanceType } from './types/tag-appearance.type';
import { IdsTagVariantType } from './types/tag-variant.type';

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  InjectionToken,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import {
  createClassList,
  IdsSizeType,
} from '@i-cell/ids-angular/core';

const defaultConfig = IDS_TAG_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-tag,button[idsTag]',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '_hostClasses()',
    '[type]': '_setType()',
  },
})
export class IdsTagComponent {
  private readonly _componentClass = 'ids-tag';
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_TAG_DEFAULT_CONFIG);

  private _hostElement = inject(ElementRef).nativeElement as HTMLElement;

  public appearance = input<IdsTagAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsTagVariantType>(this._defaultConfig.variant);

  public iconLeading = contentChildren<unknown>('[icon-leading]');
  public iconTrailing = contentChildren<unknown>('[icon-trailing]');

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.appearance(),
      this.size(),
      this.variant(),
    ]),
  );

  private _setType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }

  // eslint-disable-next-line @stylistic/js/max-len
  protected _getDefaultConfig(defaultConfig: Required<IdsTagDefaultConfig>, injectionToken: InjectionToken<IdsTagDefaultConfig>): Required<IdsTagDefaultConfig> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
