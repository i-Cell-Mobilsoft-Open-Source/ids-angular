import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsSize,
  IdsSizeType,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsTagComponent, IdsTagAppearance, IdsTagAppearanceType, IdsTagVariantType, IdsTagVariant } from '@i-cell/ids-angular/tag';
import { TranslateModule } from '@ngx-translate/core';

type TagPublicApi = {
  appearance: IdsTagAppearanceType,
  size: IdsSizeType,
  variant: IdsTagVariantType,
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
    appearance: IdsTagAppearance.FILLED,
    size: IdsSize.COMFORTABLE,
    variant: IdsTagVariant.PRIMARY,
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  };
  
  public model: TagPublicApi & TagHelperControls = { ...this.defaults };

  public appearances = Object.values<IdsTagAppearanceType>(IdsTagAppearance);
  public sizes = Object.values<IdsSizeType>(IdsSize);
  public variants = Object.values<IdsTagVariantType>(IdsTagVariant);

  public onClick(tagName: string): void {
    // eslint-disable-next-line no-console
    console.log(`${tagName} tag clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
