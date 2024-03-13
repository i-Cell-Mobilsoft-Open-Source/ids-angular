import {
  Component,
  ElementRef,
  HostBinding,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import {
  ActionItemAppearance,
  ActionItemAppearanceType,
  BaseVariant,
  Size,
  SizeType,
  coerceBooleanAttribute,
} from '@i-cell/widgets/core';

@Component({
  selector: 'button[idsActionItem],a[idsActionItem]',
  standalone: true,
  imports: [],
  templateUrl: './ids-action-item.component.html',
  styleUrl: './ids-action-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsActionItemComponent {
  private readonly componentClass = 'ids-action-item';

  private hostElement = inject(ElementRef).nativeElement as HTMLElement;

  public label = input.required<string>();
  public appearance = input<ActionItemAppearanceType | null>(
    ActionItemAppearance.TEXT
  );
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<'surface' | null>(BaseVariant.SURFACE);
  public active = input(false);
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  iconLeading = contentChild<unknown>('[icon-leading]');
  iconTrailing = contentChild<unknown>('[icon-trailing]');

  private hostClasses = computed(() =>
    [
      this.componentClass,
      this.addClassPrefix(this.appearance()),
      this.addClassPrefix(this.size()),
      this.addClassPrefix(this.variant()),
      ...[this.active() ? [this.addClassPrefix('active')] : []],
    ]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('type') get buttonType(): string | null {
    return this.hostElement.tagName === 'BUTTON' ? 'button' : null;
  }
  @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean | null {
    return this.disabled() || null;
  }
  @HostBinding('class') get classes(): string {
    return this.hostClasses();
  }

  private addClassPrefix(className: string | null): string | null {
    return className ? `${this.componentClass}-${className}` : null;
  }
}
