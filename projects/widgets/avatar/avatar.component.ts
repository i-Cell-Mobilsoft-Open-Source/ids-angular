import { IdsAvatarImageDirective } from './avatar-image.directive';
import { IDS_AVATAR_DEFAULT_CONFIG, IDS_AVATAR_DEFAULT_CONFIG_FACTORY, IdsAvatarDefaultConfig } from './tokens/avatar-defaults';
import { IDS_AVATAR_PARENT } from './tokens/avatar-parent';
import { IdsAvatarType } from './types/avatar-type.type';
import { IdsAvatarVariant, IdsAvatarVariantType } from './types/avatar-variant.type';

import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, contentChild, inject, input } from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_ICON_PARENT, IdsIconComponent, IdsIconParent, IdsIconVariant, IdsIconVariantType } from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_AVATAR_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-avatar',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './avatar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IDS_ICON_PARENT,
      useExisting: IdsAvatarComponent,
    },
  ],
})
export class IdsAvatarComponent extends ComponentBaseWithDefaults<IdsAvatarDefaultConfig> implements IdsIconParent {
  protected override get _componentName(): string {
    return 'avatar';
  }

  private readonly _parent = inject(IDS_AVATAR_PARENT, { optional: true });

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

  private _parentOrSelfVariant = computed(() => this._parent?.embeddedAvatarVariant() ?? this.variant());

  protected _hostClasses = computed(() => this._getHostClasses([
    [
      'type',
      this.avatarType(),
    ],
    [
      `${this.sizeCollection()}collection`,
      this.size(),
    ],
    this._parentOrSelfVariant(),
  ]));

  public embeddedIconVariant = computed<IdsIconVariantType>(() => {
    const avatarVariant = this._parentOrSelfVariant();
    switch (avatarVariant) {
      case IdsAvatarVariant.PRIMARY:
      case IdsAvatarVariant.SECONDARY:
      case IdsAvatarVariant.DARK:
        return IdsIconVariant.LIGHT;

      case IdsAvatarVariant.SURFACE:
        return IdsIconVariant.SURFACE;

      case IdsAvatarVariant.LIGHT:
        return IdsIconVariant.SURFACE;
    }
  });
}
