import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsAvatarComponent } from '@i-cell/ids-angular/avatar';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsChipAppearance, IdsChipAppearanceType, IdsChipVariant, IdsChipVariantType, IDS_CHIP_DEFAULT_CONFIG_FACTORY, IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsPrefixDirective } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_CHIP_DEFAULT_CONFIG_FACTORY();

type ChipPublicApi = {
  appearance: IdsChipAppearanceType,
  size: IdsSizeType,
  variant: IdsChipVariantType,
  closable: boolean,
  disabled: boolean,
};

type ChipHelperControls = {
  hasAvatar: boolean,
  hasLeadingIcon: boolean,
  label: string,
  hasTrailingIconButton: boolean,
};

@Component({
  selector: 'app-chip-demo',
  standalone: true,
  imports: [
    IdsChipComponent,
    IdsAvatarComponent,
    IdsButtonComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsPrefixDirective,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './chip-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './chip-demo.component.scss',
  ],
})
export class ChipDemoComponent {
  public appearances = Object.values<IdsChipAppearanceType>(IdsChipAppearance);
  public sizes = Object.values<IdsSizeType>(IdsSize);
  public variants = Object.values<IdsChipVariantType>(IdsChipVariant);

  public defaults: ChipPublicApi & ChipHelperControls = {
    appearance: defaultConfig.appearance,
    size: defaultConfig.size,
    variant: defaultConfig.variant,
    closable: defaultConfig.closable,
    disabled: false,
    hasAvatar: false,
    hasLeadingIcon: false,
    label: 'Label',
    hasTrailingIconButton: false,
  };

  public model: ChipPublicApi & ChipHelperControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
