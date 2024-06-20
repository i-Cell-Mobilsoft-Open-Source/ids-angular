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
  Size,
  SizeType,
  TagAppearance,
  TagAppearanceType,
  addClassPrefix,
} from '@i-cell/widgets/core';

@Component({
  selector: 'ids-tag,button[idsTag]',
  standalone: true,
  imports: [],
  templateUrl: './ids-tag.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsTagComponent {
  private readonly _componentClass = 'ids-tag';

  private _hostElement = inject(ElementRef).nativeElement as HTMLElement;

  public appearance = input<TagAppearanceType | null>(TagAppearance.FILLED);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);

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

  @HostBinding('type') get buttonType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
