/* eslint-disable @angular-eslint/component-class-suffix */
import { IdsSegmentedControlToggleDirective } from '../ids-segmented-control-toggle.directive';
import { IdsSegmentedControlDirective } from '../ids-segmented-control.directive';
import { IdsSegmentedControlItemChange, IdsSegmentedControlToggleItemChange } from '../types/ids-segmented-control-item-change';

import { computed, Directive, ElementRef, EventEmitter, HostBinding, inject, Injector, input, InputSignal, Output, Signal, signal, ViewChild } from '@angular/core';
import { coerceNumberAttribute, createClassList, createComponentError } from '@i-cell/ids-angular/core';
import { mdiCheck } from '@mdi/js';

type ProbableParent = IdsSegmentedControlToggleDirective | IdsSegmentedControlDirective;
type ProbableEvent = IdsSegmentedControlToggleItemChange | IdsSegmentedControlItemChange;

@Directive({})
export abstract class IdsSegmentedControlItemBase<P extends ProbableParent, E extends ProbableEvent> {
  public abstract readonly componentClass: string;
  public abstract readonly uniqueId: string;
  public readonly injector = inject(Injector);

  public abstract parent: Signal<P | null>;

  public readonly iconChecked = mdiCheck;

  public selected = signal<boolean>(false);

  public abstract id: InputSignal<string>;
  public name = input<string>();
  public value = input.required<unknown>();
  public label = input<string>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labeledby' });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);

  public isDisabled = computed(() => this.disabled() || this.parent()?.isDisabled());
  public multiSelect = computed(() => this.parent()?.multiSelect());
  public buttonName = computed(() => (this.parent()?.multiSelect() ? this.name() : this.parent()?.name()));
  public ariaPressed = computed(() => (this.multiSelect() ? this.selected() : null));
  public ariaChecked = computed(() => (!this.multiSelect() ? this.selected() : null));
  public role = computed(() => (this.multiSelect() ? 'button' : 'radio'));
  public buttonClasses = computed(() => createClassList(this.componentClass, [this.selected() ? 'selected' : null]));

  @ViewChild('button') private _buttonElement!: ElementRef<HTMLButtonElement>;

  @Output() public readonly changes = new EventEmitter<E>();

  @HostBinding('class') get hostClasses(): string {
    return this.componentClass;
  }

  public abstract ngOnInit: () => void;

  public abstract onClick: () => void;

  public focus(options?: FocusOptions): void {
    this._buttonElement.nativeElement.focus(options);
  }

  public getNonExistingParentError(): string {
    return createComponentError(this.componentClass, 'component must be direct child of a segmented control');
  }
}
