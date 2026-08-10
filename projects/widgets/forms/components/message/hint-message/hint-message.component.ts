import { IdsMessagePrefixDirective } from '../../../directives/message-prefix.directive';
import { IdsMessageSuffixDirective } from '../../../directives/message-suffix.directive';
import { IdsMessageDirective } from '../../../directives/message.directive';

import { Component, contentChildren, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ids-hint-message',
  imports: [],
  templateUrl: './hint-message.component.html',
  hostDirectives: [
    {
      directive: IdsMessageDirective,
      inputs: [
        'disabled',
        'size',
        'variant',
      ],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class IdsHintMessageComponent {
  public prefixes = contentChildren(IdsMessagePrefixDirective);
  public suffixes = contentChildren(IdsMessageSuffixDirective);
}
