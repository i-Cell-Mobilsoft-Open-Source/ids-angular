import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarVariantType, IDS_AVATAR_DEFAULT_CONFIG_FACTORY, IdsAvatarComponent, IdsAvatarImageDirective } from '@i-cell/ids-angular/avatar';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  SurfaceVariant,
  SurfaceVariantType,
  Size,
  SizeType,
  SizeCollectionType,
  SizeCollection,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

type AvatarPublicApi = {
  initials: string,
  size: SizeType,
  sizeCollection: SizeCollectionType,
  variant: AvatarVariantType,
};

const defaultConfig = IDS_AVATAR_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [
    IdsAvatarComponent,
    IdsIconComponent,
    IdsAvatarImageDirective,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './avatar-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './avatar-demo.component.scss',
  ],
})
export class AvatarDemoComponent {
  public sizes = Object.values<SizeType>(Size);
  public sizeCollections = Object.values<SizeCollectionType>(SizeCollection);
  public variants = Object.values<SurfaceVariantType>(SurfaceVariant);

  public defaults: AvatarPublicApi = {
    initials: 'SJ',
    size: defaultConfig.size,
    sizeCollection: defaultConfig.sizeCollection,
    variant: defaultConfig.variant,
  };

  public model: AvatarPublicApi = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
