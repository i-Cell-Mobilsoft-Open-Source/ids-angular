/** Converts a bound attribute's value to a boolean. */
export function coerceBooleanAttribute(value: unknown): boolean {
  return value != null && `${value}` !== 'false';
}

/** Converts a bound attribute's value to a boolean. */
export function coerceNumberAttribute(value: unknown, fallbackValue = NaN): number {
  const isNumberValue = !isNaN(Number(value));
  return isNumberValue ? Number(value) : fallbackValue;
}

/** Converts a bound attribute's value to a string and trim. */
export function coerceStringAttribute(value: unknown): string {
  return value ? String(value).trim() : '';
}
