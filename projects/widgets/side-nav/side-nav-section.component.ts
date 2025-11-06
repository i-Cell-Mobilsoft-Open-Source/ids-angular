import { Component } from '@angular/core';

/**
 * Side navigation section
 * - section wrapper inside the navigation
 * - it can be used with selectors like `ids-side-nav-section` or `li[idsSideNavSection]`
 * - content should be projected
 */
@Component({
  selector: 'ids-side-nav-section, ul[idsSideNavSection]',
  imports: [],
  template: '<ng-content />',
  host: {
    class: 'ids-side-nav-section',
    role: 'tree',
  },
})
export class IdsSideNavSectionComponent {}
