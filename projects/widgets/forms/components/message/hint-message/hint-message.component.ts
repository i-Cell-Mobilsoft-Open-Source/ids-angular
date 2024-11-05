import { IdsMessagePrefixDirective } from '../../../directives/message-prefix.directive';
import { IdsMessageSuffixDirective } from '../../../directives/message-suffix.directive';
import { IdsMessageDirective } from '../../../directives/message.directive';

import { Component, contentChildren, ViewEncapsulation } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-hint-message',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './hint-message.component.html',
  host: {
    class: 'ids-hint-message',
  },
  hostDirectives: [
    {
      directive: IdsMessageDirective,
      inputs: [
        'size: size',
        'variant: variant',
      ],
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class IdsHintMessageComponent {
  public prefixes = contentChildren(IdsMessagePrefixDirective);
  public suffixes = contentChildren(IdsMessageSuffixDirective);
}
