import { Component, HostBinding, Injector, OnDestroy, OnInit, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { hostClassGenerator } from '@i-cell/widgets/core';
import { IdsMessageDirective } from '@i-cell/widgets/forms';
import { IDS_FORM_ELEMENT } from '@i-cell/widgets/forms/tokens/form';
import { FormElement } from '@i-cell/widgets/forms/types/form-element';
import { Subscription, startWith } from 'rxjs';

@Component({
  selector: 'ids-error-message',
  standalone: true,
  imports: [],
  templateUrl: '../ids-message.component.html',
  styleUrl: './ids-error-message.component.scss',
  hostDirectives: [IdsMessageDirective],
  encapsulation: ViewEncapsulation.None,
})
export class IdsErrorMessageComponent implements OnInit, OnDestroy {
  private readonly _componentClass = 'ids-error-message';

  private _subscription?: Subscription;
  private _injector = inject(Injector);
  private _parent: FormElement<unknown> | null = null;

  private _errors = signal<ValidationErrors | null>(null);
  private _hostClasses = computed(() => hostClassGenerator(this._componentClass));

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  public ngOnInit(): void {
    this._parent = this._injector.get<FormElement<unknown>>(IDS_FORM_ELEMENT, null, { skipSelf: true, optional: true });
    if (this._parent) {
      const control = this._parent.controlDir;
      this._subscription = control?.statusChanges?.pipe(startWith(control.errors)).subscribe(() => {
        this._errors.set(control.errors);
      });
    }
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
