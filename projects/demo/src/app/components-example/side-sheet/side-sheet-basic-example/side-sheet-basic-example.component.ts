import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSideSheetComponent } from '@i-cell/ids-angular/side-sheet';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-sheet-basic-example',
  imports: [
    IdsSideSheetComponent,
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './side-sheet-basic-example.component.html',
})
export class SideSheetBasicExampleComponent {
  protected _inlineOpen = false;
  protected _overlayOpen = false;
}
