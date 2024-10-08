import { Component, computed, inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY, IdsSnackbarAction, IdsSnackbarService, SnackbarPosition, SnackbarPositionType, SnackbarVariant, SnackbarVariantType } from '@i-cell/ids-angular/snackbar';
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

const defaultConfig = IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY();

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
  public defaults: SnackbarPublicApi & SnackbarHelperControls = {
    message: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
    variant: defaultConfig.variant,
    icon: undefined,
    allowDismiss: false,
    closeButtonLabel: undefined,
    autoClose: false,
    urgent: false,
    useAction: false,
    size: defaultConfig.size,
    position: defaultConfig.position,
    newestAtStartPosition: defaultConfig.newestAtStartPosition,
    viewportMargin: defaultConfig.viewportMargin,
    useActualViewContainer: true,
  };

  public model: SnackbarPublicApi & SnackbarHelperControls = { ...this.defaults };

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
      icon: this.model.icon,
      variant: this.model.variant,
      actions: this.model.useAction ? this._customActions : undefined,
      allowDismiss: this.model.allowDismiss,
      closeButtonLabel: this.model.closeButtonLabel,
      autoClose: this.model.autoClose,
      urgent: this.model.urgent,
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

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
