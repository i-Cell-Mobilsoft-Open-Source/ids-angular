import { GET_NAVIGATION } from '../queries/get-navigation.query';

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

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private _apollo = inject(Apollo);

  public getNavigation(): Observable<ApolloQueryResult<NavigationQueryResult>> {
    return this._apollo.watchQuery<NavigationQueryResult>({
      query: GET_NAVIGATION,
    }).valueChanges;
  }
}
