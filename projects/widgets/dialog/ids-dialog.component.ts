import { NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, HostBinding, HostListener, ViewEncapsulation, computed, contentChild, inject, input } from '@angular/core';
import { IdsDetectScrollableDirective, Size, SizeType } from '@i-cell/widgets/core';
import { IdsIconComponent } from '@i-cell/widgets/icon';
import { IdsIconButtonComponent } from '@i-cell/widgets/icon-button';
import { mdiWindowClose } from '@mdi/js';
import { IdsDialogHeaderDirective } from './ids-dialog-header.directive';

let uniqueIdCounter = 0;

@Component({
  selector: 'dialog[idsDialog]',
  standalone: true,
  imports: [IdsDetectScrollableDirective, IdsIconComponent, IdsIconButtonComponent, NgTemplateOutlet],
  templateUrl: './ids-dialog.component.html',
  styleUrl: './ids-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
  exportAs: 'idsDialog',
})
export class IdsDialogComponent {
  private readonly componentClass = 'ids-dialog';
  public readonly dialogTitleId = `ids-dialog-title-${uniqueIdCounter++}`;
  public readonly mdiClose = mdiWindowClose;

  public dialog = inject(ElementRef).nativeElement as HTMLDialogElement;

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public mainTitle = input.required<string>();
  public subTitle = input<string>();
  public showCloseButton = input<boolean>(false);
  public showBackdrop = input<boolean>(true);

  public customHeader = contentChild(IdsDialogHeaderDirective);

  private hostClasses = computed(() =>
    [
      this.componentClass,
      this.addClassPrefix(this.size()),
      ...[this.showBackdrop() ? [this.addClassPrefix('with-backdrop')] : []],
    ]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('class') get classes(): string {
    return this.hostClasses();
  }

  @HostBinding('attr.aria-labelledby') get ariaLabelledBy(): string {
    return this.dialogTitleId;
  }

  @HostListener('cancel', ['$event'])
  protected onCancel(e: Event): void {
    e.preventDefault();
  }

  open() {
    this.dialog.showModal();
  }

  close() {
    this.dialog.close();
  }

  private addClassPrefix(className: string | null): string | null {
    return className ? `${this.componentClass}-${className}` : null;
  }
}
