import { Component } from '@angular/core';
import { IdsChipComponent, IdsChipRemoveEvent } from '@i-cell/ids-angular/chip';

@Component({
  selector: 'app-chip-removable-example',
  imports: [IdsChipComponent],
  templateUrl: './chip-removable-example.component.html',
})
export class ChipRemovableExampleComponent {
  public chips = [
    'Carrot',
    'Onion',
    'Mushroom',
  ];

  public onRemoved(event: IdsChipRemoveEvent, index: number): void {
    console.info('chip removed:', event.chip.id());
    this.chips = this.chips.toSpliced(index, 1);
  }
}
