import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import {
  Size,
  SizeType,
  SurfaceVariant,
  SurfaceVariantType,
} from '@i-cell/widgets/core';

@Component({
  selector: 'button[idsAvatar]',
  standalone: true,
  imports: [],
  templateUrl: './ids-avatar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsAvatarComponent {
  private readonly _componentClass = 'ids-avatar';

  public image = input<string | null>(null);
  public alt = input<string | null>(null);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<SurfaceVariantType | null>(SurfaceVariant.PRIMARY);

  private _hostClasses = computed(() =>
    [
      this._componentClass,
      this._addClassPrefix(this.size()),
      this._addClassPrefix(this.variant()),
    ]
      .filter(Boolean)
      .join(' '),
  );

  @HostBinding('type') private _type = 'button';

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  private _addClassPrefix(className: string | null): string | null {
    return className ? `${this._componentClass}-${className}` : null;
  }
}
