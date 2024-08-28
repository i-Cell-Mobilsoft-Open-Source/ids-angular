import { SnackbarService } from './public-api';
import { IDS_SNACKBAR_DEFAULT_OPTIONS, IDS_SNACKBAR_DEFAULT_OPTIONS_FACTORY } from './snackbar-default-options';
import { IdsSnackbarComponent } from './snackbar.component';
import { IdsSnackbarInnerItem } from './types/snackbar-inner.type';
import { SnackbarPositionType } from './types/snackbar-position.type';

import { ChangeDetectionStrategy, Component, HostBinding, inject, Signal, ViewEncapsulation } from '@angular/core';
import { createClassList } from '@i-cell/ids-angular/core';

const defaultOptions = IDS_SNACKBAR_DEFAULT_OPTIONS_FACTORY();

@Component({
  selector: 'ids-snackbar-group',
  standalone: true,
  imports: [IdsSnackbarComponent],
  templateUrl: './snackbar-group.component.html',
  styleUrl: './snackbar-group.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsSnackbarGroupComponent {
  private readonly _componentClass = 'ids-snackbar-group';
  private readonly _snackbarService = inject(SnackbarService);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...inject(IDS_SNACKBAR_DEFAULT_OPTIONS, { optional: true }),
  };

  public position: SnackbarPositionType = this._defaultOptions.position;
  public snackbars: Signal<IdsSnackbarInnerItem[]> = this._snackbarService.snackbars;

  private _hostClasses = createClassList(this._componentClass, [
    this._defaultOptions.size,
    [
      'position',
      this.position,
    ],
    this._defaultOptions.reverseOrder ? 'reverse-order' : null,
  ]);

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses;
  }

  public closeSnackbar(id: number): void {
    this._snackbarService.remove(id);
  }
}
