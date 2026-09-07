import { Component, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsCustomDialogBase, IdsDialogComponent, IdsDialogService } from '@i-cell/ids-angular/dialog';
import {
  IdsFormFieldComponent,
  IdsInputDirective,
  IdsLabelDirective,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-input-result-dynamic-dialog',
  imports: [
    FormsModule,
    IdsButtonComponent,
    IdsDialogComponent,
    IdsFormFieldComponent,
    IdsInputDirective,
    IdsLabelDirective,
    TranslateModule,
  ],
  templateUrl: './dialog-input-result-dynamic-dialog.component.html',
})
export class DialogInputResultDynamicDialogComponent extends IdsCustomDialogBase<string | null> {
  public initialValue = input('');

  public dialogInput = '';

  private readonly _idsDialog = viewChild(IdsDialogComponent);

  public override size = computed<IdsSizeType | undefined>(() => this._idsDialog()?.size());

  constructor() {
    super();
    effect(() => {
      this.dialogInput = this.initialValue();
    });
  }

  public onConfirm(): void {
    const value = this.dialogInput.trim();
    this.close(value.length ? value : null);
  }
}

@Component({
  selector: 'app-dialog-input-result-example',
  imports: [
    FormsModule,
    IdsButtonComponent,
    IdsDialogComponent,
    IdsFormFieldComponent,
    IdsInputDirective,
    IdsLabelDirective,
    TranslateModule,
  ],
  templateUrl: './dialog-input-result-example.component.html',
})
export class DialogInputResultExampleComponent {
  private readonly _dialogService = inject(IdsDialogService);

  public staticDialogInput = '';
  public staticSubmittedValue = signal<string | null>(null);
  public dynamicSubmittedValue = signal<string | null>(null);

  public prepareStaticDialog(): void {
    this.staticDialogInput = this.staticSubmittedValue() ?? '';
  }

  public onStaticConfirm(dialog: IdsDialogComponent): void {
    const value = this.staticDialogInput.trim();
    this.staticSubmittedValue.set(value.length ? value : null);
    dialog.close();
  }

  public openDynamicDialog(): void {
    this._dialogService
      .open<DialogInputResultDynamicDialogComponent, string | null>(DialogInputResultDynamicDialogComponent, {
        inputs: {
          initialValue: this.dynamicSubmittedValue() ?? '',
        },
      })
      .subscribe((result) => {
        if (result !== undefined) {
          this.dynamicSubmittedValue.set(result?.length ? result : null);
        }
      });
  }
}
