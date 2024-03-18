import { Component, ElementRef, HostBinding, ViewEncapsulation, computed, contentChildren, inject, input } from '@angular/core';
import { AllVariants, AllVariantsType, Size, SizeType, TagAppearance, TagAppearanceType } from '@i-cell/widgets/core';

@Component({
  selector: 'ids-tag,button[idsTag]',
  standalone: true,
  imports: [],
  templateUrl: './ids-tag.component.html',
  styleUrl: './ids-tag.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsTagComponent {
  private readonly componentClass = 'ids-tag';

  private hostElement = inject(ElementRef).nativeElement as HTMLElement;

  public appearance = input<TagAppearanceType | null>(TagAppearance.FILLED);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);

  iconLeading = contentChildren<unknown>('[icon-leading]');
  iconTrailing = contentChildren<unknown>('[icon-trailing]');

  private hostClasses = computed(() =>
    [this.componentClass, this.addClassPrefix(this.appearance()), this.addClassPrefix(this.size()), this.addClassPrefix(this.variant())]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('type') get buttonType(): string | null {
    return this.hostElement.tagName === 'BUTTON' ? 'button' : null;
  }
  @HostBinding('class') get classes(): string {
    return this.hostClasses();
  }

  private addClassPrefix(className: string | null): string | null {
    return className ? `${this.componentClass}-${className}` : null;
  }
}
