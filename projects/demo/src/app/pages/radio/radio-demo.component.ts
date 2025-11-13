import { RadioDemoService } from './radio-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsRadioGroupDirective, IdsRadioComponent } from '@i-cell/ids-angular/radio';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-radio-demo',
  imports: [
    TryoutComponent,
    IdsCardComponent,
    IdsRadioGroupDirective,
    IdsRadioComponent,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './radio-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './radio-demo.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class RadioDemoComponent {
  public radioDemoService = inject(RadioDemoService);
}
