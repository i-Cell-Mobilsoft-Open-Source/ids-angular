import { IdsSideSheetHeader } from '../types/side-sheet.type';

import { Component, input, output } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';

@Component({
  selector: 'app-side-sheet-header',
  standalone: true,
  templateUrl: './side-sheet-header.component.html',
  imports: [
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsTooltipDirective,
  ],
})
export class SideSheetHeaderComponent {
  protected _idsSideSheetHeaderType = IdsSideSheetHeader;
  public closed = output();
  public backClicked = output();

  public title = input<string>();
  public header = input();
  public backButton = input();
  public isClosable = input();
  public isShowHeader = input<boolean>(false);
  public closeTooltipText = input<string>('');

  protected _onClose(): void {
    this.closed.emit();
  }

  protected _onBack(): void {
    this.backClicked.emit();
  }

}
