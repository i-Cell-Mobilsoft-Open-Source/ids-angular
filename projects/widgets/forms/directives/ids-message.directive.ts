import { IDS_FORM_ELEMENT } from '../tokens/form';
import { FormElement } from '../types/form-element';

import { Directive, HostBinding, Injector, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, computed, inject, input, signal } from '@angular/core';
import { hostClassGenerator } from '@i-cell/widgets/core';
import { Size, SizeType } from '@i-cell/widgets/core/types/size.type';
import { AllVariants, AllVariantsType } from '@i-cell/widgets/core/types/variants';

let nextUniqueId = 0;

@Directive({
  selector: '[idsMessage]',
  standalone: true,
  host: {
    '[id]': 'id()',
  },
})
export class IdsMessageDirective implements OnInit, OnChanges {
  private readonly _componentClass = 'ids-message';

  private _injector = inject(Injector);

  public id = input<string, number>(
    `${this._componentClass}-${nextUniqueId++}`,
    { transform: (value: number) => `${this._componentClass}-${value}` },
  );

  @Input({ alias: 'size' }) public inputSize: SizeType = Size.COMFORTABLE;
  @Input({ alias: 'variant' }) public inputVariant: unknown;
  private _size = signal<SizeType | null>(Size.COMFORTABLE);
  private _variant = signal<AllVariantsType | null>(AllVariants.SURFACE);
  private _disabled = signal<boolean>(false);
  private _hostClasses = computed(() => hostClassGenerator(this._componentClass, [
    this._size(),
    this._variant(),
    this._disabled() ? 'disabled' : null,
  ]));

  private _receivedInputSize = false;
  private _receivedInputVariant = false;

  public ngOnChanges(changes: SimpleChanges): void {
    const sizeChange = changes['inputSize'] as SimpleChange | undefined;
    const variantChange = changes['inputVariant'] as SimpleChange | undefined;
    if (sizeChange) {
      this._size.set(sizeChange.currentValue);
      this._receivedInputSize = true;
    }
    if (variantChange) {
      this._size.set(variantChange.currentValue);
      this._receivedInputVariant = true;
    }
  }

  public ngOnInit(): void {
    const parent = this._injector.get<FormElement<AllVariantsType>>(IDS_FORM_ELEMENT, null, { skipSelf: true, optional: true });
    if (parent) {
      if (!this._receivedInputSize) {
        this._size.set(parent.size());
      }
      if (!this._receivedInputVariant) {
        this._variant.set(parent.variant());
      }
      this._disabled.set(parent.isDisabled());
    }
  }

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
