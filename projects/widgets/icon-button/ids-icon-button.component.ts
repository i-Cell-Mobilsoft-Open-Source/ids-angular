import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import {
  IconButtonAppearance,
  IconButtonAppearanceType,
  Size,
  SizeType,
  ButtonVariant,
  ButtonVariantType,
} from '@i-cell/widgets/core';

@Component({
  selector: 'button[idsIconButton]',
  standalone: true,
  imports: [],
  templateUrl: './ids-icon-button.component.html',
  styleUrl: './ids-icon-button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsIconButtonComponent {
  private readonly componentClass = 'ids-icon-button';

  public appearance = input<IconButtonAppearanceType | null>(
    IconButtonAppearance.FILLED
  );
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<ButtonVariantType | null>(ButtonVariant.PRIMARY);
  public disabled = input(false, {
    transform: (value: boolean | string) =>
      value != null && `${value}` !== 'false',
  });

  icon = contentChildren<unknown>('[icon]');

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
