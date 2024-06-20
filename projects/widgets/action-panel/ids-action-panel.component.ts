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
  addClassPrefix,
} from '@i-cell/widgets/core';

@Component({
  selector: 'ids-action-panel,div[idsActionPanel]',
  standalone: true,
  imports: [IdsActionItemComponent],
  hostDirectives: [
    CdkMenu,
    CdkTargetMenuAim,
  ],
  template: '<ng-content />',
  encapsulation: ViewEncapsulation.None,
})
export class IdsActionPanelComponent {
  private readonly _componentClass = 'ids-action-panel';

  public appearance = input<ActionPanelAppearanceType | null>(
    ActionPanelAppearance.FILLED,
  );

  public size = input<SizeType | null>(Size.COMFORTABLE);
  public variant = input<'light' | null>(AllVariants.LIGHT);

  public actionItems = contentChildren(IdsActionItemComponent);

  private _hostClasses = computed(() =>
    [
      this._componentClass,
      addClassPrefix(this._componentClass, this.appearance()),
      addClassPrefix(this._componentClass, this.size()),
      addClassPrefix(this._componentClass, this.variant()),
    ]
      .filter(Boolean)
      .join(' '),
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
