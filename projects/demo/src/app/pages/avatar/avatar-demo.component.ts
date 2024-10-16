import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsAvatarVariantType, IDS_AVATAR_DEFAULT_CONFIG_FACTORY, IdsAvatarComponent, IdsAvatarImageDirective } from '@i-cell/ids-angular/avatar';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsSurfaceVariant,
  IdsSurfaceVariantType,
  IdsSize,
  IdsSizeType,
  IdsSizeCollectionType,
  IdsSizeCollection,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

type AvatarPublicApi = {
  initials: string,
  size: IdsSizeType,
  sizeCollection: IdsSizeCollectionType,
  variant: IdsAvatarVariantType,
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
  public sizes = Object.values<IdsSizeType>(IdsSize);
  public sizeCollections = Object.values<IdsSizeCollectionType>(IdsSizeCollection);
  public variants = Object.values<IdsSurfaceVariantType>(IdsSurfaceVariant);

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
