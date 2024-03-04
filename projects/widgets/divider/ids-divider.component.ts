import { Component, HostBinding, ViewEncapsulation, computed, input } from '@angular/core';
import { AllVariants, AllVariantsType, Orientation, OrientationType, Size, SizeType } from '@i-cell/widgets/core';

@Component({
  selector: 'ids-divider,div[idsDivider]',
  standalone: true,
  imports: [],
  template: '',
  styleUrl: './ids-divider.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class IdsDividerComponent {
  private readonly componentClass = 'ids-divider';

  public type = input<OrientationType | null>(Orientation.HORIZONTAL);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);
  public width = input<string | null>('auto');
  public height = input<string | null>('200px');

  private hostClasses = computed(() =>
    [
      this.componentClass,
      this.addClassPrefix(this.type()),
      this.addClassPrefix(this.size()),
      this.addClassPrefix(this.variant()),
    ]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('class') get classes(): string {
    return this.hostClasses();
  }
  @HostBinding('style.--ids-divider-width') get cssWidth(): string | null  {
    return this.width();
  }
  @HostBinding('style.--ids-divider-height') get cssHeight(): string | null  {
    return this.height();
  }

  private addClassPrefix(className: string | null): string | null {
    return className ? `${this.componentClass}-${className}` : null;
  }
}
