import { ResourceLoaderParams } from '@angular/core';
import { Observable } from 'rxjs';

export type IdsAutocompleteLoader = (params: ResourceLoaderParams<{ search: string | null }>) => Observable<string[]>;
