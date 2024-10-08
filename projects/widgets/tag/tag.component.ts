import { TagAppearance, TagAppearanceType } from './types/tag-appearance';

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
  AllVariants,
  AllVariantsType,
  createClassList,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';

@Component({
  selector: 'ids-tag,button[idsTag]',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsTagComponent {
  /** @ignore */
  private readonly _componentClass = 'ids-tag';

  /** @ignore */
  private _hostElement = inject(ElementRef).nativeElement as HTMLElement;

  public appearance = input<TagAppearanceType | null>(TagAppearance.FILLED);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);

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
  @HostBinding('type') get buttonType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }

  /** @ignore */
  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
