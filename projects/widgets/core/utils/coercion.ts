/** Converts a bound attribute's value to a boolean. */
export function coerceBooleanAttribute(value: any): boolean {
  return value != null && `${value}` !== 'false';
}
