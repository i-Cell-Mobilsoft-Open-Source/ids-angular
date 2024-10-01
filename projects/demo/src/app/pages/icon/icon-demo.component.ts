import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IconSizeCollection, IconSizeCollectionType, IconSource, IconVariant, IconVariantType, IDS_ICON_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/icon';
import { IdsIconV2Component } from '@i-cell/ids-angular/icon/icon.component';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_ICON_DEFAULT_CONFIG_FACTORY();

type IconPublicApi = {
  size: SizeType,
  sizeCollection: IconSizeCollectionType,
  variant: IconVariantType,
  fontIcon: string
  svgIconName: string,
  ariaHidden: boolean,
};

@Component({
  standalone: true,
  selector: 'app-icon-demo',
  imports: [
    IdsIconV2Component,
    UpperCasePipe,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './icon-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './icon-demo.component.scss',
  ],
})
export class IconDemoComponent {
  public defaults: IconPublicApi = {
    size: defaultConfig.size,
    sizeCollection: defaultConfig.sizeCollection,
    variant: defaultConfig.variant,
    fontIcon: 'moon',
    svgIconName: 'user',
    ariaHidden: false,
  };

  public model: IconPublicApi = { ...this.defaults  };
  
  public sizes = Object.values(Size) as SizeType[];
  public sizeCollections = Object.values(IconSizeCollection) as IconSizeCollectionType[];
  public variants = Object.values(IconVariant) as IconVariantType[];

  public sourceType = IconSource;

  public sizeCollectionType: IconSizeCollectionType[] = [
    IconSizeCollection.SMALL,
    IconSizeCollection.BIG,
  ];

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
