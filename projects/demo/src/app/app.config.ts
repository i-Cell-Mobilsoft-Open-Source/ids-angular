import { routes } from './app.routes';
import { NavigationNode, NavigationQueryResult } from './model/navigation';
import { GraphqlService } from './services/graphql.service';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router, withHashLocation, Route } from '@angular/router';
import { ApolloClientOptions, InMemoryCache, ApolloQueryResult } from '@apollo/client/core';
import { IDS_ICON_DEFAULT_CONFIG, IdsIconDefaultConfig } from '@i-cell/ids-angular/icon';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

function extractGeneratedSlugs(nodes: NavigationNode[]): string[] {
  const slugs: string[] = [];
  nodes.forEach((node) => {
    if (node.page?.slug && node.page?.generated === true) {
      slugs.push(node.page.slug);
    }
    if (node.children) {
      slugs.push(...extractGeneratedSlugs(node.children));
    }
  });
  return slugs;
}

export function initializeDynamicRoutes(
  graphqlService: GraphqlService,
  router: Router,
): () => Observable<ApolloQueryResult<NavigationQueryResult>> {
  return () =>
    graphqlService.getNavigation().pipe(
      take(1),
      tap((result: ApolloQueryResult<NavigationQueryResult>) => {
        const navs = result.data?.navs || [];
        const generatedSlugs: string[] = [];

        // iterate through the navigation tree and extract slugs from generated pages
        navs.forEach((nav: NavigationNode) => {
          if (nav.tree) {
            generatedSlugs.push(...extractGeneratedSlugs(nav.tree));
          }
        });

        const dynamicRoutes: Route[] = generatedSlugs.flatMap((slug) => [
          {
            path: slug,
            loadComponent: () => import('./pages/list-page/list-page.component').then((module) => module.ListPageComponent),
            data: {
              collection: 'pages',
              slug: slug,
            },
          },
          {
            path: `${slug}/:slug`,
            loadComponent: () =>
              import('./pages/list-page/content-page/content-page.component').then((module) => module.ContentPageComponent),
          },
        ]);

        const currentConfig = router.config;
        const fallbackRoute = currentConfig.pop();

        currentConfig.push(...dynamicRoutes);
        if (fallbackRoute) {
          currentConfig.push(fallbackRoute);
        }
        router.resetConfig(currentConfig);

        console.info('Beregisztrált dinamikus útvonalak:', generatedSlugs);
      }),
    );
}

const iconDefaultConfig: IdsIconDefaultConfig = {
  iconAssetsPath: 'assets/icons',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([])),
    provideApollo((): ApolloClientOptions<unknown> => {
      const httpLink = inject(HttpLink);
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'https://ids.statamic.icellmobilsoft.hu/graphql',
        }),
      };
    }),
    provideRouter(routes, withHashLocation()),
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
    provideAppInitializer(() => {
      const graphqlService = inject(GraphqlService);
      const router = inject(Router);
      return initializeDynamicRoutes(graphqlService, router)();
    }),
  ],
};
