import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSideSheetComponent } from '@i-cell/ids-angular/side-sheet';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-sheet-position-example',
  imports: [
    IdsSideSheetComponent,
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './side-sheet-position-example.component.html',
})
export class SideSheetPositionExampleComponent {
  protected _rightOpen = false;
  protected _leftOpen = false;

  protected _openRight(): void {
    this._rightOpen = true;
  }

  protected _openLeft(): void {
    this._leftOpen = true;
  }

  protected _closeRight(): void {
    this._rightOpen = false;
  }

  protected _closeLeft(): void {
    this._leftOpen = false;
  }
}
