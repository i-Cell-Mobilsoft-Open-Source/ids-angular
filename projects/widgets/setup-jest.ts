import { toHaveNoViolations } from 'jest-axe';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

expect.extend(toHaveNoViolations);

// jsdom does not implement ResizeObserver
globalThis.ResizeObserver ??= class {
  public observe(): void {}
  public unobserve(): void {}
  public disconnect(): void {}
};
