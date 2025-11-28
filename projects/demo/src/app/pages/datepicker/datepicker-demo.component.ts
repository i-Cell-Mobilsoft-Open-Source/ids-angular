import { DatepickerDemoService } from './datepicker-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsDatepickerDirective, IdsDatepickerTriggerComponent } from '@i-cell/ids-angular/datepicker';
import {  IdsErrorMessageComponent, IdsFormFieldComponent, IdsInputDirective, IdsLabelDirective, IdsSuffixDirective, IdsErrorDefinitionDirective } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-datepicker-demo',
  imports: [
    TryoutComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsSuffixDirective,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IdsDatepickerDirective,
    IdsDatepickerTriggerComponent,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './datepicker-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './datepicker-demo.component.scss',
  ],
})
export class DatepickerDemoComponent {
  public datepickerDemoService = inject(DatepickerDemoService);
}
