import { IdsMessagePrefixDirective } from './../../../directives/ids-message-prefix.directive';
import { IdsMessageSuffixDirective } from './../../../directives/ids-message-suffix.directive';
import { IdsMessageDirective } from './../../../directives/ids-message.directive';
import { IDS_FORM_ELEMENT } from './../../../tokens/form';
import { FormElement } from './../../../types/form-element';

import { Component, ContentChildren, HostBinding, Injector, OnDestroy, OnInit, QueryList, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { createHostClassList } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiInformationOutline } from '@mdi/js';
import { Subscription, startWith } from 'rxjs';

@Component({
  selector: 'ids-error-message',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-error-message.component.html',
  hostDirectives: [IdsMessageDirective],
  encapsulation: ViewEncapsulation.None,
})
export class IdsErrorMessageComponent implements OnInit, OnDestroy {
  private readonly _componentClass = 'ids-error-message';

  private _subscription?: Subscription;
  private _injector = inject(Injector);

  private _errors = signal<ValidationErrors | null>(null);
  private _hostClasses = computed(() => createHostClassList(this._componentClass));

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  @ContentChildren(IdsMessagePrefixDirective) public prefixes!: QueryList<IdsMessagePrefixDirective>;
  @ContentChildren(IdsMessageSuffixDirective) public suffixes!: QueryList<IdsMessageSuffixDirective>;

  public defaultPrefixIcon = mdiInformationOutline;

  public ngOnInit(): void {
    const parent = this._injector.get<FormElement<unknown>>(IDS_FORM_ELEMENT, null, { skipSelf: true, optional: true });
    if (parent) {
      const control = parent.controlDir;
      this._subscription = control?.statusChanges?.pipe(startWith(control.errors)).subscribe(() => {
        this._errors.set(control.errors);
      });
    }
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
