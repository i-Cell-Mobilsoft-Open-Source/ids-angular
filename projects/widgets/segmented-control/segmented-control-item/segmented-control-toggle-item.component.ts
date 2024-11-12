import { IdsSegmentedControlToggleDirective } from '../segmented-control-toggle.directive';
import { IdsSegmentedControlToggleItemChange } from '../types/segmented-control-item-change.class';

import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { addClassPrefix, coerceNumberAttribute, ComponentBase } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-segmented-control-toggle-item',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './segmented-control-item.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsSegmentedControlToggleItemComponent extends ComponentBase implements OnInit {
  protected override get _hostName(): string {
    return 'segmented-control-toggle-item';
  }

  protected readonly _group = inject(IdsSegmentedControlToggleDirective, { optional: true, skipSelf: true });

  private _buttonElement = viewChild.required<ElementRef<HTMLButtonElement>>('button');

  public selected = signal<boolean>(false);

  public name = input<string>();
  public value = input.required<unknown>();
  public label = input<string>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labeledby' });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);

  protected _buttonId = computed(() => `${this.id()}-button`);
  protected _parentOrSelfDisabled = computed(() => this.disabled() || this._group?.disabled());
  protected _ariaPressed = signal(null); // it is signal because of the common template
  protected _ariaChecked = computed(() => this.selected());
  protected _role = signal('radio'); // it is signal because of the common template
  protected _buttonName = computed(() => this._group?.name());
  protected _buttonClasses = computed(() => addClassPrefix(this._hostClassName, this.selected() ? 'selected' : null));
  protected _hostClasses = computed(() => this._getHostClasses([this._group?.buttonVariant()]));

  public readonly changes = output<IdsSegmentedControlToggleItemChange>();

  public ngOnInit(): void {
    if (!this._group) {
      throw new Error(this._createHostError('component must be direct child of a segmented control toggle'));
    }

    if (this._group.isItemPreSelectedByValue(this.value())) {
      this.selected.set(true);
    }
  }

  public onClick(): void {
    if (!this.selected()) {
      this.changes.emit(new IdsSegmentedControlToggleItemChange(this, this.value()));
    }
  }

  public focus(options?: FocusOptions): void {
    this._buttonElement().nativeElement.focus(options);
  }
}
