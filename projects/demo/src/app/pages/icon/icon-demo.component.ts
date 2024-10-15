import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeCollection, SizeCollectionType, SizeType } from '@i-cell/ids-angular/core';
import { IconSource, IconVariant, IconVariantType, IDS_ICON_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/icon';
import { IdsIconComponent } from '@i-cell/ids-angular/icon/icon.component';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_ICON_DEFAULT_CONFIG_FACTORY();

type IconPublicApi = {
  size: SizeType,
  sizeCollection: SizeCollectionType,
  variant: IconVariantType,
  fontIcon: string
  svgIconName: string,
  ariaHidden: boolean,
};

@Component({
  standalone: true,
  selector: 'app-icon-demo',
  imports: [
    IdsIconComponent,
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
    svgIconName: 'moon',
    ariaHidden: false,
  };

  public model: IconPublicApi = { ...this.defaults  };
  
  public sizes = Object.values<SizeType>(Size);
  public sizeCollections = Object.values<SizeCollectionType>(SizeCollection);
  public variants = Object.values<IconVariantType>(IconVariant);

  public sourceType = IconSource;

  public sizeCollectionType: SizeCollectionType[] = [
    SizeCollection.SMALL,
    SizeCollection.BIG,
  ];

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
