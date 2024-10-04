import { IdsMessageSuffixDirective } from '../../../directives/message-suffix.directive';
import { IdsMessageDirective } from '../../../directives/message.directive';

import { Component, ContentChildren, HostBinding, QueryList, ViewEncapsulation, computed } from '@angular/core';
import { createClassList } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-success-message',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './success-message.component.html',
  hostDirectives: [IdsMessageDirective],
  encapsulation: ViewEncapsulation.None,
})
export class IdsSuccessMessageComponent {
  private readonly _componentClass = 'ids-success-message';

  private _hostClasses = computed(() => createClassList(this._componentClass));

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  @ContentChildren(IdsMessageSuffixDirective) public suffixes!: QueryList<IdsMessageSuffixDirective>;
}
