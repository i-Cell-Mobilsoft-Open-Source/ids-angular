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
  IconButtonAppearance,
  IconButtonAppearanceType,
  Size,
  SizeType,
  coerceBooleanAttribute,
  createHostClassList,
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
  private readonly _componentClass = 'ids-icon-button';

  public appearance = input<IconButtonAppearanceType | null>(
    IconButtonAppearance.FILLED,
  );

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  public icon = contentChildren(IdsIconComponent);

  private _hostClasses = computed(() =>
    createHostClassList(this._componentClass, [
      this.appearance(),
      this.size(),
      this.variant(),
    ]),
  );

  @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean | null {
    return this.disabled() || null;
  }

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
