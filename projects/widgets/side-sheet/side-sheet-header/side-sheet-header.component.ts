import { Component, input, output } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import {
  IdsSideSheetHeader, IdsSideSheetPosition,
  IdsSideSheetType,
} from '@i-cell/ids-angular/side-sheet/types/side-sheet.type';

@Component({
  selector: 'app-side-sheet-header',
  standalone: true,
  templateUrl: './side-sheet-header.component.html',
  imports: [
    IdsIconComponent,
    IdsIconButtonComponent,
  ],
  styleUrls: ['./side-sheet-header.component.scss'],
})
export class SideSheetHeaderComponent {
  protected _idsSideSheetType = IdsSideSheetType;
  protected _idsSideSheetHeaderType = IdsSideSheetHeader;
  protected _idsSideSheetPositionType = IdsSideSheetPosition;
  public closed = output();
  public backClicked = output();

  public title = input<string>();
  public header = input();
  public backButton = input();
  public isClosable = input();

  protected _close(): void {
    this.closed.emit();
  }

  protected _onBack(): void {
    this.backClicked.emit();
  }

}
