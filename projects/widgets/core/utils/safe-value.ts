export function safeValue<T>(value: T | undefined, fallbackValue: T): T {
  return value ? value : fallbackValue;
}
