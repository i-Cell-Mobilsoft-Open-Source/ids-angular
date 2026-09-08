import { Component, computed, inject, viewChild } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsCustomDialogBase, IdsDialogComponent, IdsDialogService } from '@i-cell/ids-angular/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-long-content-dynamic-dialog',
  imports: [
    IdsButtonComponent,
    IdsDialogComponent,
    TranslateModule,
  ],
  templateUrl: './dialog-long-content-dynamic-dialog.component.html',
})
export class DialogLongContentDynamicDialogComponent extends IdsCustomDialogBase {
  private readonly _idsDialog = viewChild(IdsDialogComponent);

  public override size = computed<IdsSizeType | undefined>(() => this._idsDialog()?.size());
}

@Component({
  selector: 'app-dialog-long-content-example',
  imports: [
    IdsButtonComponent,
    IdsDialogComponent,
    TranslateModule,
  ],
  templateUrl: './dialog-long-content-example.component.html',
})
export class DialogLongContentExampleComponent {
  private readonly _dialogService = inject(IdsDialogService);

  public openDynamicDialog(): void {
    this._dialogService.open(DialogLongContentDynamicDialogComponent).subscribe();
  }
}
