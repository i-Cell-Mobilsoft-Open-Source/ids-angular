import { AccordionAppearance, AccordionAppearanceType } from './types/ids-accordion-appearance';

import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
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
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';

@Component({
  selector: 'details[idsAccordion]',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-accordion.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsAccordionComponent {
  private readonly _componentClass = 'ids-accordion';

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public appearance = input<AccordionAppearanceType | null>(
    AccordionAppearance.TEXT,
  );

  public summary = input<string>('');
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  public isOpen = signal(false);
  public mdiChevronDown = mdiChevronDown;
  public mdiChevronUp = mdiChevronUp;

  private _details: HTMLDetailsElement = inject(ElementRef).nativeElement;

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.size(),
      this.appearance(),
      this.disabled() ? 'disabled' : null,
    ]),
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  @HostListener('toggle')
  private _onToggle(): void {
    this.isOpen.set(this._details.open);
  }
}
