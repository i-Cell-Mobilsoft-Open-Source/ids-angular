import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSideSheetComponent } from '@i-cell/ids-angular/side-sheet';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-sheet-footer-example',
  imports: [
    IdsSideSheetComponent,
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './side-sheet-footer-example.component.html',
})
export class SideSheetFooterExampleComponent {}
