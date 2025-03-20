import { Component, computed, input } from '@angular/core';
import { ComponentBase } from '@i-cell/ids-angular/core';
import { IdsSnackbarVariantType } from '@i-cell/ids-angular/snackbar';

@Component({
  selector: 'ids-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class IdsSpinnerComponent extends ComponentBase  {
  public variant = input<IdsSnackbarVariantType | undefined>();

  constructor() {
    super();
  }

  protected _hostClasses = computed(() => this._getHostClasses([this.variant()]));

}
