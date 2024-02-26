import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import { ButtonAppearance, ButtonAppearanceType } from './types/button-appearance.type';
import { Size, SizeType, Variant, VariantType } from '@i-cell/widgets/core';

@Component({
  selector: 'button[idsButton]',
  standalone: true,
  imports: [],
  templateUrl: './ids-button.component.html',
  styleUrl: './ids-button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsButtonComponent {
  private readonly componentClass = 'ids-button';

  public appearance = input<ButtonAppearanceType | null>(ButtonAppearance.FILLED);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<VariantType | null>(Variant.PRIMARY);
  public disabled = input(false, {
    transform: (value: boolean | string) =>
      value != null && `${value}` !== 'false',
  });

  iconLeading = contentChildren<unknown>('[icon-leading]');
  iconTrailing = contentChildren<unknown>('[icon-trailing]');

  private hostClasses = computed(() =>
    [
      this.componentClass,
      this.addClassPrefix(this.appearance()),
      this.addClassPrefix(this.size()),
      this.addClassPrefix(this.variant()),
    ]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean | null {
    return this.disabled() || null;
  }
  @HostBinding('class') get classes(): string {
    return this.hostClasses();
  }

  private addClassPrefix(className: string | null): string | null {
    return className ? `${this.componentClass}-${className}` : null;
  }
}
