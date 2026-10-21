import { IdsSegmentedControlDirective } from './segmented-control.directive';

import { TestBed } from '@angular/core/testing';

describe('IdsSegmentedControlDirective', () => {
  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new IdsSegmentedControlDirective());
    expect(directive).toBeTruthy();
  });
});
