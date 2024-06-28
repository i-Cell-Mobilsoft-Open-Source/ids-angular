import { Component, HostBinding, ViewEncapsulation, computed } from '@angular/core';
import { hostClassGenerator } from '@i-cell/widgets/core';
import { IdsMessageDirective } from '@i-cell/widgets/forms';

@Component({
  selector: 'ids-success-message',
  standalone: true,
  imports: [],
  templateUrl: '../ids-message.component.html',
  hostDirectives: [IdsMessageDirective],
  encapsulation: ViewEncapsulation.None,
})
export class IdsSuccessMessageComponent {
  private readonly _componentClass = 'ids-hint-message';

  private _hostClasses = computed(() => hostClassGenerator(this._componentClass));

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
