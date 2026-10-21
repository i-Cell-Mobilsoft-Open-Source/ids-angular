export type OptionExampleEntry = {
  value: string;
  labelKey: string;
};

export const OPTION_EXAMPLE_FRUITS: OptionExampleEntry[] = [
  { value: 'APPLE', labelKey: 'EXAMPLES.SELECT.FRUITS.APPLE' },
  { value: 'BANANA', labelKey: 'EXAMPLES.SELECT.FRUITS.BANANA' },
  { value: 'CHERRY', labelKey: 'EXAMPLES.SELECT.FRUITS.CHERRY' },
  { value: 'GRAPE', labelKey: 'EXAMPLES.SELECT.FRUITS.GRAPE' },
  { value: 'ORANGE', labelKey: 'EXAMPLES.SELECT.FRUITS.ORANGE' },
];

export const OPTION_EXAMPLE_LAND_ANIMALS: OptionExampleEntry[] = [
  { value: 'dog', labelKey: 'SELECT.LAND.DOG' },
  { value: 'cat', labelKey: 'SELECT.LAND.CAT' },
  { value: 'giraffe', labelKey: 'SELECT.LAND.GIRAFFE' },
];

export const OPTION_EXAMPLE_AQUATIC_ANIMALS: OptionExampleEntry[] = [
  { value: 'crocodile', labelKey: 'SELECT.AQUATIC.CROCODILE' },
  { value: 'whale', labelKey: 'SELECT.AQUATIC.WHALE' },
  { value: 'dolphin', labelKey: 'SELECT.AQUATIC.DOLPHIN' },
];
