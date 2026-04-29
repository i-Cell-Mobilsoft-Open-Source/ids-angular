import { PageEntry } from '../model/pageEntry';
import { GET_COMPONENTS_LIST } from '../queries/get-components-list.query';
import { GET_COMPONENTS } from '../queries/get-components.query';
import { GET_DYNAMIC_CONTENT } from '../queries/get-dynamic-content.query';
import { GET_NAVIGATION } from '../queries/get-navigation.query';
import { GET_PAGES_LIST } from '../queries/get-pages-list.query';
import { GET_PAGES } from '../queries/get-pages.query';

import { inject, Injectable } from '@angular/core';
import { ObservableQuery } from '@apollo/client/core';
import { TranslateService } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { map, Observable, startWith, switchMap } from 'rxjs';

export interface NavigationQueryResult {
  navs: Array<{
    max_depth: number | null;
    title: string;
    tree: StatamicNavNode[];
  }>;
}

export interface StatamicNavNode {
  depth: number;
  page?: {
    title?: string;
    id?: string;
    slug?: string;
  };
  children?: StatamicNavNode[];
}

export interface StatamicNavTreeBranch {
  children?: StatamicNavTreeBranch[];
  page?: {
    id: string;
    title: string;
    slug: string;
    comp_description?: string;
    comp_img_light_mode?: Array<{ url: string }>;
    comp_img_dark_mode?: Array<{ url: string }>;
  };
}

export interface StatamicNavsField {
  title: string;
  tree?: StatamicNavTreeBranch[];
}

export interface StatamicComponentListItem {
  navs_field: StatamicNavsField[];
  id: number;
  title: string;
  slug: string;
  comp_description?: string;
  comp_img_light_mode?: Array<{ url: string }>;
  comp_img_dark_mode?: Array<{ url: string }>;
  hero_description?: string;
  hero_image_light?: { url: string };
  hero_image_dark?: { url: string };
}

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  private _apollo = inject(Apollo);
  private _translate = inject(TranslateService);

  private _currentLang = this._translate.onLangChange.pipe(
    map(({ lang }) => lang),
    startWith(this._translate.getCurrentLang() || 'hu'),
  );

  public getComponents(slug: string): Observable<unknown> {
    return this._currentLang.pipe(
      switchMap(
        (lang) =>
          this._apollo.watchQuery({
            query: GET_COMPONENTS,
            variables: {
              site: lang,
              slug,
            },
            fetchPolicy: 'network-only',
          }).valueChanges,
      ),
    );
  }

  public getPages(): Observable<unknown> {
    return this._currentLang.pipe(
      switchMap(
        (lang) =>
          this._apollo.watchQuery({
            query: GET_PAGES,
            variables: {
              site: lang,
            },
            fetchPolicy: 'network-only',
          }).valueChanges,
      ),
    );
  }

  public getNavigation(): Observable<ObservableQuery.Result<NavigationQueryResult>> {
    return this._apollo.watchQuery<NavigationQueryResult>({
      query: GET_NAVIGATION,
    }).valueChanges;
  }

  public getComponentsList(): Observable<ObservableQuery.Result<{ entries: { data: Partial<StatamicComponentListItem>[] } }>> {
    return this._currentLang.pipe(
      switchMap(
        (lang) =>
          this._apollo.watchQuery<{ entries: { data: Partial<StatamicComponentListItem>[] } }>({
            query: GET_COMPONENTS_LIST,
            variables: {
              site: lang,
            },
            fetchPolicy: 'network-only',
          }).valueChanges,
      ),
    );
  }

  public getPagesList(collection: string, typeName: string, slug: string): Observable<ObservableQuery.Result<{ entry: PageEntry }>> {
    return this._currentLang.pipe(
      switchMap(
        (lang) =>
          this._apollo.watchQuery<{ entry: PageEntry }>({
            query: GET_PAGES_LIST(typeName),
            variables: {
              collection,
              slug,
              site: lang,
            },
            fetchPolicy: 'network-only',
          }).valueChanges,
      ),
    );
  }

  public getDynamicContent(collection: string, typeName: string, slug: string): Observable<ObservableQuery.Result<unknown>> {
    const dynamicQuery = GET_DYNAMIC_CONTENT(collection, typeName);
    return this._currentLang.pipe(
      switchMap(
        (lang) =>
          this._apollo.watchQuery({
            query: dynamicQuery,
            variables: {
              slug,
              site: lang,
            },
            fetchPolicy: 'network-only',
          }).valueChanges,
      ),
    );
  }
}
