import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IconSizeCollection, IconSizeCollectionType, IconSource, IconVariant, IconVariantType } from '@i-cell/ids-angular/icon';
import { IdsIconV2Component } from '@i-cell/ids-angular/icon/icon.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-icon-demo',
  imports: [
    IdsIconV2Component,
    UpperCasePipe,
    TranslateModule,
  ],
  templateUrl: './icon-demo.component.html',
  styleUrls: ['./icon-demo.component.scss'],
})
export class IconDemoComponent {
  public sizes: SizeType[] = [
    Size.DENSE,
    Size.COMPACT,
    Size.COMFORTABLE,
    Size.SPACIOUS,
  ];

  public variants: IconVariantType[] = [
    IconVariant.PRIMARY,
    IconVariant.SECONDARY,
    IconVariant.LIGHT,
    IconVariant.DARK,
    IconVariant.ERROR,
    IconVariant.SUCCESS,
    IconVariant.WARNING,
    IconVariant.BRAND,
    IconVariant.SURFACE,
  ];

  public sourceType = IconSource;

  public sizeCollectionType: IconSizeCollectionType[] = [
    IconSizeCollection.SMALL,
    IconSizeCollection.BIG,
  ];
}
