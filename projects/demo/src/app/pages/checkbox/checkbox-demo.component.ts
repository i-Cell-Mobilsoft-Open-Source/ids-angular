import { CheckboxDemoService } from './checkbox-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsCheckboxComponent, IdsCheckboxGroupComponent } from '@i-cell/ids-angular/checkbox';
import { IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-demo',
  imports: [
    TryoutComponent,
    IdsCheckboxComponent,
    IdsCheckboxGroupComponent,
    ReactiveFormsModule,
    FormsModule,
    IdsHintMessageComponent,
    TranslateModule,
  ],
  templateUrl: './checkbox-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './checkbox-demo.component.scss',
  ],
})
export class CheckboxDemoComponent {
  public checkboxDemoService = inject(CheckboxDemoService);
}
