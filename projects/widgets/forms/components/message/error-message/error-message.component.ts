import { IdsMessageSuffixDirective } from '../../../directives/message-suffix.directive';
import { IdsMessageDirective } from '../../../directives/message.directive';
import { IdsFormFieldComponent } from '../../form-field/form-field.component';
import { IDS_FORM_FIELD } from '../../form-field/tokens/form-field-tokens';

import { Component, Injector, OnInit, ViewEncapsulation, computed, contentChildren, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationErrors } from '@angular/forms';
import { ComponentBase } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { startWith } from 'rxjs';

@Component({
  selector: 'ids-error-message',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './error-message.component.html',
  hostDirectives: [IdsMessageDirective],
  encapsulation: ViewEncapsulation.None,
})
export class IdsErrorMessageComponent extends ComponentBase implements OnInit {
  protected override get _hostName(): string {
    return 'error-message';
  }

  private _injector = inject(Injector);

  private _errors = signal<ValidationErrors | null>(null);
  protected _hostClasses = computed(() => this._getHostClasses([]));

  public suffixes = contentChildren(IdsMessageSuffixDirective);

  public ngOnInit(): void {
    const parent = this._injector.get<IdsFormFieldComponent>(IDS_FORM_FIELD, null, { skipSelf: true, optional: true });
    if (parent) {
      const control = parent.control();
      control?.statusChanges?.pipe(startWith(control.errors), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
        this._errors.set(control.errors);
      });
    }
  }
}
