import { Component, HostBinding, ViewEncapsulation, computed, input } from '@angular/core';
import { SizeType, Size } from '@i-cell/widgets/core';

@Component({
  selector: 'ids-icon',
  standalone: true,
  template: `<svg version="1.1" viewBox="0 0 24 24">
    <path [attr.d]="icon()" />
  </svg>`,
  styleUrls: ['./ids-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IdsIconComponent {
  private readonly componentClass = 'ids-icon';

  public icon = input.required<string>();
  public size = input<SizeType | null>(Size.COMFORTABLE);

  private hostClasses = computed(() =>
    [
      this.componentClass,
      this.addClassPrefix(this.size())
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
}
