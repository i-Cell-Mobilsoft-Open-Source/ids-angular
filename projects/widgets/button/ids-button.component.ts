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
  addClassPrefix,
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
  private readonly _componentClass = 'ids-button';

  public appearance = input<ButtonAppearanceType | null>(
    ButtonAppearance.FILLED,
  );

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  public iconLeading = contentChildren<unknown>('[icon-leading]');
  public iconTrailing = contentChildren<unknown>('[icon-trailing]');

  private _hostClasses = computed(() =>
    [
      this._componentClass,
      addClassPrefix(this._componentClass, this.appearance()),
      addClassPrefix(this._componentClass, this.size()),
      addClassPrefix(this._componentClass, this.variant()),
    ]
      .filter(Boolean)
      .join(' '),
  );

  @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean | null {
    return this.disabled() || null;
  }

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
