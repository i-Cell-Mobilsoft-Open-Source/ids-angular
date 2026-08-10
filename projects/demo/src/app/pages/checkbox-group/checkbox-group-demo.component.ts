import { CheckboxGroupDemoService } from './checkbox-group-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsCheckboxComponent, IdsCheckboxGroupComponent } from '@i-cell/ids-angular/checkbox';
import { IdsErrorDefinitionDirective, IdsErrorMessageComponent, IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-group-demo',
  imports: [
    TryoutComponent,
    IdsCheckboxComponent,
    IdsCheckboxGroupComponent,
    ReactiveFormsModule,
    FormsModule,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    TranslateModule,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './checkbox-group-demo.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: [
    '../demo-page.scss',
    './checkbox-group-demo.component.scss',
  ],
})
export class CheckboxGroupDemoComponent {
  protected _checkboxGroupDemoService = inject(CheckboxGroupDemoService);
}
