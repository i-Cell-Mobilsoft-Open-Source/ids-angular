import { ApplicationConfig } from '@angular/core';
import {
  IDS_SNACKBAR_DEFAULT_CONFIG,
  IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY,
} from '@i-cell/ids-angular/snackbar';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: IDS_SNACKBAR_DEFAULT_CONFIG,
      useFactory: () => ({
        ...IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY(),
        position: 'top-right',
        size: 'compact',
        viewportMargin: 24,
        newestAtStartPosition: true,
      }),
    },
  ],
};
