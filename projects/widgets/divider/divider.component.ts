import {
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import {
  AllVariants,
  AllVariantsType,
  createClassList,
  Orientation,
  OrientationType,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';

@Component({
  selector: 'ids-divider,div[idsDivider]',
  standalone: true,
  imports: [],
  template: '',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_hostClasses()',
    '[style.width]': '_safeWidth()',
    '[style.height]': '_safeHeight()',
  },
})
export class IdsDividerComponent {
  private readonly _componentClass = 'ids-divider';

  public orientation = input<OrientationType | null>(Orientation.HORIZONTAL);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);
  public width = input<string | null>('100%');
  public height = input<string | null>('100%');
  private _safeWidth = computed(() => (this.orientation() === Orientation.HORIZONTAL ? this.width() : null));
  private _safeHeight = computed(() => (this.orientation() === Orientation.VERTICAL ? this.height() : null));

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.orientation(),
      this.size(),
      this.variant(),
    ]),
  );
}
