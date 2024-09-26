import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { ComponentBase } from '@i-cell/ids-angular/core';

@Component({
  selector: 'ids-fieldset-row',
  standalone: true,
  imports: [],
  templateUrl: './fieldset-row.component.html',
  styleUrl: './fieldset-row.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsFieldsetRowComponent extends ComponentBase {
  protected override get _componentName(): string {
    return 'fieldset-row';
  }

  protected _hostClasses = signal(this._getHostClasses([]));
}
