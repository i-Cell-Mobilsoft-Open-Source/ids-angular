import { ButtonAppearance, ButtonAppearanceType } from './types/ids-button-appearance';

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
  Size,
  SizeType,
  coerceBooleanAttribute,
  createClassList,
} from '@i-cell/ids-angular/core';

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
    createClassList(this._componentClass, [
      this.appearance(),
      this.size(),
      this.variant(),
    ]),
  );

  /** @ignore */
  @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean | null {
    return this.disabled() || null;
  }

  /** @ignore */
  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
