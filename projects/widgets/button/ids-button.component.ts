import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import {
  AllVariants,
  AllVariantsType,
  ButtonAppearance,
  ButtonAppearanceType,
  Size,
  SizeType,
  coerceBooleanAttribute,
} from '@i-cell/widgets/core';

@Component({
  selector: 'button[idsButton]',
  standalone: true,
  imports: [],
  templateUrl: './ids-button.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsButtonComponent {
  /** @ignore */
  private readonly _componentClass = 'ids-button';

  public appearance = input<ButtonAppearanceType | null>(
    ButtonAppearance.FILLED,
  );

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  /** @ignore */
  public iconLeading = contentChildren<unknown>('[icon-leading]');
  /** @ignore */
  public iconTrailing = contentChildren<unknown>('[icon-trailing]');

  /** @ignore */
  private _hostClasses = computed(() =>
    [
      this._componentClass,
      this._addClassPrefix(this.appearance()),
      this._addClassPrefix(this.size()),
      this._addClassPrefix(this.variant()),
    ]
      .filter(Boolean)
      .join(' '),
  );

  /** @ignore */
  @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean | null {
    return this.disabled() || null;
  }

  /** @ignore */
  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  /** @ignore */
  private _addClassPrefix(className: string | null): string | null {
    return className ? `${this._componentClass}-${className}` : null;
  }
}
