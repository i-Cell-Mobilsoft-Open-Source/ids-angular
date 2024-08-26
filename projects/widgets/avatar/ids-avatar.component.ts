import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import {
  createClassList,
  Size,
  SizeType,
  SurfaceVariant,
  SurfaceVariantType,
} from '@i-cell/ids-angular/core';

@Component({
  selector: 'button[idsAvatar]',
  standalone: true,
  imports: [],
  templateUrl: './ids-avatar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsAvatarComponent {
  /** @ignore */
  private readonly _componentClass = 'ids-avatar';

  public image = input<string | null>(null);
  public alt = input<string | null>(null);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<SurfaceVariantType | null>(SurfaceVariant.PRIMARY);

  /** @ignore */
  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.size(),
      this.variant(),
    ]),
  );

  /** @ignore */
  @HostBinding('type') private _type = 'button';

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
