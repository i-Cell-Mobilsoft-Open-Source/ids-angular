import { TranslateService } from '@ngx-translate/core';

export const AUTOCOMPLETE_BASIC_FRUIT_KEYS = [
  'APPLE',
  'BANANA',
  'CHERRY',
  'GRAPE',
  'ORANGE',
] as const;

export const AUTOCOMPLETE_EXTENDED_FRUIT_KEYS = [
  ...AUTOCOMPLETE_BASIC_FRUIT_KEYS,
  'KIWI',
  'LEMON',
  'MANGO',
] as const;

export const AUTOCOMPLETE_LIMIT_FRUIT_KEYS = [
  'APPLE',
  'BANANA',
  'BLUEBERRY',
  'CHERRY',
  'FIG',
  'GRAPE',
  'KIWI',
  'LEMON',
  'MANGO',
  'ORANGE',
  'PAPAYA',
  'PEACH',
  'PEAR',
  'PINEAPPLE',
  'RASPBERRY',
  'STRAWBERRY',
] as const;

export type AutocompleteFruitKey =
  | (typeof AUTOCOMPLETE_BASIC_FRUIT_KEYS)[number]
  | (typeof AUTOCOMPLETE_EXTENDED_FRUIT_KEYS)[number]
  | (typeof AUTOCOMPLETE_LIMIT_FRUIT_KEYS)[number];

export function getAutocompleteFruitLabelKey(key: string): string {
  return `EXAMPLES.AUTOCOMPLETE.FRUITS.${key}`;
}

export function getAutocompleteFruitLabel(translate: TranslateService, key: string): string {
  return translate.instant(getAutocompleteFruitLabelKey(key));
}

export function filterAutocompleteFruitOptions(
  translate: TranslateService,
  keys: readonly string[],
  query: string,
): string[] {
  const value = query.toLowerCase();

  return keys.filter((key) => getAutocompleteFruitLabel(translate, key).toLowerCase().includes(value));
}
