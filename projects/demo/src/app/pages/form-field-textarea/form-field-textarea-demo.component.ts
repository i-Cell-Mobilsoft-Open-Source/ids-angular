import { FormFieldTextareaDemoService } from './form-field-textarea-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { FORM_FIELD_TEXTAREA_EXAMPLES } from '../../components-example/form-field-textarea/form-field-textarea-examples';
import { IdsExampleViewerComponent } from '../../shared/ids-example-viewer/ids-example-viewer.component';

import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective, IdsErrorDefinitionDirective, IdsSuccessMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-textarea-demo',
  imports: [
    TryoutComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    IdsSuccessMessageComponent,
    ReactiveFormsModule,
    TranslateModule,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
    IdsExampleViewerComponent,
  ],
  templateUrl: './form-field-textarea-demo.component.html',
  styleUrls: ['../demo-page.scss'],
})
export class FormFieldTextareaDemoComponent {
  protected _formFieldDemoService = inject(FormFieldTextareaDemoService);
  public readonly formFieldTextareaExamples = FORM_FIELD_TEXTAREA_EXAMPLES;
}
