import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import {
  BaseVariant,
  BaseVariantType,
  Size,
  SizeType,
} from '@i-cell/widgets/core';

@Component({
  selector: 'button[idsAvatar]',
  standalone: true,
  imports: [],
  templateUrl: './ids-avatar.component.html',
  styleUrl: './ids-avatar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsAvatarComponent {
  private readonly componentClass = 'ids-avatar';

  public image = input<string | null>(null);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<BaseVariantType | null>(BaseVariant.PRIMARY);

  private hostClasses = computed(() =>
    [
      this.componentClass,
      this.addClassPrefix(this.size()),
      this.addClassPrefix(this.variant()),
    ]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('type') _type = 'button';

  @HostBinding('class') get classes(): string {
    return this.hostClasses();
  }

  private addClassPrefix(className: string | null): string | null {
    return className ? `${this.componentClass}-${className}` : null;
  }
}
