import {
  ActionPanelAppearance,
  ActionPanelAppearanceType,
  AllVariants,
  Size,
  SizeType,
} from '@i-cell/widgets/core';
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
  private readonly _componentClass = 'ids-action-panel';

  public appearance = input<ActionPanelAppearanceType | null>(
    ActionPanelAppearance.FILLED
  );
  
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<'light' | null>(AllVariants.LIGHT);

  public actionItems = contentChildren(IdsActionItemComponent);

  private _hostClasses = computed(() =>
    [
      this._componentClass,
      this._addClassPrefix(this.appearance()),
      this._addClassPrefix(this.size()),
      this._addClassPrefix(this.variant()),
    ]
      .filter(Boolean)
      .join(' ')
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  private _addClassPrefix(className: string | null): string | null {
    return className ? `${this._componentClass}-${className}` : null;
  }
}
