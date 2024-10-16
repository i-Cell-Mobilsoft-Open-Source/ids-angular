import { IdsMessageSuffixDirective } from '../../../directives/message-suffix.directive';
import { IdsMessageDirective } from '../../../directives/message.directive';
import { IdsFormFieldComponent } from '../../form-field/form-field.component';
import { IDS_FORM_FIELD } from '../../form-field/tokens/form-field-tokens';

import { Component, ContentChildren, Injector, OnDestroy, OnInit, QueryList, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { createClassList } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { Subscription, startWith } from 'rxjs';

@Component({
  selector: 'ids-error-message',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './error-message.component.html',
  hostDirectives: [IdsMessageDirective],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_hostClasses()',
  },
})
export class IdsErrorMessageComponent implements OnInit, OnDestroy {
  private readonly _componentClass = 'ids-error-message';

  private _subscription?: Subscription;
  private _injector = inject(Injector);

  private _errors = signal<ValidationErrors | null>(null);
  private _hostClasses = computed(() => createClassList(this._componentClass));

  @ContentChildren(IdsMessageSuffixDirective) public suffixes!: QueryList<IdsMessageSuffixDirective>;

  public ngOnInit(): void {
    const parent = this._injector.get<IdsFormFieldComponent>(IDS_FORM_FIELD, null, { skipSelf: true, optional: true });
    if (parent) {
      const control = parent.control();
      this._subscription = control?.statusChanges?.pipe(startWith(control.errors)).subscribe(() => {
        this._errors.set(control.errors);
      });
    }
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
