import { InjectionToken } from '@angular/core';

export interface IdsAutocompleteDefaultConfig {
  minChars?: number;
  hintLoading: string;
  hintNoResults: string;
  hintMinChars: string;
  hintMaxLength: string;
  typeaheadDebounceInterval?: number;
}

export const IDS_AUTOCOMPLETE_DEFAULT_CONFIG = new InjectionToken<IdsAutocompleteDefaultConfig>(
  'IDS_AUTOCOMPLETE_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_AUTOCOMPLETE_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_AUTOCOMPLETE_DEFAULT_CONFIG_FACTORY(): Required<IdsAutocompleteDefaultConfig> {
  return {
    minChars: 1,
    hintLoading: 'Loading...',
    hintNoResults: 'No results found',
    hintMinChars: 'Please provide at least 1 characters',
    hintMaxLength: 'Too many results, please refine your search',
    typeaheadDebounceInterval: 300,
  };
}
