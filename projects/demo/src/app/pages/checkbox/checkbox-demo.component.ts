import { CheckboxDemoService } from './checkbox-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { CHECKBOX_EXAMPLES } from '../../components-example/checkbox/checkbox-examples';
import { IdsExampleViewerComponent } from '../../shared/ids-example-viewer/ids-example-viewer.component';

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsCheckboxComponent } from '@i-cell/ids-angular/checkbox';
import { IdsErrorDefinitionDirective, IdsErrorMessageComponent, IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-demo',
  imports: [
    TryoutComponent,
    IdsCheckboxComponent,
    ReactiveFormsModule,
    FormsModule,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    TranslateModule,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
    IdsExampleViewerComponent,
  ],
  templateUrl: './checkbox-demo.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: [
    '../demo-page.scss',
    './checkbox-demo.component.scss',
  ],
})
export class CheckboxDemoComponent {
  protected _checkboxDemoService = inject(CheckboxDemoService);
  public readonly checkboxExamples = CHECKBOX_EXAMPLES;
}
