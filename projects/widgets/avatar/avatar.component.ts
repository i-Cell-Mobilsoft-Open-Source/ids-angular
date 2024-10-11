import {
  Component,
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
  templateUrl: './avatar.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_hostClasses()',
    '[type]': 'type()',
  },
})
export class IdsAvatarComponent {
  private readonly _componentClass = 'ids-avatar';

  public image = input<string | null>(null);
  public alt = input<string | null>(null);
  public type = input<string>('button');
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<SurfaceVariantType | null>(SurfaceVariant.PRIMARY);

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.size(),
      this.variant(),
    ]),
  );
}
