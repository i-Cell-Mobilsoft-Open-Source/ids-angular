import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsActionDirective, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsLabelDirective, IdsPrefixDirective, IdsSuffixDirective } from '@i-cell/ids-angular/forms';
import { IdsInputDirective } from '@i-cell/ids-angular/forms/components/input/ids-input.directive';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { mdiMagnify, mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-demo',
  standalone: true,
  imports: [
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsPrefixDirective,
    IdsSuffixDirective,
    IdsActionDirective,
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './form-field-demo.component.html',
  styleUrl: './form-field-demo.component.scss',
})
export class FormFieldDemoComponent {
  public iconSun = mdiWhiteBalanceSunny;
  public iconMoon = mdiMoonWaningCrescent;
  public searchIcon = mdiMagnify;
}
