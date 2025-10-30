import { FieldsetDemoService } from './fieldset-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IdsErrorMessageComponent,
  IdsFieldsetComponent,
  IdsFieldsetMessageDirective,
  IdsFieldsetRowComponent,
  IdsFormFieldComponent,
  IdsHintMessageComponent,
  IdsInputDirective,
  IdsLabelDirective,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-fieldset-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsFieldsetComponent,
    IdsFieldsetMessageDirective,
    IdsFieldsetRowComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './fieldset-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './fieldset-demo.component.scss',
  ],
})
export class FieldsetDemoComponent {
  public fieldsetDemoService = inject(FieldsetDemoService);

  public first = 'John';
  public last = 'Wick';
  public middle = 'Sam';

  public reset(): void {
    this.fieldsetDemoService.reset();
    this.first = 'John';
    this.last = 'Wick';
    this.middle = 'Sam';
  }
}
