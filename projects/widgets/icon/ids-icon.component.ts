import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { createHostClassList, Size, SizeType } from '@i-cell/ids-angular/core';

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
    createHostClassList(this._componentClass, [this.size()]),
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
