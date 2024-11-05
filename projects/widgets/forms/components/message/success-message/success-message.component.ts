import { IdsMessageSuffixDirective } from '../../../directives/message-suffix.directive';
import { IdsMessageDirective } from '../../../directives/message.directive';

import { Component, ViewEncapsulation, computed, contentChildren } from '@angular/core';
import { ComponentBase } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-success-message',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './success-message.component.html',
  hostDirectives: [IdsMessageDirective],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_hostClasses()',
  },
})
export class IdsSuccessMessageComponent extends ComponentBase {
  protected override get _hostName(): string {
    return 'success-message';
  }

  protected _hostClasses = computed(() => this._getHostClasses([]));

  public suffixes = contentChildren(IdsMessageSuffixDirective);
}
