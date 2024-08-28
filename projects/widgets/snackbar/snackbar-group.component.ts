import { IDS_SNACKBAR_DEFAULT_OPTIONS, IDS_SNACKBAR_DEFAULT_OPTIONS_FACTORY } from './snackbar-default-options';
import { IdsSnackbarComponent } from './snackbar.component';
import { IdsSnackbarItem } from './types/snackbar-item.type';
import { SnackbarPositionType } from './types/snackbar-position.type';

import { ChangeDetectionStrategy, Component, HostBinding, inject, Injector, viewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
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
  private readonly _snackbarPlace = viewChild('snackbarPlace', { read: ViewContainerRef });
  private readonly _injector = inject(Injector);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_SNACKBAR_DEFAULT_OPTIONS, null, { optional: true }),
  };

  public position: SnackbarPositionType = this._defaultOptions.position;

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

  public add(snackbar: IdsSnackbarItem): void {
    const newSnackbarComponentRef = this._snackbarPlace()?.createComponent(IdsSnackbarComponent);
    newSnackbarComponentRef?.setInput('message', snackbar.message);
    newSnackbarComponentRef?.setInput('variant', snackbar.variant);
    newSnackbarComponentRef?.setInput('icon', snackbar.icon);
    newSnackbarComponentRef?.setInput('actions', snackbar.actions);
    newSnackbarComponentRef?.instance.closed.subscribe(() => {
      newSnackbarComponentRef.destroy();
    });
  }

  public clear(): void {
    this._snackbarPlace()?.clear();
  }
}
