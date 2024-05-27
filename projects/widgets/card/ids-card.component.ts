import { Component, EventEmitter, HostBinding, OnInit, Output, ViewEncapsulation, computed, input, signal } from '@angular/core';
import { AllVariants, AllVariantsType, CardAppearance, CardAppearanceType, Orientation, OrientationType, Size, SizeType, coerceBooleanAttribute } from '@i-cell/widgets/core';
import { IdsCardHeaderComponent } from './ids-card-header.component';

@Component({
  selector: 'ids-card,div[idsCard],article[idsCard],aside[idsCard],section[idsCard]',
  standalone: true,
  imports: [IdsCardHeaderComponent],
  template: `
    <ng-content></ng-content>
    <ng-content select="ids-card-footer,footer[idsCardFooter]"></ng-content>
  `,
  styleUrl: './ids-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class IdsCardComponent implements OnInit {
  private readonly componentClass = 'ids-card';

  public appearance = input<CardAppearanceType | null>(CardAppearance.FILLED);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.SURFACE);
  public orientation = input<OrientationType | null>(Orientation.VERTICAL);
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  // Old fashion output for now, signal outputs cannot be queried as of now for subscribers
  @Output()
  public click = new EventEmitter();

  private hasClickHandler = signal(false);

  private hostClasses = computed(() =>
    [
      this.componentClass,
      this.addClassPrefix(this.appearance()),
      this.addClassPrefix(this.size()),
      this.addClassPrefix(this.variant()),
      this.addClassPrefix(this.orientation()),
      ...[this.disabled() && this.hasClickHandler() ? [this.addClassPrefix('disabled')] : []],
      ...[this.hasClickHandler() ? [this.addClassPrefix('clickable')] : []],
    ]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('class') get classes(): string {
    return this.hostClasses();
  }
  @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean | null {
    return this.disabled() || null;
  }
  @HostBinding('attr.tabindex') get tabIndex(): number | null {
    return this.hasClickHandler() ? 0 : null;
  }

  ngOnInit(): void {
    this.hasClickHandler.set(this.click.observed);
  }

  private addClassPrefix(className: string | null): string | null {
    return className ? `${this.componentClass}-${className}` : null;
  }
}
