import { Component } from '@angular/core';
import { IdsSegmentedControlDirective } from '@i-cell/ids-angular/segmented-control/ids-segmented-control.directive';
import { IdsSegmentedControlItemComponent } from '@i-cell/ids-angular/segmented-control/segmented-control-item/ids-segmented-control-item.component';

@Component({
  selector: 'app-segmented-control-demo',
  standalone: true,
  imports: [
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
  ],
  templateUrl: './segmented-control-demo.component.html',
  styleUrl: './segmented-control-demo.component.scss',
})
export class SegmentedControlDemoComponent {

}
