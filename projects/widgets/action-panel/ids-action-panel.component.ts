import { CdkMenu, CdkTargetMenuAim } from '@angular/cdk/menu';
import {
  Component,
  HostBinding,
  ViewEncapsulation,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import { IdsActionItemComponent } from '@i-cell/ids-angular/action-item';
import {
  ActionPanelAppearance,
  ActionPanelAppearanceType,
  AllVariants,
  createHostClassList,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';

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

  private _hostClasses = computed(() => createHostClassList(this._componentClass, [
    this.appearance(),
    this.size(),
    this.variant(),
  ]),
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }
}
