import { FormFieldDemoService } from './form-field-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective, IdsPrefixDirective, IdsSuffixDirective, IdsFormFieldActionDirective, IdsErrorDefinitionDirective, IdsSuccessMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-demo',
  imports: [
    TryoutComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsPrefixDirective,
    IdsSuffixDirective,
    IdsFormFieldActionDirective,
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    IdsSuccessMessageComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './form-field-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './form-field-demo.component.scss',
  ],
})
export class FormFieldDemoComponent {
  public formFieldDemoService = inject(FormFieldDemoService);
}
