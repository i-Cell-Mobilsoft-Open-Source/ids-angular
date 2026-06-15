import { IdsMessageSuffixDirective } from '../../../directives/message-suffix.directive';
import { IdsMessageDirective } from '../../../directives/message.directive';
import { IDS_MESSAGE_PARENT_FORM_FIELD } from '../types/message-parent-form-field';

import { Component, ViewEncapsulation, computed, contentChildren, inject } from '@angular/core';
import { ComponentBase } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-success-message',
  imports: [IdsIconComponent],
  templateUrl: './success-message.component.html',
  hostDirectives: [IdsMessageDirective],
  encapsulation: ViewEncapsulation.None,
})
export class IdsSuccessMessageComponent extends ComponentBase {
  protected override get _hostName(): string {
    return 'success-message';
  }

  private readonly _parent = inject(IDS_MESSAGE_PARENT_FORM_FIELD, { skipSelf: true, optional: true });
  protected readonly _isDisabled = computed(() => this._parent?.disabled() ?? false);
  protected _hostClasses = computed(() => this._getHostClasses([]));

  public suffixes = contentChildren(IdsMessageSuffixDirective);
}
