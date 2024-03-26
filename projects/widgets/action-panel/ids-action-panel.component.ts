import { CdkMenu, CdkTargetMenuAim } from '@angular/cdk/menu';
import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import { IdsActionItemComponent } from '@i-cell/widgets/action-item';
import {
  ActionPanelAppearance,
  ActionPanelAppearanceType,
  AllVariants,
  Size,
  SizeType,
} from '@i-cell/widgets/core';

@Component({
  selector: 'ids-action-panel,div[idsActionPanel]',
  standalone: true,
  imports: [IdsActionItemComponent],
  hostDirectives: [CdkMenu, CdkTargetMenuAim],
  template: '<ng-content></ng-content>',
  styleUrl: './ids-action-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsActionPanelComponent {
  private readonly componentClass = 'ids-action-panel';

  public appearance = input<ActionPanelAppearanceType | null>(
    ActionPanelAppearance.FILLED
  );
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<'light' | null>(AllVariants.LIGHT);

  actionItems = contentChildren(IdsActionItemComponent);

  private hostClasses = computed(() =>
    [
      this.componentClass,
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
    return className ? `${this.componentClass}-${className}` : null;
  }
}
