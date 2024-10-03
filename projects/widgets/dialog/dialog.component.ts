import { IdsDialogHeaderDirective } from './dialog-header.directive';

import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import {
  createClassList,
  IdsDetectScrollableDirective,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { mdiWindowClose } from '@mdi/js';

let uniqueIdCounter = 0;

@Component({
  selector: 'dialog[idsDialog]',
  standalone: true,
  imports: [
    IdsDetectScrollableDirective,
    IdsIconComponent,
    IdsIconButtonComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  exportAs: 'idsDialog',
  host: {
    '[class]': '_hostClasses()',
    '[attr.aria-labelledby]': 'dialogTitleId',
    '(cancel)': '_onCancel($event)',
  },
})
export class IdsDialogComponent {
  /** @ignore */
  private readonly _componentClass = 'ids-dialog';
  /** @ignore */
  public readonly dialogTitleId = `ids-dialog-title-${uniqueIdCounter++}`;
  /** @ignore */
  public readonly mdiClose = mdiWindowClose;

  /** @ignore */
  public dialog = inject(ElementRef).nativeElement as HTMLDialogElement;

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public mainTitle = input.required<string>();
  public subTitle = input<string>();
  public showCloseButton = input<boolean>(false);
  public showBackdrop = input<boolean>(true);

  /** @ignore */
  public customHeader = contentChild(IdsDialogHeaderDirective);

  /** @ignore */
  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.size(),
      this.showBackdrop() ? 'with-backdrop' : null,
    ]),
  );

  /** @ignore */
  private _onCancel(event: Event): void {
    event.preventDefault();
  }

  /** @ignore */
  public open(): void {
    this.dialog.showModal();
  }

  /** @ignore */
  public close(): void {
    this.dialog.close();
  }
}
