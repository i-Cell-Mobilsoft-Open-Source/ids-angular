import { IdsSegmentedControlDirective } from '../ids-segmented-control.directive';

import { Component, computed, EventEmitter, HostBinding, inject, Injector, input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { createHostClassList } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiCheck } from '@mdi/js';

let nextUniqueId = 0;

@Component({
  selector: 'ids-segmented-control-item',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-segmented-control-item.component.html',
  styleUrl: './ids-segmented-control-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsSegmentedControlItemComponent implements OnInit {
  private readonly _componentClass = 'ids-segmented-control-item';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);

  public readonly iconChecked = mdiCheck;

  public selected: boolean = false;

  public id = input<string>(this._uniqueId);
  public label = input<string>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labeledby' });

  @Output() public readonly changes = new EventEmitter<boolean>();

  private _hostClasses = computed(() => createHostClassList(this._componentClass));

  @HostBinding('id') get hostId(): string {
    return this.id();
  }

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  public ngOnInit(): void {
    const parent = this._injector.get(IdsSegmentedControlDirective, null, { optional: true, skipSelf: true });
    if (!parent) {
      throw new Error('Segmented control item: segmented control item must be inside a segmented control.');
    }
  }

  public onClick(): void {
    this.changes.emit(!this.selected);
  }
}
