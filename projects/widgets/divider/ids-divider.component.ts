import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import {
  AllVariants,
  AllVariantsType,
  Orientation,
  OrientationType,
  Size,
  SizeType,
  addClassPrefix,
} from '@i-cell/widgets/core';

@Component({
  selector: 'ids-divider,div[idsDivider]',
  standalone: true,
  imports: [],
  template: '',
  encapsulation: ViewEncapsulation.None,
})
export class IdsDividerComponent {
  private readonly _componentClass = 'ids-divider';

  public type = input<OrientationType | null>(Orientation.HORIZONTAL);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);
  public width = input<string | null>('100%');
  public height = input<string | null>('100%');

  private _hostClasses = computed(() =>
    [
      this._componentClass,
      addClassPrefix(this._componentClass, this.type()),
      addClassPrefix(this._componentClass, this.size()),
      addClassPrefix(this._componentClass, this.variant()),
    ]
      .filter(Boolean)
      .join(' '),
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  @HostBinding('style.--ids-divider-width') get cssWidth(): string | null {
    return this.width();
  }

  @HostBinding('style.--ids-divider-height') get cssHeight(): string | null {
    return this.height();
  }
}
