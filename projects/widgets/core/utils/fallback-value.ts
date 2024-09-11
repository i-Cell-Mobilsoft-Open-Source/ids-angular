export function fallbackValue<T>(value: T | undefined, fallbackValue: T): T {
  return value ? value : fallbackValue;
}
