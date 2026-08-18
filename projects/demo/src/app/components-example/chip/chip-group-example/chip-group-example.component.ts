import { Component } from '@angular/core';
import { IdsChipComponent, IdsChipGroupComponent } from '@i-cell/ids-angular/chip';

@Component({
  selector: 'app-chip-group-example',
  imports: [
    IdsChipComponent,
    IdsChipGroupComponent,
  ],
  templateUrl: './chip-group-example.component.html',
})
export class ChipGroupExampleComponent {}
