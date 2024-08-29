import { Component, inject, OnInit, ViewContainerRef } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size } from '@i-cell/ids-angular/core';
import { IDS_SNACKBAR_DEFAULT_OPTIONS, IdsSnackbarDefaultOptions, IdsSnackbarItemAction, SnackbarService, SnackbarVariant, SnackbarVariantType } from '@i-cell/ids-angular/snackbar';
import { TranslateModule } from '@ngx-translate/core';

const snackbarDefaulttions: IdsSnackbarDefaultOptions = {
  size: Size.COMPACT,
  variant: SnackbarVariant.DARK,
};

@Component({
  selector: 'app-snackbar-demo',
  standalone: true,
  imports: [
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './snackbar-demo.component.html',
  styleUrl: './snackbar-demo.component.scss',
  providers: [
    {
      provide: IDS_SNACKBAR_DEFAULT_OPTIONS,
      useValue: snackbarDefaulttions,
    },
  ],
})
export class SnackbarDemoComponent implements OnInit {
  private readonly _snackbarService = inject(SnackbarService);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  public snackbarVariant = SnackbarVariant;

  public ngOnInit(): void {
    this._snackbarService.setViewContainerRef(this._viewContainerRef);
  }

  public openSnackbar(
    variant: SnackbarVariantType,
    actions?: IdsSnackbarItemAction[],
    allowDismiss?: boolean,
    closeButtonLabel?: string,
    autoClose?: boolean,
  ): void {
    this._snackbarService.add({
      message: `This is a toast with a long content and an action. 
      Notice how the text wraps to multiple lines when the max-width is reached.`,
      variant,
      actions,
      allowDismiss,
      closeButtonLabel,
      autoClose,
    });
  }

  public action(): void {
    console.info('action was called');
  }
}
