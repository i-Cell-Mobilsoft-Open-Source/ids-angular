import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsAvatarComponent } from '@i-cell/ids-angular/avatar';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  SurfaceVariant,
  SurfaceVariantType,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';
import { TranslateModule } from '@ngx-translate/core';

type AvatarPublicApi = {
  image: string,
  alt: string,
  type: string,
  size: SizeType,
  variant: SurfaceVariantType,
};

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [
    IdsAvatarComponent,
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
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(SurfaceVariant) as SurfaceVariantType[];

  public defaults: AvatarPublicApi = {
    image: 'https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg',
    alt: 'Sample avatar',
    type: 'button',
    size: Size.COMFORTABLE,
    variant: SurfaceVariant.PRIMARY,
  };

  public model: AvatarPublicApi = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
