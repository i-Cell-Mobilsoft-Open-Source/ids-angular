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
  IdsDetectScrollableDirective,
  Size,
  SizeType,
} from '@i-cell/widgets/core';
import { IdsIconComponent } from '@i-cell/widgets/icon';
import { IdsIconButtonComponent } from '@i-cell/widgets/icon-button';
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
  styleUrl: './ids-dialog.component.scss',
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
    [
      this._componentClass,
      this._addClassPrefix(this.size()),
      ...[this.showBackdrop() ? [this._addClassPrefix('with-backdrop')] : []],
    ]
      .filter(Boolean)
      .join(' '),
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

  private _addClassPrefix(className: string | null): string | null {
    return className ? `${this._componentClass}-${className}` : null;
  }
}
