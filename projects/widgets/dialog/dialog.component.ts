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
  private readonly _componentClass = 'ids-dialog';
  public readonly dialogTitleId = `ids-dialog-title-${uniqueIdCounter++}`;

  public dialog = inject(ElementRef).nativeElement as HTMLDialogElement;

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public mainTitle = input.required<string>();
  public subTitle = input<string>();
  public showCloseButton = input<boolean>(false);
  public showBackdrop = input<boolean>(true);

  public customHeader = contentChild(IdsDialogHeaderDirective);

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.size(),
      this.showBackdrop() ? 'with-backdrop' : null,
    ]),
  );

  private _onCancel(event: Event): void {
    event.preventDefault();
  }

  public open(): void {
    this.dialog.showModal();
  }

  public close(): void {
    this.dialog.close();
  }
}
