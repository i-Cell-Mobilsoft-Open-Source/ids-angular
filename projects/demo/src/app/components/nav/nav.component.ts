import { Menu } from './menu.interface';

import {
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  Injector,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import {
  IdsSideNavComponent,
  IdsSideNavItemComponent,
  IdsSideNavSectionComponent,
  IdsSideNavTitleComponent,
} from '@i-cell/ids-angular/side-nav';

const EXPAND_ANIMATION_DELAY = 300;

@Component({
  selector: 'ids-nav',
  imports: [
    IdsIconComponent,
    IdsSideNavComponent,
    IdsSideNavSectionComponent,
    IdsSideNavTitleComponent,
    IdsSideNavItemComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NavComponent {
  private readonly _elementRef = inject(ElementRef);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _injector = inject(Injector);

  protected _menuItemsOverflow: Record<string, boolean> = {};
  public menu = input<Menu[]>([]);

  public subsetMatchOptions: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'exact',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  protected readonly _menu = computed(() => this._markLeafExpandablesOpen(this.menu()));

  constructor() {
    effect(() => {
      this._menu();
      afterNextRender(() => this.checkMenuItemOverflows(), { injector: this._injector });
    });
  }

  @HostListener('window:resize')
  protected _onResize(): void {
    this.checkMenuItemOverflows();
  }

  @HostListener('click')
  protected _onClick(): void {
    this.checkMenuItemOverflows(EXPAND_ANIMATION_DELAY);
  }

  public checkMenuItemOverflows(delay = 0): void {
    this._runAfter(() => {
      const menuItems = this._elementRef.nativeElement.querySelectorAll('ids-side-nav-item') as NodeListOf<HTMLElement>;
      const overflow: Record<string, boolean> = {};

      for (const menuItem of Array.from(menuItems)) {
        if (!menuItem.id) {
          continue;
        }
        const menuLabel = menuItem.querySelector(':scope > a > .ids-side-nav-item-label') as HTMLElement | null;
        if (!menuLabel || menuLabel.offsetWidth === 0) {
          continue;
        }
        overflow[menuItem.id] = menuLabel.scrollWidth > menuLabel.offsetWidth;
      }

      this._menuItemsOverflow = overflow;
      this._cdr.markForCheck();
    }, delay);
  }

  private _markLeafExpandablesOpen(items: Menu[]): Menu[] {
    return items.map((item) => {
      const children = item.children?.length ? this._markLeafExpandablesOpen(item.children) : [];
      const isExpandable = children.length > 0;
      const hasNestedExpandable = children.some((child) => (child.children?.length ?? 0) > 0);

      return {
        ...item,
        children,
        $open: isExpandable && !hasNestedExpandable,
      };
    });
  }

  private _runAfter(callback: () => void, delay = 0): void {
    if (delay <= 0) {
      requestAnimationFrame(callback);
      return;
    }
    window.setTimeout(callback, delay);
  }
}
