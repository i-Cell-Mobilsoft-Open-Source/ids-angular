import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { Size, SizeType, addClassPrefix } from '@i-cell/widgets/core';

@Component({
  selector: 'ids-icon',
  standalone: true,
  template: `<svg version="1.1" viewBox="0 0 24 24">
    <path [attr.d]="icon()" />
  </svg>`,
  styleUrls: ['./ids-icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IdsIconComponent {
  private readonly _componentClass = 'ids-icon';

  public icon = input.required<string>();
  public size = input<SizeType | null>(Size.COMFORTABLE);

  private _hostClasses = computed(() =>
    [
      this._componentClass,
      addClassPrefix(this._componentClass, this.size()),
    ]
      .filter(Boolean)
      .join(' '),
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
