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
  createHostClassList,
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
})
export class IdsDividerComponent {
  private readonly _componentClass = 'ids-divider';

  public type = input<OrientationType | null>(Orientation.HORIZONTAL);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<AllVariantsType | null>(AllVariants.PRIMARY);
  public width = input<string | null>('100%');
  public height = input<string | null>('100%');

  private _hostClasses = computed(() =>
    createHostClassList(this._componentClass, [
      this.type(),
      this.size(),
      this.variant(),
    ]),
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
