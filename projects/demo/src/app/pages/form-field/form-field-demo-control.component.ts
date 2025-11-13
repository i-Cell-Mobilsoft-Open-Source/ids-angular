import { FormFieldDemoService } from './form-field-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './form-field-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './form-field-demo.component.scss',
  ],
})
export class FormFieldDemoControlComponent {
  public formFieldDemoService = inject(FormFieldDemoService);
}
