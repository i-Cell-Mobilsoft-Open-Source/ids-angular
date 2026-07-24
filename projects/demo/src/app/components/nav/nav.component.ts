import { Menu } from './menu.interface';

import { CdkMenuModule } from '@angular/cdk/menu';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IsActiveMatchOptions, RouterModule } from '@angular/router';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import {
  IdsSideNavComponent,
  IdsSideNavSectionComponent,
  IdsSideNavTitleComponent,
  IdsSideNavItemComponent,
} from '@i-cell/ids-angular/side-nav';
import { TranslateModule } from '@ngx-translate/core';

const EXPAND_ANIMATION_DELAY = 300;

@Component({
  selector: 'ids-nav',
  imports: [
    RouterModule,
    TranslateModule,
    IdsIconComponent,
    IdsSideNavComponent,
    IdsSideNavSectionComponent,
    IdsSideNavTitleComponent,
    IdsSideNavItemComponent,
    CdkMenuModule,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NavComponent implements AfterViewInit {
  private readonly _elementRef = inject(ElementRef);
  private readonly _cdr = inject(ChangeDetectorRef);

  protected _menuItemsOverflow: Record<string, boolean> = {};
  public menu = input<Menu[]>([]);
  public open = false;

  public subsetMatchOptions: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'exact',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  private readonly _autoExpandedDeepestLevelIds = new Set<string>();

  constructor() {
    effect(() => {
      this.menu();
      this._openDeepestLevelItems();
    });
  }

  public ngAfterViewInit(): void {
    this.checkMenuItemOverflows();
    this._openDeepestLevelItems();
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
    this._scheduleAfter(() => {
      const menuItems = this._elementRef.nativeElement.querySelectorAll('ids-side-nav-item') as NodeListOf<HTMLElement>;

      this._menuItemsOverflow = Array.from(menuItems).reduce((items: Record<string, boolean>, menuItem: HTMLElement) => {
        const menuLabel = menuItem.querySelector(':scope > a > .ids-side-nav-item-label') as HTMLElement;
        if (!menuLabel || menuLabel.offsetWidth === 0) {
          return items;
        }
        const hasOverflow = menuLabel.scrollWidth > menuLabel.offsetWidth;
        return { ...items, [menuItem.id]: hasOverflow };
      }, {});
      this._cdr.markForCheck();
    }, delay);
  }

  private _openDeepestLevelItems(): void {
    this._scheduleAfter(() => {
      const menuItems = this._elementRef.nativeElement.querySelectorAll('ids-side-nav-item') as NodeListOf<HTMLElement>;

      menuItems.forEach((menuItem) => {
        if (!menuItem.id || this._autoExpandedDeepestLevelIds.has(menuItem.id)) {
          return;
        }

        const isExpandable = menuItem.classList.contains('ids-side-nav-item-expandable');
        if (!isExpandable) {
          return;
        }

        const hasNestedExpandable =
          menuItem.querySelector(':scope > .ids-side-nav-item-expandable-submenu .ids-side-nav-item-expandable') !== null;
        if (hasNestedExpandable) {
          return;
        }

        const anchor = menuItem.querySelector(':scope > a') as HTMLElement | null;
        const toggleButton = anchor?.querySelector('button') as HTMLButtonElement | null;
        const isExpanded = anchor?.getAttribute('aria-expanded') === 'true';

        if (toggleButton && !isExpanded) {
          toggleButton.click();
        }

        this._autoExpandedDeepestLevelIds.add(menuItem.id);
      });

      this._cdr.markForCheck();
    });
  }

  private _scheduleAfter(callback: () => void, delay = 0): void {
    const start = performance.now();

    const tick = (now: number): void => {
      if (now - start >= delay) {
        callback();
      } else {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }
}
