import { routes } from './app.routes';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { DynamicRoutesService } from './services/dynamic-routes.service';
import { CustomTitleStrategy } from './strategies/custom-title.strategy';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, TitleStrategy } from '@angular/router';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { IDS_ICON_DEFAULT_CONFIG, IdsIconDefaultConfig } from '@i-cell/ids-angular/icon';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

const iconDefaultConfig: IdsIconDefaultConfig = {
  iconAssetsPath: 'assets/icons',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideApollo((): ApolloClientOptions => {
      const httpLink = inject(HttpLink);
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'https://ids.statamic.icellmobilsoft.hu/graphql',
        }),
      };
    }),
    provideRouter(routes),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
        enforceLoading: false,
        useHttpBackend: false,
      }),
    }),
    provideAnimations(),
    { provide: IDS_ICON_DEFAULT_CONFIG, useValue: iconDefaultConfig },
    { provide: TitleStrategy, useClass: CustomTitleStrategy },
    provideAppInitializer(() => {
      const dynamicRoutesService = inject(DynamicRoutesService);
      return dynamicRoutesService.initialize();
    }),
  ],
};
