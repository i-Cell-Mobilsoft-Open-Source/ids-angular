import { Component, createEnvironmentInjector, EnvironmentInjector, inject } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IDS_SNACKBAR_DEFAULT_CONFIG,
  IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY,
  IdsSnackbarPositionType,
  IdsSnackbarService,
} from '@i-cell/ids-angular/snackbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar-position-example',
  imports: [
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './snackbar-position-example.component.html',
})
export class SnackbarPositionExampleComponent {
  private readonly _parentInjector = inject(EnvironmentInjector);
  private readonly _translate = inject(TranslateService);
  private readonly _services = new Map<IdsSnackbarPositionType, IdsSnackbarService>();

  protected _open(position: IdsSnackbarPositionType): void {
    let service = this._services.get(position);

    if (!service) {
      const injector = createEnvironmentInjector(
        [
          {
            provide: IDS_SNACKBAR_DEFAULT_CONFIG,
            useValue: {
              ...IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY(),
              position,
            },
          },
          IdsSnackbarService,
        ],
        this._parentInjector,
      );
      service = injector.get(IdsSnackbarService);
      this._services.set(position, service);
    }

    service.add({
      message: this._translate.instant('EXAMPLES.SNACKBAR.POSITION.CONTENT.MESSAGE', { position }),
      allowDismiss: true,
    });
  }
}
