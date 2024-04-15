import { Component, InjectionToken, ViewEncapsulation, inject, input } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/widgets/button';
import { IdsCustomDialogBase, IdsDialogComponent, IdsDialogHeaderDirective, IdsDialogService } from '@i-cell/widgets/dialog';

export const CUSTOM_DIALOG_TOKEN = new InjectionToken<string>('ids-custom-dialog-token');

@Component({
  selector: 'app-custom-dialog',
  imports: [IdsButtonComponent, IdsDialogComponent],
  template: `
    <dialog idsDialog #dialog3="idsDialog" mainTitle="Custom dynamic dialog" [showCloseButton]="true">
      <!-- content -->
      <div idsDialogContent class="flex flex-col gap-3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac suscipit neque. Suspendisse ultrices quam eu venenatis ultricies.
          Mauris vehicula arcu ac elementum laoreet. Nam eleifend mauris quis lorem laoreet rutrum. Pellentesque facilisis turpis id gravida
          ullamcorper. Nam ultrices nulla nec dolor consectetur, condimentum molestie ipsum vestibulum. Vestibulum eget rhoncus felis.
        </p>

        <p>Provided data: {{ providedData }}</p>
        <p>Data from input binding: {{ inputData() }}</p>
      </div>
      <!-- action buttons -->
      <div idsDialogActions class="flex flex-row items-end gap-2">
        <button
          type="button"
          idsButton
          appearance="filled"
          size="comfortable"
          variant="primary"
          (click)="close('some payload')"
        >
          OK
        </button>
      </div>
    </dialog>
  `,
  standalone: true
})
export class CustomDialogComponent extends IdsCustomDialogBase {
  providedData = inject(CUSTOM_DIALOG_TOKEN);
  inputData = input('');
}

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [CustomDialogComponent, IdsButtonComponent, IdsDialogComponent, IdsDialogHeaderDirective],
  templateUrl: './dialog-demo.component.html',
  styleUrl: './dialog-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DialogDemoComponent {
  private dialogService = inject(IdsDialogService);

  public onOkButtonClick(payload: unknown) {
    console.log('Ok button clicked; payload:', payload);
  }

  public onCancelButtonClick() {
    console.log('Cancel button clicked');
  }

  public openCustomDialog() {
    this.dialogService.open(CustomDialogComponent, {
      providers: [{ provide: CUSTOM_DIALOG_TOKEN, useValue: 'This text is provided with an InjectionToken'}],
      inputs: {
        inputData: 'This text is provided using input binding'
      }
    }).subscribe(result => console.log('Dialog result:', result));
  }
}
