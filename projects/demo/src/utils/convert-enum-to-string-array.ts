export function convertEnumToStringArray(obj: Record<string, string>): string[] {
  return Object.values<string>(obj);
}
