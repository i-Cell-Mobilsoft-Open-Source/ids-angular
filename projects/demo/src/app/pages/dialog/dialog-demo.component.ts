import { Component, InjectionToken, inject, input } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCustomDialogBase, IdsDialogComponent, IdsDialogHeaderDirective, IdsDialogService } from '@i-cell/ids-angular/dialog';
import { TranslateModule } from '@ngx-translate/core';

export const CUSTOM_DIALOG_TOKEN = new InjectionToken<string>('ids-custom-dialog-token');

@Component({
  selector: 'app-custom-dialog',
  imports: [
    IdsButtonComponent,
    IdsDialogComponent,
  ],
  template: `
    <dialog #dialog3="idsDialog" idsDialog mainTitle="Custom dynamic dialog" [showCloseButton]="true">
      <div idsDialogContent class="flex flex-col gap-3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac suscipit neque.
          Suspendisse ultrices quam eu venenatis ultricies. Mauris vehicula arcu ac elementum laoreet.
          Nam eleifend mauris quis lorem laoreet rutrum. Pellentesque facilisis turpis id gravida
          ullamcorper. Nam ultrices nulla nec dolor consectetur, condimentum molestie ipsum vestibulum. Vestibulum eget rhoncus felis.
        </p>

        <p>Provided data: {{ providedData }}</p>
        <p>Data from input binding: {{ inputData() }}</p>
      </div>
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
  standalone: true,
})
export class CustomDialogComponent extends IdsCustomDialogBase {
  public providedData = inject(CUSTOM_DIALOG_TOKEN);
  public inputData = input('');
}

@Component({
  selector: 'app-dialog-demo',
  standalone: true,
  imports: [
    CustomDialogComponent,
    IdsButtonComponent,
    IdsDialogComponent,
    IdsDialogHeaderDirective,
    TranslateModule,
  ],
  templateUrl: './dialog-demo.component.html',
  styleUrl: './dialog-demo.component.scss',
})
export class DialogDemoComponent {
  private _dialogService = inject(IdsDialogService);

  public onOkButtonClick(payload: unknown): void {
    // eslint-disable-next-line no-console
    console.log('Ok button clicked; payload:', payload);
  }

  public onCancelButtonClick(): void {
    // eslint-disable-next-line no-console
    console.log('Cancel button clicked');
  }

  public openCustomDialog(): void {
    this._dialogService.open(CustomDialogComponent, {
      providers: [{ provide: CUSTOM_DIALOG_TOKEN, useValue: 'This text is provided with an InjectionToken' }],
      inputs: {
        inputData: 'This text is provided using input binding',
      },
      // eslint-disable-next-line no-console
    }).subscribe((result) => console.log('Dialog result:', result));
  }
}
