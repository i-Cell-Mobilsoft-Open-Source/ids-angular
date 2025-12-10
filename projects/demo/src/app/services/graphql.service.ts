import { GET_COMPONENTS_LIST } from '../queries/get-components-list.query';
import { GET_COMPONENTS } from '../queries/get-components.query';
import { GET_NAVIGATION } from '../queries/get-navigation.query';
import { GET_PAGES } from '../queries/get-pages.query';

import { inject, Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

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

  public getComponents(): Observable<unknown> {
    return this._apollo.watchQuery({
      query: GET_COMPONENTS,
    }).valueChanges;
  }

  public getPages(): Observable<unknown> {
    return this._apollo.watchQuery({
      query: GET_PAGES,
    }).valueChanges;
  }

  public getNavigation(): Observable<ApolloQueryResult<NavigationQueryResult>> {
    return this._apollo.watchQuery<NavigationQueryResult>({
      query: GET_NAVIGATION,
    }).valueChanges;
  }

  public getComponentsList(): Observable<ApolloQueryResult<{ entries: { data: StatamicComponentListItem[] } }>> {
    return this._apollo.watchQuery<{ entries: { data: StatamicComponentListItem[] } }>({
      query: GET_COMPONENTS_LIST,
    }).valueChanges;
  }
}
