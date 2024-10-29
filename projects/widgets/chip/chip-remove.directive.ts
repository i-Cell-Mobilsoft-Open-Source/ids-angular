import { IdsChipComponent } from './chip.component';

import { computed, Directive, inject, OnInit } from '@angular/core';

@Directive({
  selector: '[idsChipRemove]',
  standalone: true,
  host: {
    '[attr.disabled]': '_isChipDisabled() ? "" : null',
    '(click)': 'close()',
  },
})
export class IdsChipRemoveDirective implements OnInit {
  private readonly _chip = inject(IdsChipComponent, { optional: true });

  private _isChipDisabled = computed(() => (this._chip?.disabled() ? '' : null));

  public ngOnInit(): void {
    if (!this._chip) {
      throw new Error('Chip remove directive must be applied for IdsChipComponent');
    }
  }
  
  public close(): void {
    this._chip?.remove();
  }
}
