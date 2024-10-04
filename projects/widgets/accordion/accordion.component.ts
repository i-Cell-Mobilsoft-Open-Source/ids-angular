import { AccordionAppearance, AccordionAppearanceType } from './types/accordion-appearance';

import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  Size,
  SizeType,
  coerceBooleanAttribute,
  createClassList,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'details[idsAccordion]',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './accordion.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_hostClasses()',
    '(toggle)': '_onToggle()',
  },
})
export class IdsAccordionComponent {
  /** @ignore */
  private readonly _componentClass = 'ids-accordion';

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public appearance = input<AccordionAppearanceType | null>(
    AccordionAppearance.TEXT,
  );

  public summary = input<string>('');
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  /** @ignore */
  public isOpen = signal(false);

  /** @ignore */
  private _details: HTMLDetailsElement = inject(ElementRef).nativeElement;

  /** @ignore */
  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.size(),
      this.appearance(),
      this.disabled() ? 'disabled' : null,
    ]),
  );

  private _onToggle(): void {
    this.isOpen.set(this._details.open);
  }
}