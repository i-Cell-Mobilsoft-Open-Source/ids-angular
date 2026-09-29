import { Component } from '@angular/core';
import { IdsSideSheetComponent } from '@i-cell/ids-angular/side-sheet';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-sheet-sizes-example',
  imports: [
    IdsSideSheetComponent,
    TranslateModule,
  ],
  templateUrl: './side-sheet-sizes-example.component.html',
  styleUrl: './side-sheet-sizes-example.component.scss',
})
export class SideSheetSizesExampleComponent {}
