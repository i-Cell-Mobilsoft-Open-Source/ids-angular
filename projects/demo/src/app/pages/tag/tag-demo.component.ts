import { Component } from '@angular/core';
import {
  AllVariants,
  AllVariantsType,
  BrandVariant,
  BrandVariantType,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsTagComponent, TagAppearance, TagAppearanceType } from '@i-cell/ids-angular/tag';
import { mdiCheck, mdiMagnify } from '@mdi/js';

@Component({
  standalone: true,
  selector: 'app-tag-demo',
  imports: [
    IdsTagComponent,
    IdsIconComponent,
  ],
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

  public onClick(tagName: string): void {
    // eslint-disable-next-line no-console
    console.log(`${tagName} tag clicked`);
  }
}
