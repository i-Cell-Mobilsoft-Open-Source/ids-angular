import { routes } from './app.routes';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { NavigationNode } from './model/navigation';
import { GraphqlService } from './services/graphql.service';
import { CustomTitleStrategy } from './strategies/custom-title.strategy';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, provideRouter, Router, Route, TitleStrategy } from '@angular/router';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { IDS_ICON_DEFAULT_CONFIG, IdsIconDefaultConfig } from '@i-cell/ids-angular/icon';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { filter, firstValueFrom } from 'rxjs';

interface GeneratedSlug {
  slug: string;
  title?: string;
}

function extractGeneratedSlugs(nodes: NavigationNode[]): GeneratedSlug[] {
  const slugs: GeneratedSlug[] = [];
  nodes.forEach((node) => {
    if (node.page?.slug && node.page?.generated === true) {
      slugs.push({ slug: node.page.slug, title: node.page.title ?? node.title });
    }
    if (node.children) {
      slugs.push(...extractGeneratedSlugs(node.children));
    }
  });
  return slugs;
}

export function initializeDynamicRoutes(graphqlService: GraphqlService, router: Router, titleService: Title): () => Promise<void> {
  const buildAndApplyRoutes = async(): Promise<void> => {
    const result = (await firstValueFrom(
      graphqlService.getNavigation().pipe(filter((res): res is { loading?: boolean } => !(res as { loading?: boolean }).loading)),
    )) as { data?: { navs?: NavigationNode[] } };

    const navs = result.data?.navs || [];
    const generatedSlugs: GeneratedSlug[] = [];

    navs.forEach((nav: NavigationNode) => {
      if (nav.tree) {
        generatedSlugs.push(...extractGeneratedSlugs(nav.tree));
      }
    });

    const dynamicRoutes: Route[] = generatedSlugs.flatMap(({ slug, title }) => [
      {
        path: slug,
        title,
        loadComponent: () => import('./pages/list-page/list-page.component').then((module) => module.ListPageComponent),
        data: {
          collection: 'pages',
          slug: slug,
        },
      },
      {
        path: `${slug}/:slug`,
        title: (routeSnapshot: ActivatedRouteSnapshot): string => (routeSnapshot.data['contentTitle'] as string | undefined) ?? title ?? '',
        loadComponent: () => import('./pages/list-page/content-page/content-page.component').then((module) => module.ContentPageComponent),
        data: {
          collection: slug,
        },
      },
    ]);

    const currentConfig = router.config;
    const langRoute = currentConfig.find((route) => route.path === ':lang');
    if (langRoute?.children) {
      const langChildren = langRoute.children;
      const staticPaths = new Set([
        'components',
        'home',
        'support',
        '',
      ]);
      const staticChildren = langChildren.filter((route) => staticPaths.has(route.path ?? ''));
      const fallbackChild = staticChildren.find((route) => route.path === '');
      const nonFallbackStaticChildren = staticChildren.filter((route) => route.path !== '');

      langRoute.children = [
        ...nonFallbackStaticChildren,
        ...dynamicRoutes,
        ...(fallbackChild ? [fallbackChild] : []),
      ];
    }
    router.resetConfig(currentConfig);

    try {
      const urlTree = router.parseUrl(router.url);
      const primaryOutlet = urlTree.root.children['primary'];

      if (primaryOutlet) {
        const segments = primaryOutlet.segments;

        if (segments.length >= 2) {
          const currentSlug = segments[1].path;
          const matchedSlug = generatedSlugs.find((slug) => slug.slug === currentSlug);

          if (matchedSlug && matchedSlug.title) {
            titleService.setTitle(`${matchedSlug.title} | i-Cell Design System`);
          }
        }
      }
    } catch(error) {
      console.warn('Nem sikerült frissíteni a dinamikus route címét nyelvváltáskor', error);
    }
  };

  return async() => {
    const translate = inject(TranslateService);
    translate.onLangChange.pipe(takeUntilDestroyed()).subscribe(() => {
      void buildAndApplyRoutes();
    });

    await buildAndApplyRoutes();
  };
}

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
      const graphqlService = inject(GraphqlService);
      const router = inject(Router);
      const titleService = inject(Title);
      return initializeDynamicRoutes(graphqlService, router, titleService)();
    }),
  ],
};
