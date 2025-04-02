import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  constructor(private apollo: Apollo) {}

  public getCollections(): Observable<unknown> {
    return this.apollo.query({
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
