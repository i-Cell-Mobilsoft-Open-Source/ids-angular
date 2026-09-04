import { FormFieldInputDemoService } from './form-field-input-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { FORM_FIELD_INPUT_EXAMPLES } from '../../components-example/form-field-input/form-field-input-examples';
import { IdsExampleViewerComponent } from '../../shared/ids-example-viewer/ids-example-viewer.component';

import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective, IdsPrefixDirective, IdsSuffixDirective, IdsFormFieldActionDirective, IdsErrorDefinitionDirective, IdsSuccessMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-input-demo',
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
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
    IdsExampleViewerComponent,
  ],
  templateUrl: './form-field-input-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './form-field-input-demo.component.scss',
  ],
})
export class FormFieldInputDemoComponent {
  protected _formFieldDemoService = inject(FormFieldInputDemoService);
  public readonly formFieldInputExamples = FORM_FIELD_INPUT_EXAMPLES;
}
