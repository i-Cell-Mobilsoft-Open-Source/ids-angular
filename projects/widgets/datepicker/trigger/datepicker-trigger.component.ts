import { IdsDatepickerIntl } from '../datepicker-intl';
import { IdsDatepickerDirective } from '../datepicker.directive';

import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { IdsFormFieldComponent } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'ids-datepicker-trigger',
  imports: [
    IdsIconComponent,
    IdsIconButtonComponent,
  ],
  templateUrl: './datepicker-trigger.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsDatepickerTriggerComponent {
  protected _parent = inject(IdsFormFieldComponent);
  protected _intl = inject(IdsDatepickerIntl);

  public datepicker = input.required<IdsDatepickerDirective>({ alias: 'for' });
  public ariaLabel = input<string | null>(null, { alias: 'aria-label' });
}
