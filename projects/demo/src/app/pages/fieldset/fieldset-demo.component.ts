import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { FormFieldVariant, FormFieldVariantType, IDS_FIELDSET_DEFAULT_CONFIG_FACTORY, IdsActionDirective, IdsErrorMessageComponent, IdsFieldsetComponent, IdsFieldsetMessageDirective, IdsFieldsetRowComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective, IdsPrefixDirective, IdsSuccessMessageComponent, IdsSuffixDirective } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { mdiMagnify, mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';

type FieldsetPublicApi = {
  size: SizeType,
  variant: FormFieldVariantType,
  legend: string,
};

type FieldsetHelperControls = {
  showMessage: boolean,
};

const defaultConfig = IDS_FIELDSET_DEFAULT_CONFIG_FACTORY();

@Component({
  standalone: true,
  selector: 'app-fieldset-demo',
  imports: [
    IdsFieldsetComponent,
    IdsFieldsetMessageDirective,
    IdsFieldsetRowComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsPrefixDirective,
    IdsSuffixDirective,
    IdsActionDirective,
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsHintMessageComponent,
    IdsSuccessMessageComponent,
    IdsErrorMessageComponent,
    FormsModule,
    UpperCasePipe,
    TranslateModule,
    IdsButtonComponent,
  ],
  templateUrl: './fieldset-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './fieldset-demo.component.scss',
  ],
})
export class FieldsetDemoComponent {
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(FormFieldVariant) as FormFieldVariantType[];

  public iconSun = mdiWhiteBalanceSunny;
  public iconMoon = mdiMoonWaningCrescent;
  public searchIcon = mdiMagnify;

  public defaults: FieldsetPublicApi & FieldsetHelperControls = {
    size: defaultConfig.size,
    variant: defaultConfig.variant,
    legend: 'Legend',
    showMessage: true,
  };

  public model: FieldsetPublicApi & FieldsetHelperControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
