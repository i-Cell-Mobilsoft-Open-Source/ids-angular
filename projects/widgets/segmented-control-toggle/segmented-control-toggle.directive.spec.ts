import { IdsSegmentedControlToggleDirective } from './segmented-control-toggle.directive';

import { TestBed } from '@angular/core/testing';

describe('IdsSegmentedControlToggleDirective', () => {
  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new IdsSegmentedControlToggleDirective());
    expect(directive).toBeTruthy();
  });
});
