import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsFormFieldComponent, IdsLabelDirective, IdsOptionComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-sizes-example',
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsOptionComponent,
    TranslateModule,
  ],
  templateUrl: './select-sizes-example.component.html',
})
export class SelectSizesExampleComponent {
  public denseValue: string | null = null;
  public compactValue: string | null = null;
  public comfortableValue: string | null = null;
  public spaciousValue: string | null = null;
}
