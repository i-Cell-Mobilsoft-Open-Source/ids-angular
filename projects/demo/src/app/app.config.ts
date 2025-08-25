import { routes } from './app.routes';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation } from '@angular/router';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { IDS_ICON_DEFAULT_CONFIG, IdsIconDefaultConfig } from '@i-cell/ids-angular/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TRANSLATE_HTTP_LOADER_CONFIG, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

export function HttpLoaderFactory(): TranslateHttpLoader {
  return new TranslateHttpLoader();
}

const iconDefaultConfig: IdsIconDefaultConfig = {
  iconAssetsPath: 'assets/icons',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([])), // Provide HTTP Client globally
    provideApollo((): ApolloClientOptions<unknown> => {
      const httpLink = inject(HttpLink); // Correctly inject HttpLink
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'https://ids.statamic.icellmobilsoft.hu/graphql', // Update with your Statamic GraphQL URL
        }),
      };
    }),
    provideRouter(routes, withHashLocation()),
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
    { provide: TRANSLATE_HTTP_LOADER_CONFIG, useValue: {} },
  ],
};
