import { MenuItemAppearance, MenuItemAppearanceType } from './types/menu-item-appearance.type';
import { MenuItemVariant, MenuItemVariantType } from './types/menu-item-variant.type';

import { CdkMenuItem } from '@angular/cdk/menu';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import {
  Size,
  SizeType,
  coerceBooleanAttribute,
  createClassList,
} from '@i-cell/ids-angular/core';

@Component({
  selector: 'button[idsMenuItem],a[idsMenuItem]',
  standalone: true,
  imports: [],
  hostDirectives: [CdkMenuItem],
  templateUrl: './menu-item.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_hostClasses()',
    '[type]': 'buttonType',
    '[disabled]': 'disabled() || null',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class IdsMenuItemComponent {
  private readonly _componentClass = 'ids-menu-item';

  private _hostElement = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>).nativeElement;

  public label = input.required<string>();
  public appearance = input<MenuItemAppearanceType | null>(
    MenuItemAppearance.TEXT,
  );

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<MenuItemVariantType | null>(MenuItemVariant.SURFACE);
  public active = input(false);
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  public iconLeading = contentChildren<unknown>('[icon-leading]');
  public iconTrailing = contentChildren<unknown>('[icon-trailing]');

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.appearance(),
      this.size(),
      this.variant(),
      this.active() ? 'active' : null,
    ]),
  );

  public get buttonType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }
}
