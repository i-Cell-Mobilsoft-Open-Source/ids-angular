import { ActionItemAppearance, ActionItemAppearanceType } from './types/ids-action-item-appearance';

import { CdkMenuItem } from '@angular/cdk/menu';
import {
  Component,
  ElementRef,
  HostBinding,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import {
  Size,
  SizeType,
  SurfaceVariant,
  coerceBooleanAttribute,
  createClassList,
} from '@i-cell/ids-angular/core';

@Component({
  selector: 'button[idsActionItem],a[idsActionItem]',
  standalone: true,
  imports: [],
  hostDirectives: [CdkMenuItem],
  templateUrl: './ids-action-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsActionItemComponent {
  private readonly _componentClass = 'ids-action-item';

  private _hostElement = inject(ElementRef).nativeElement as HTMLElement;

  public label = input.required<string>();
  public appearance = input<ActionItemAppearanceType | null>(
    ActionItemAppearance.TEXT,
  );

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<'surface' | null>(SurfaceVariant.SURFACE);
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

  @HostBinding('type') get buttonType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }

  @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean | null {
    return this.disabled() || null;
  }

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
