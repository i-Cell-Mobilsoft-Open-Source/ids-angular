import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
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
import { TranslateModule } from '@ngx-translate/core';

type TagPublicApi = {
  appearance: TagAppearanceType,
  size: SizeType,
  variant: AllVariantsType,
};

type TagHelperControls = {
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
};

@Component({
  standalone: true,
  selector: 'app-tag-demo',
  imports: [
    IdsTagComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './tag-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tag-demo.component.scss',
  ],
})
export class TagDemoComponent {
  public defaults: TagPublicApi & TagHelperControls = {
    appearance: TagAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: AllVariants.PRIMARY,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  };
  
  public model: TagPublicApi & TagHelperControls = { ...this.defaults };

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

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
