import { Component } from '@angular/core';
import { IdsSideSheetComponent } from '@i-cell/ids-angular/side-sheet';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-sheet-scrollable-example',
  imports: [
    IdsSideSheetComponent,
    TranslateModule,
  ],
  templateUrl: './side-sheet-scrollable-example.component.html',
})
export class SideSheetScrollableExampleComponent {}
