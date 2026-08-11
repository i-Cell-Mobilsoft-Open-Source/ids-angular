import { GraphqlService } from './graphql.service';

import { NavigationNode } from '../model/navigation';
import { APP_TITLE_SUFFIX } from '../strategies/custom-title.strategy';

import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, firstValueFrom } from 'rxjs';

const MIN_SLUG_LENGTH = 2;

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

@Injectable({ providedIn: 'root' })
export class DynamicRoutesService {
  private readonly _graphqlService = inject(GraphqlService);
  private readonly _router = inject(Router);
  private readonly _titleService = inject(Title);
  private readonly _translate = inject(TranslateService);

  public async initialize(): Promise<void> {
    this._translate.onLangChange.pipe(takeUntilDestroyed()).subscribe(() => {
      void this._buildAndApplyRoutes();
    });

    await this._buildAndApplyRoutes();
  }

  private async _buildAndApplyRoutes(): Promise<void> {
    const result = (await firstValueFrom(
      this._graphqlService.getNavigation().pipe(filter((res): res is { loading?: boolean } => !(res as { loading?: boolean }).loading)),
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
        loadComponent: () => import('../pages/list-page/list-page.component').then((module) => module.ListPageComponent),
        data: {
          collection: 'pages',
          slug: slug,
        },
      },
      {
        path: `${slug}/:slug`,
        title: (routeSnapshot: ActivatedRouteSnapshot): string => (routeSnapshot.data['contentTitle'] as string | undefined) ?? title ?? '',
        loadComponent: () => import('../pages/list-page/content-page/content-page.component').then((module) => module.ContentPageComponent),
        data: {
          collection: slug,
        },
      },
    ]);

    const currentConfig = this._router.config;
    const langRoute = currentConfig.find((route: Route) => route.path === ':lang');
    if (langRoute?.children) {
      const langChildren = langRoute.children;
      const staticPaths = new Set([
        'components',
        'home',
        'support',
        '',
      ]);
      const staticChildren = langChildren.filter((route: Route) => staticPaths.has(route.path ?? ''));
      const fallbackChild = staticChildren.find((route: Route) => route.path === '');
      const nonFallbackStaticChildren = staticChildren.filter((route: Route) => route.path !== '');

      langRoute.children = [
        ...nonFallbackStaticChildren,
        ...dynamicRoutes,
        ...(fallbackChild ? [fallbackChild] : []),
      ];
    }
    this._router.resetConfig(currentConfig);

    const urlTree = this._router.parseUrl(this._router.url);
    const primaryOutlet = urlTree.root.children['primary'];

    if (primaryOutlet) {
      const segments = primaryOutlet.segments;

      if (segments.length >= MIN_SLUG_LENGTH) {
        const currentSlug = segments[1].path;
        const matchedSlug = generatedSlugs.find((slug) => slug.slug === currentSlug);

        if (matchedSlug && matchedSlug.title) {
          this._titleService.setTitle(`${matchedSlug.title} | ${APP_TITLE_SUFFIX}`);
        }
      }
    }
  }
}
