import { IdsMessagePrefixDirective } from './../../../directives/ids-message-prefix.directive';
import { IdsMessageSuffixDirective } from './../../../directives/ids-message-suffix.directive';
import { IdsMessageDirective } from './../../../directives/ids-message.directive';

import { Component, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-hint-message',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-hint-message.component.html',
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
  @ContentChildren(IdsMessagePrefixDirective) public prefixes!: QueryList<IdsMessagePrefixDirective>;
  @ContentChildren(IdsMessageSuffixDirective) public suffixes!: QueryList<IdsMessageSuffixDirective>;
}
