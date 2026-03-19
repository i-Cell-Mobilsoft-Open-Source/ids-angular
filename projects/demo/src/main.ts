import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, { ...appConfig, providers: [
  provideZoneChangeDetection(),
  ...appConfig.providers,
] })
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));
