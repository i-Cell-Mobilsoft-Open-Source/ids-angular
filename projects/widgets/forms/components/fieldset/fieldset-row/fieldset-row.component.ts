import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { ComponentBase } from '@i-cell/ids-angular/core';

@Component({
  selector: 'ids-fieldset-row',
  imports: [],
  templateUrl: './fieldset-row.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsFieldsetRowComponent extends ComponentBase {
  protected override get _hostName(): string {
    return 'fieldset-row';
  }

  protected _hostClasses = signal(this._getHostClasses([]));
}
