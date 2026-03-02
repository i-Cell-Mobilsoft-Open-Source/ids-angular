import { SelectDemoService } from './select-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsLabelDirective, IdsOptionComponent, IdsOptionGroupComponent, IdsErrorDefinitionDirective, IdsSuccessMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent, IdsSelectTriggerDirective } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-demo',
  imports: [
    TryoutComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsHintMessageComponent,
    IdsSuccessMessageComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    FormsModule,
    TranslateModule,
    IdsOptionComponent,
    IdsOptionGroupComponent,
    IdsSelectTriggerDirective,
    KeyValuePipe,
    TitleCasePipe,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './select-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './select-demo.component.scss',
  ],
})
export class SelectDemoComponent {
  protected _selectDemoService = inject(SelectDemoService);
}
