import { IDS_AVATAR_DEFAULT_CONFIG, IDS_AVATAR_DEFAULT_CONFIG_FACTORY, IdsAvatarDefaultConfig } from './avatar-defaults';
import { IdsAvatarImageDirective } from './avatar-image.directive';
import { IdsAvatarType } from './types/avatar-type.type';
import { IdsAvatarVariantType } from './types/avatar-variant.type';

import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, contentChild, input } from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_AVATAR_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-avatar',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './avatar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsAvatarComponent extends ComponentBaseWithDefaults<IdsAvatarDefaultConfig> {
  protected override get _componentName(): string {
    return 'avatar';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_AVATAR_DEFAULT_CONFIG);
  
  protected readonly _avatarType = IdsAvatarType;

  private _iconChild = contentChild(IdsIconComponent);
  private _imageChild = contentChild(IdsAvatarImageDirective);

  public initials = input<string | null>(null);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public sizeCollection = input<IdsSizeCollectionType>(this._defaultConfig.sizeCollection);
  public variant = input<IdsAvatarVariantType>(this._defaultConfig.variant);

  private _implicitAvatarType = computed(() => {
    if (this._iconChild() && !this._imageChild()) {
      return IdsAvatarType.ICON;
    }
    if (this._imageChild() && !this._iconChild()) {
      return IdsAvatarType.IMAGE;
    }
    return IdsAvatarType.INITIALS;
  });

  public avatarType = computed(() => this._implicitAvatarType() ?? this._defaultConfig.type);

  protected _hostClasses = computed(() => this._getHostClasses([
    [
      'type',
      this.avatarType(),
    ],
    [
      `${this.sizeCollection()}collection`,
      this.size(),
    ],
    this.variant(),
  ]));
}
