import { Component, ContentChildren, HostBinding, QueryList, ViewEncapsulation, computed } from '@angular/core';
import { createHostClassList } from '@i-cell/widgets/core';
import { IdsMessageDirective, IdsMessagePrefixDirective, IdsMessageSuffixDirective } from '@i-cell/widgets/forms';
import { IdsIconComponent } from '@i-cell/widgets/icon';
import { mdiCheck } from '@mdi/js';

@Component({
  selector: 'ids-success-message',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-success-message.component.html',
  hostDirectives: [IdsMessageDirective],
  encapsulation: ViewEncapsulation.None,
})
export class IdsSuccessMessageComponent {
  private readonly _componentClass = 'ids-success-message';

  private _hostClasses = computed(() => createHostClassList(this._componentClass));

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  @ContentChildren(IdsMessagePrefixDirective) public prefixes!: QueryList<IdsMessagePrefixDirective>;
  @ContentChildren(IdsMessageSuffixDirective) public suffixes!: QueryList<IdsMessageSuffixDirective>;

  public defaultPrefixIcon = mdiCheck;
}
