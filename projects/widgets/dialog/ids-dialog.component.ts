import { IdsDialogHeaderDirective } from './ids-dialog-header.directive';

import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import {
  createHostClassList,
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
  templateUrl: './ids-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  exportAs: 'idsDialog',
})
export class IdsDialogComponent {
  private readonly _componentClass = 'ids-dialog';
  public readonly dialogTitleId = `ids-dialog-title-${uniqueIdCounter++}`;
  public readonly mdiClose = mdiWindowClose;

  public dialog = inject(ElementRef).nativeElement as HTMLDialogElement;

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public mainTitle = input.required<string>();
  public subTitle = input<string>();
  public showCloseButton = input<boolean>(false);
  public showBackdrop = input<boolean>(true);

  public customHeader = contentChild(IdsDialogHeaderDirective);

  private _hostClasses = computed(() =>
    createHostClassList(this._componentClass, [
      this.size(),
      this.showBackdrop() ? 'with-backdrop' : null,
    ]),
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  @HostBinding('attr.aria-labelledby') get ariaLabelledBy(): string {
    return this.dialogTitleId;
  }

  @HostListener('cancel', ['$event'])
  protected onCancel(event: Event): void {
    event.preventDefault();
  }

  public open(): void {
    this.dialog.showModal();
  }

  public close(): void {
    this.dialog.close();
  }
}
