import { Component } from '@angular/core';
import {
  AllVariants,
  AllVariantsType,
  BrandVariant,
  BrandVariantType,
  TagAppearance,
  TagAppearanceType,
  Size,
  SizeType,
} from '@i-cell/widgets/core';
import { IdsIconComponent } from '@i-cell/widgets/icon';
import { IdsTagComponent } from '@i-cell/widgets/tag';
import { mdiCheck, mdiMagnify } from '@mdi/js';

@Component({
  standalone: true,
  selector: 'app-tag-demo',
  imports: [IdsTagComponent, IdsIconComponent],
  templateUrl: './tag-demo.component.html',
  styleUrls: ['./tag-demo.component.scss'],
})
export class TagDemoComponent {
  public appearances = Object.values(TagAppearance) as TagAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  public baseVariants = Object.values(BrandVariant) as BrandVariantType[];
  public variants = Object.values(AllVariants) as AllVariantsType[];

  public mdiSearch = mdiMagnify;
  public mdiDone = mdiCheck;

  onClick(tagName: string) {
    console.log(`${tagName} tag clicked`);
  }
}
