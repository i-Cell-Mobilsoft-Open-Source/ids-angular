import { Component, computed, inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsSnackbarAction, IdsSnackbarService, SnackbarPosition, SnackbarPositionType, SnackbarVariant, SnackbarVariantType } from '@i-cell/ids-angular/snackbar';
import { TranslateModule } from '@ngx-translate/core';

type SnackbarPublicApi = {
  message: string,
  variant: SnackbarVariantType,
  icon: string | undefined,
  allowDismiss: boolean,
  closeButtonLabel: string | undefined,
  autoClose: boolean,
  urgent: boolean,
};

type SnackbarHelperControls = {
  useAction: boolean,
  size: SizeType,
  position: SnackbarPositionType,
  newestAtStartPosition: boolean
  viewportMargin: number
  useActualViewContainer: boolean
};

@Component({
  selector: 'app-snackbar-demo',
  standalone: true,
  imports: [
    IdsButtonComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './snackbar-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './snackbar-demo.component.scss',
  ],
})
export class SnackbarDemoComponent implements OnInit {
  public model: SnackbarPublicApi & SnackbarHelperControls = {
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    variant: SnackbarVariant.DARK,
    icon: undefined,
    allowDismiss: false,
    closeButtonLabel: undefined,
    autoClose: false,
    urgent: false,
    useAction: false,
    size: Size.COMFORTABLE,
    position: SnackbarPosition.BOTTOM_CENTER,
    newestAtStartPosition: false,
    viewportMargin: 16,
    useActualViewContainer: true,
  };

  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(SnackbarVariant) as SnackbarVariantType[];
  public positions = Object.values(SnackbarPosition) as SnackbarPositionType[];

  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _customActions: IdsSnackbarAction[] = [{ label: 'Log to console', action: this.action }];
  protected _areSnackbarsOpen = computed(() => this._snackbarService.snackbars().length > 0);

  public ngOnInit(): void {
    this.setActualViewContainer();
  }

  public openSnackbar(): void {
    this._snackbarService.add({
      message: this.model.message,
      variant: this.model.variant,
      actions: this.model.useAction ? this._customActions : undefined,
      allowDismiss: this.model.allowDismiss,
      closeButtonLabel: this.model.closeButtonLabel,
      autoClose: this.model.autoClose,
    });
  }

  public action(): void {
    console.info('action was called');
  }

  public setActualViewContainer(): void {
    if (this.model.useActualViewContainer) {
      this._snackbarService.setViewContainerRef(this._viewContainerRef);
    } else {
      this._snackbarService.clearViewContainerRef();
    }
  }
}
