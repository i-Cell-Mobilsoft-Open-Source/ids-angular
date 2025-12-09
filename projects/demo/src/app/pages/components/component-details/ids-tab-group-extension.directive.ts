import { AfterViewInit, DestroyRef, Directive, inject, input, output } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { IdsTabGroupComponent } from '@i-cell/ids-angular/tab';
// import { isNil } from 'lodash-es';
import { skip, tap } from 'rxjs';

/**
 * Extends the functionality of ids-tab-group with
 * - input: predefined selected tab
 * - output: tab change event emitter
 *
 * functionalities.
 */
@Directive({
  selector: 'ids-tab-group',
})
export class IdsTabGroupExtensionDirective implements AfterViewInit {
  public selectedTabIndex = input<number>();
  public selectedTabChange = output<number>();
  private _destroyRef = inject(DestroyRef);
  private _tabGroup = inject(IdsTabGroupComponent);

  constructor() {
    // emit `selectedTabIndex` of `tab-group` host, except initial value
    toObservable(this._tabGroup.selectedTabIndex)
      .pipe(
        skip(1),
        tap((index) => this.selectedTabChange.emit(index)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  public ngAfterViewInit(): void {
    const selectedTab = this.selectedTabIndex();
    // when (inner `selectedTabIndex` of) tab-group is initialized and `selectedTabIndex` input(!) is valid
    if (selectedTab !== undefined && selectedTab !== null) {
      this._tabGroup.selectTab(selectedTab);
    }
  }
}
