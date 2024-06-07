/** Converts a bound attribute's value to a boolean. */
export function coerceBooleanAttribute(value: unknown): boolean {
  return value != null && `${value}` !== 'false';
}
