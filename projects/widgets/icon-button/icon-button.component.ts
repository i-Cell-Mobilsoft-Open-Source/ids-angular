import { IconButtonAppearance, IconButtonAppearanceType } from './types/icon-button-appearance';

import {
  Component,
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
  templateUrl: './icon-button.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.class]': '_hostClasses()',
    '[disabled]': 'disabled() || null',
    '[attr.aria-disabled]': 'disabled()',
  },
})
export class IdsIconButtonComponent {
  private readonly _componentClass = 'ids-icon-button';

  public appearance = input<IconButtonAppearanceType | null>(IconButtonAppearance.FILLED);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);
  public disabled = input(false, { transform: coerceBooleanAttribute });

  public icon = contentChildren(IdsIconComponent);

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.appearance(),
      this.size(),
      this.variant(),
    ]),
  );
}
