import { Component, ElementRef, HostBinding, HostListener, ViewEncapsulation, computed, inject, input, signal } from '@angular/core';
import { AccordionAppearance, AccordionAppearanceType, Size, SizeType, coerceBooleanAttribute } from '@i-cell/widgets/core';
import { IdsIconComponent } from '@i-cell/widgets/icon';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';

@Component({
  selector: 'details[idsAccordion]',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-accordion.component.html',
  styleUrl: './ids-accordion.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsAccordionComponent {
  private readonly componentClass = 'ids-accordion';

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public appearance = input<AccordionAppearanceType | null>(AccordionAppearance.TEXT);
  public summary = input<string>('');
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  public isOpen = signal(false);
  public mdiChevronDown = mdiChevronDown;
  public mdiChevronUp = mdiChevronUp;

  private details: HTMLDetailsElement = inject(ElementRef).nativeElement;

  private hostClasses = computed(() =>
    [
      this.componentClass,
      this.addClassPrefix(this.size()),
      this.addClassPrefix(this.appearance()),
      ...[this.disabled() ? [this.addClassPrefix('disabled')] : []],
    ]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('class') get classes(): string {
    return this.hostClasses();
  }

  private addClassPrefix(className: string | null): string | null {
    return className ? `${this.componentClass}-${className}` : null;
  }

  @HostListener('toggle')
  private onToggle(): void {
    this.isOpen.set(this.details.open);
  }
}
