import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
import { ComponentBase } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import {
  IdsIconButtonComponent,
} from '@i-cell/ids-angular/icon-button';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';

/**
 * Clear button used inside form field controls (select, autocomplete).
 */
@Component({
  selector: 'ids-clear-value',
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsTooltipDirective,
  ],
  template: `
    <button
      type="button"
      idsIconButton
      variant="surface"
      appearance="standard"
      [ariaLabel]="label()"
      [disabled]="disabled()"
      [idsTooltip]="label()"
      [idsTooltipDisabled]="!label()"
      [idsTooltipIgnoreClipped]="true"
      (click)="_handleClick($event)"
      (keydown.enter)="_handleKeydown($event)"
      (keydown.space)="_handleKeydown($event)"
    >
      <ids-icon aria-hidden="true" alt="" fontIcon="close" />
    </button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsClearValueComponent extends ComponentBase {
  protected override get _hostName(): string {
    return 'clear-value';
  }

  public label = input<string>('');
  public disabled = input<boolean>(false);
  public clear = output<void>();

  protected _hostClasses = computed(() => this._getHostClasses());

  protected _handleClick(event: Event): void {
    event.stopPropagation();
    this.clear.emit();
  }

  protected _handleKeydown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.clear.emit();
  }
}
