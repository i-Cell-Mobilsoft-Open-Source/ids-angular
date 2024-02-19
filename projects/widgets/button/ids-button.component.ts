import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import { Appearance, AppearanceType } from './types/appearance.type';
import { Size, SizeType } from './types/size.type';
import { Variant, VariantType } from './types/variant.type';

@Component({
  selector: 'button[idsButton]',
  standalone: true,
  imports: [],
  templateUrl: './ids-button.component.html',
  styleUrl: './ids-button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsButtonComponent {
  public appearance = input<AppearanceType | null>(Appearance.FILLED);
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<VariantType | null>(Variant.PRIMARY);

  iconLeading = contentChildren<unknown>('[icon-leading]');
  iconTrailing = contentChildren<unknown>('[icon-trailing]');

  private hostClasses = computed(() =>
    [
      'ids-button',
      this.addClassPrefix(this.appearance()),
      this.addClassPrefix(this.size()),
      this.addClassPrefix(this.variant()),
    ]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('class') get classes(): string {
    return this.hostClasses();
  }

  private addClassPrefix(className: string | null): string | null {
    return className ? `ids-button-${className}` : null;
  }
}
