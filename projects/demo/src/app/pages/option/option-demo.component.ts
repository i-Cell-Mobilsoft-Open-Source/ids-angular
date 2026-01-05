import { OptionDemoService } from './option-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { PropTableComponent } from '../../components/prop-table/prop-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsOptionComponent, IdsOptionGroupComponent, IdsFormFieldComponent, IdsLabelDirective } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-option-demo',
  imports: [
    DemoAndCodeComponent,
    TryoutComponent,
    TranslateModule,
    IdsOptionComponent,
    IdsOptionGroupComponent,
    ControlTableComponent,
    TryoutControlComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    TryoutComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    FormsModule,
    TranslateModule,
    IdsOptionComponent,
    IdsOptionGroupComponent,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
    PropTableComponent,
  ],
  templateUrl: './option-demo.component.html',
  styleUrls: ['./option-demo.component.scss'],
})

export class OptionDemoComponent {
  protected _optionDemoService = inject(OptionDemoService);

  public onSelectionChange(event: unknown): void {
    console.info('Option selected:', event);
  }
}
