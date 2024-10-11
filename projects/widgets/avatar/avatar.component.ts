import { IDS_AVATAR_DEFAULT_CONFIG, IDS_AVATAR_DEFAULT_CONFIG_FACTORY, IdsAvatarDefaultConfig } from './avatar-defaults';
import { AvatarType, AvatarTypeType } from './types/avatar-type.type';
import { AvatarVariantType } from './types/avatar-variant.type';

import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input } from '@angular/core';
import { ComponentBaseWithDefaults, SizeCollectionType, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_AVATAR_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'button[idsAvatar]',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './avatar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsAvatarComponent extends ComponentBaseWithDefaults<IdsAvatarDefaultConfig> {
  protected override get _componentName(): string {
    return 'fieldset';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_AVATAR_DEFAULT_CONFIG);
  
  protected readonly _avatarType = AvatarType;

  public imageSrc = input<string | null>(null);
  public imageAlt = input<string | null>(null);
  public avatarType = input<AvatarTypeType>(this._defaultConfig.type, { alias: 'type' });
  public size = input<SizeType | null>(this._defaultConfig.size);
  public sizeCollection = input<SizeCollectionType | null>(this._defaultConfig.sizeCollection);
  public variant = input<AvatarVariantType | null>(this._defaultConfig.variant);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.avatarType(),
    this.size(),
    this.sizeCollection(),
    this.variant(),
  ]));
}
