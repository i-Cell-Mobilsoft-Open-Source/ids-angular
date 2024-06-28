import { Component, ViewEncapsulation } from '@angular/core';
import { IdsMessageDirective } from '@i-cell/widgets/forms';

@Component({
  selector: 'ids-hint-message',
  standalone: true,
  imports: [],
  templateUrl: '../ids-message.component.html',
  host: {
    class: 'ids-hint-message',
  },
  hostDirectives: [
    {
      directive: IdsMessageDirective,
      inputs: [
        'size: size',
        'variant: variant',
      ] },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class IdsHintMessageComponent {
}
