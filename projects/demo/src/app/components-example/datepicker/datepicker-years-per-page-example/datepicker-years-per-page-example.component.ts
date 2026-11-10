import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsDatepickerDirective, IdsDatepickerTriggerComponent } from '@i-cell/ids-angular/datepicker';
import {
  IdsFormFieldComponent,
  IdsInputDirective,
  IdsLabelDirective,
  IdsSuffixDirective,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const defaultPageSize = 24;

@Component({
  selector: 'app-datepicker-years-per-page-example',
  imports: [
    FormsModule,
    IdsDatepickerDirective,
    IdsDatepickerTriggerComponent,
    IdsFormFieldComponent,
    IdsInputDirective,
    IdsLabelDirective,
    IdsSuffixDirective,
    TranslateModule,
  ],
  templateUrl: './datepicker-years-per-page-example.component.html',
})
export class DatepickerYearsPerPageExampleComponent {
  public yearsPerPage = defaultPageSize;
  public date: Date | null = new Date();
}
