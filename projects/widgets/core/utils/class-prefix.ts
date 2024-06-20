export function addClassPrefix(componentClass: string, className: string | null): string | null {
  return className ? `${componentClass}-${className}` : null;
}
