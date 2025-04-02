import { GraphqlService } from './graphql.service';

import { TestBed } from '@angular/core/testing';

describe('GraphqlService', () => {
  let service: GraphqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
