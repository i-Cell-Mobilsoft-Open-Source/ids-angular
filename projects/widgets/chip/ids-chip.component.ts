import { IDS_CHIP_DEFAULT_OPTIONS, IDS_CHIP_DEFAULT_OPTIONS_FACTORY } from './ids-chip-config';

import { IdsAvatarComponent } from '../avatar';
import { createHostClassList } from '../core/utils/class-prefix';
import { IdsIconComponent } from '../icon';
import { IdsIconButtonComponent } from '../icon-button';

import { Component, computed, contentChildren, effect, ElementRef, HostBinding, HostListener, inject, Injector, input, isDevMode, signal, ViewEncapsulation } from '@angular/core';
import { ChipAppearanceType, coerceNumberAttribute, SizeType, SurfaceVariantType } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

const defaults = IDS_CHIP_DEFAULT_OPTIONS_FACTORY();

@Component({
  selector: 'ids-chip',
  standalone: true,
  imports: [],
  templateUrl: './ids-chip.component.html',
  host: {
    'role': 'button',
  },
  encapsulation: ViewEncapsulation.None,
})
export class IdsChipComponent {
  private readonly _componentClass = 'ids-chip';
  private _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private _injector = inject(Injector);
  private _defaultOptions = { ...defaults, ...this._injector.get(IDS_CHIP_DEFAULT_OPTIONS, null, { optional: true }) };

  private _hostElement = inject(ElementRef).nativeElement as HTMLElement;

  public id = input<string>(this._uniqueId);
  private _elementId = computed(() => this.id() || this._uniqueId);
  public appearance = input<ChipAppearanceType | null>(this._defaultOptions.appearance);
  public size = input<SizeType | null>(this._defaultOptions.size);
  public variant = input<SurfaceVariantType | null>(this._defaultOptions.variant);
  public disabled = input<boolean>(false);
  public tabIndex = input(0, { transform: coerceNumberAttribute });
  public dragging = signal(false);

  public iconLeading = contentChildren<IdsIconComponent>('[icon-leading]');
  public iconTrailing = contentChildren<IdsIconButtonComponent>('button[idsIconButton][icon-trailing]');
  public avatar = contentChildren<IdsAvatarComponent>('ids-avatar');

  private _hostClasses = computed(() => createHostClassList(this._componentClass, [
    this.appearance(),
    this.size(),
    this.variant(),
    this.disabled() ? 'disabled' : null,
    this.dragging() ? 'dragged' : null,
  ]),
  );

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  @HostBinding('id') get hostId(): string {
    return this._elementId();
  }
  
  @HostBinding('tabindex') get hostTabIndex(): number {
    return this.tabIndex();
  }

  constructor() {
    effect(() => {
      const hasIconleading = this.iconLeading().length > 0;
      const hasAvatar = this.avatar().length > 0;
      
      if (isDevMode() && hasIconleading && hasAvatar) {
        throw new Error('Chip: Avatar and leading icon can not be used together.');
      }
    });
  }

  @HostListener('dragover', ['$event']) public onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(true);
  }

  @HostListener('dragleave') public onDraLeave(): void {
    this.dragging.set(false);
  }

  @HostListener('drop') public onDrop(): void {
    this.dragging.set(false);
  }
}
