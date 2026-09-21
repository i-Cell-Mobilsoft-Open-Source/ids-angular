import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsFormFieldComponent, IdsHintMessageComponent, IdsLabelDirective, IdsOptionComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent, IdsSelectTriggerDirective } from '@i-cell/ids-angular/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-custom-trigger-example',
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsSelectTriggerDirective,
    IdsOptionComponent,
    IdsHintMessageComponent,
    TranslateModule,
  ],
  templateUrl: './select-custom-trigger-example.component.html',
  styleUrl: './select-custom-trigger-example.component.scss',
})
export class SelectCustomTriggerExampleComponent {
  private readonly _translate = inject(TranslateService);

  public value: string[] = [
    'APPLE',
    'BANANA',
    'CHERRY',
  ];

  public getFruitLabel(key: string): string {
    return this._translate.instant(`EXAMPLES.SELECT.FRUITS.${key}`);
  }
}
