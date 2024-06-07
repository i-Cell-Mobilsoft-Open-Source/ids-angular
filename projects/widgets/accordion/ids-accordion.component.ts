import { AccordionAppearance, AccordionAppearanceType, Size, SizeType, coerceBooleanAttribute } from '@i-cell/widgets/core';
import { Component, ElementRef, HostBinding, HostListener, ViewEncapsulation, computed, inject, input, signal } from '@angular/core';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';

import { IdsIconComponent } from '@i-cell/widgets/icon';

@Component({
  selector: 'details[idsAccordion]',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-accordion.component.html',
  styleUrl: './ids-accordion.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsAccordionComponent {
  private readonly _componentClass = 'ids-accordion';

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public appearance = input<AccordionAppearanceType | null>(AccordionAppearance.TEXT);
  public summary = input<string>('');
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  public isOpen = signal(false);
  public mdiChevronDown = mdiChevronDown;
  public mdiChevronUp = mdiChevronUp;

  private _details: HTMLDetailsElement = inject(ElementRef).nativeElement;

  private _hostClasses = computed(() =>
    [
      this._componentClass,
      this._addClassPrefix(this.size()),
      this._addClassPrefix(this.appearance()),
      ...[this.disabled() ? [this._addClassPrefix('disabled')] : []],
    ]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  private _addClassPrefix(className: string | null): string | null {
    return className ? `${this._componentClass}-${className}` : null;
  }

  @HostListener('toggle')
  private _onToggle(): void {
    this.isOpen.set(this._details.open);
  }
}
