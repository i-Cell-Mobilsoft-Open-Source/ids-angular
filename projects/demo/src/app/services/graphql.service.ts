import { GET_COMPONENTS } from '../queries/get-components.query';
import { GET_PAGES } from '../queries/get-pages.query';

import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
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
}
