import { PageEntry } from '../model/pageEntry';
import { GET_COMPONENTS_LIST } from '../queries/get-components-list.query';
import { GET_COMPONENTS } from '../queries/get-components.query';
import { GET_DYNAMIC_CONTENT } from '../queries/get-dynamic-content.query';
import { GET_GLOBALS } from '../queries/get-globals.query';
import { GET_NAVIGATION } from '../queries/get-navigation.query';
import { GET_PAGES_LIST } from '../queries/get-pages-list.query';
import { GET_PAGES } from '../queries/get-pages.query';

import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
    url?: string;
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

export interface StatamicFooterGlobal {
  footer_copyright?: string;
  footer_certs?: Array<{ url: string }>;
  footer_logo?: { url: string };
  footer_contact_group?: {
    company_name?: string;
    company_address?: string;
    company_email?: string;
    company_phone_number?: string;
    address_icon?: string;
    email_icon?: string;
    phone_icon?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  private _apollo = inject(Apollo);
  private _translate = inject(TranslateService);

  private _currentLang(): string {
    return sessionStorage.getItem('ids_lang') || this._translate.getCurrentLang() || 'en';
  }

  public getComponents(slug: string): Observable<unknown> {
    return this._apollo.query({
      query: GET_COMPONENTS,
      variables: { site: this._currentLang(), slug },
      fetchPolicy: 'network-only',
    });
  }

  public getPages(): Observable<unknown> {
    return this._apollo.query({
      query: GET_PAGES,
      variables: { site: this._currentLang() },
      fetchPolicy: 'network-only',
    });
  }

  public getGlobals(): Observable<unknown> {
    return this._apollo.watchQuery({
      query: GET_GLOBALS,
    }).valueChanges;
  }

  public getNavigation(): Observable<unknown> {
    return this._apollo.query<NavigationQueryResult>({
      query: GET_NAVIGATION,
      variables: {
        site: this._currentLang(),
      },
      fetchPolicy: 'no-cache',
    });
  }

  public getComponentsList(): Observable<unknown> {
    return this._apollo.query({
      query: GET_COMPONENTS_LIST,
      variables: {
        site: this._currentLang(),
      },
      fetchPolicy: 'network-only',
    });
  }

  public getPagesList(collection: string, typeName: string, slug: string): Observable<unknown> {
    return this._apollo.query<{ entry: PageEntry }>({
      query: GET_PAGES_LIST(typeName),
      variables: {
        collection,
        slug,
        site: this._currentLang(),
      },
      fetchPolicy: 'network-only',
    });
  }

  public getDynamicContent(collection: string, typeName: string, slug: string): Observable<unknown> {
    const dynamicQuery = GET_DYNAMIC_CONTENT(collection, typeName);
    return this._apollo.query({
      query: dynamicQuery,
      variables: {
        slug,
        site: this._currentLang(),
      },
      fetchPolicy: 'network-only',
    });
  }

  public getFooterGlobals(): Observable<unknown> {
    return this._apollo.watchQuery<{ globalSet: StatamicFooterGlobal }>({
      query: GET_GLOBALS,
    }).valueChanges;
  }
}
