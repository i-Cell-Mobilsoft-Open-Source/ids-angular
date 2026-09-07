import { Component, computed, inject, viewChild } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IdsCustomDialogBase,
  IdsDialogComponent,
  IdsDialogHeaderDirective,
  IdsDialogService,
} from '@i-cell/ids-angular/dialog';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-custom-header-dynamic-dialog',
  imports: [
    IdsButtonComponent,
    IdsDialogComponent,
    IdsDialogHeaderDirective,
    IdsIconComponent,
    TranslateModule,
  ],
  templateUrl: './dialog-custom-header-dynamic-dialog.component.html',
})
export class DialogCustomHeaderDynamicDialogComponent extends IdsCustomDialogBase {
  private readonly _idsDialog = viewChild(IdsDialogComponent);

  public override size = computed<IdsSizeType | undefined>(() => this._idsDialog()?.size());
}

@Component({
  selector: 'app-dialog-custom-header-example',
  imports: [
    IdsButtonComponent,
    IdsDialogComponent,
    IdsDialogHeaderDirective,
    IdsIconComponent,
    TranslateModule,
  ],
  templateUrl: './dialog-custom-header-example.component.html',
})
export class DialogCustomHeaderExampleComponent {
  private readonly _dialogService = inject(IdsDialogService);

  public openDynamicDialog(): void {
    this._dialogService.open(DialogCustomHeaderDynamicDialogComponent).subscribe();
  }
}
