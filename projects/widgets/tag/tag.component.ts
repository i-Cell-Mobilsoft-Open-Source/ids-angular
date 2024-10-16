import { IDS_TAG_DEFAULT_CONFIG, IDS_TAG_DEFAULT_CONFIG_FACTORY, IdsTagDefaultConfig } from './tag-defaults';
import { TagAppearanceType } from './types/tag-appearance.type';

import {
  Component,
  ElementRef,
  HostBinding,
  InjectionToken,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import {
  AllVariantsType,
  createClassList,
  SizeType,
} from '@i-cell/ids-angular/core';

const defaultConfig = IDS_TAG_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-tag,button[idsTag]',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsTagComponent {
  private readonly _componentClass = 'ids-tag';
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_TAG_DEFAULT_CONFIG);

  private _hostElement = inject(ElementRef).nativeElement as HTMLElement;

  public appearance = input<TagAppearanceType>(this._defaultConfig.appearance);
  public size = input<SizeType>(this._defaultConfig.size);
  public variant = input<AllVariantsType>(this._defaultConfig.variant);

  public iconLeading = contentChildren<unknown>('[icon-leading]');
  public iconTrailing = contentChildren<unknown>('[icon-trailing]');

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.appearance(),
      this.size(),
      this.variant(),
    ]),
  );

  @HostBinding('type') get buttonType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  // eslint-disable-next-line @stylistic/js/max-len
  protected _getDefaultConfig(defaultConfig: Required<IdsTagDefaultConfig>, injectionToken: InjectionToken<IdsTagDefaultConfig>): Required<IdsTagDefaultConfig> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
