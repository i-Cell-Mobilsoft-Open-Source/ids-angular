import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {

  private _apollo = inject(Apollo);

  public getCollections(): Observable<unknown> {
    return this._apollo.query({
      query: gql`
        query Andris {
          collections {
            title
          }
        }
      `,
    });
  }
}
