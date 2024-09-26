import { IconButtonAppearance, IconButtonAppearanceType } from './types/ids-icon-button-appearance';

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
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'button[idsIconButton]',
  standalone: true,
  imports: [],
  templateUrl: './ids-icon-button.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsIconButtonComponent {
  /** @ignore */
  private readonly _componentClass = 'ids-icon-button';

  public appearance = input<IconButtonAppearanceType | null>(
    IconButtonAppearance.FILLED,
  );

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  /** @ignore */
  public icon = contentChildren(IdsIconComponent);

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
