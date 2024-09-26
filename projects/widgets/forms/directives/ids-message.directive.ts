import { IdsFormFieldComponent } from '../components/form-field/ids-form-field.component';
import { IDS_FORM_FIELD } from '../components/form-field/tokens/ids-form-field-tokens';
import { FormFieldVariantType } from '../components/form-field/types/ids-form-field-variant.type';
import { MessageVariant, MessageVariantType } from '../components/message/types/message-variant.type';

import { Directive, HostBinding, OnInit, computed, inject, input, signal } from '@angular/core';
import { createClassList, Size, SizeType } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

@Directive({
  selector: '[idsMessage]',
  standalone: true,
  host: {
    '[id]': 'id()',
  },
})
export class IdsMessageDirective implements OnInit {
  private readonly _componentClass = 'ids-message';
  private readonly _parent = inject<IdsFormFieldComponent>(IDS_FORM_FIELD, { skipSelf: true, optional: true });

  public id = input<string, number>(
    `${this._componentClass}-${nextUniqueId++}`,
    { transform: (value: number) => `${this._componentClass}-${value}` },
  );

  public size = input<SizeType>(Size.COMFORTABLE);
  public variant = input<MessageVariantType>(MessageVariant.SURFACE);
  private _parentSize = signal<SizeType | null | undefined>(this._parent?.size());
  private _parentVariant = signal<FormFieldVariantType | null | undefined>(this._parent?.variant());
  private _safeSize = computed(() => this._parentSize() ?? this.size());
  private _safeVariant = computed(() => this._parentVariant() ?? this.variant());
  private _disabled = signal<boolean>(false);
  
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this._safeSize(),
    this._safeVariant(),
    this._disabled() ? 'disabled' : null,
  ]));

  public ngOnInit(): void {
    if (this._parent) {
      this._parentSize.set(this._parent.safeSize());
      this._parentVariant.set(this._parent.safeVariant());
      this._disabled.set(this._parent.disabled());
    }
  }

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
