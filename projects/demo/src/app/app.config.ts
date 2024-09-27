import { routes } from './app.routes';

import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { IDS_ICON_DEFAULT_CONFIG, IdsIconDefaultOptions } from '@i-cell/ids-angular/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/');
}

const iconDefaultConfig: IdsIconDefaultOptions = {
  iconAssetsPath: 'assets/icons',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    provideAnimations(),
    { provide: IDS_ICON_DEFAULT_CONFIG, useValue: iconDefaultConfig },
  ],
};
