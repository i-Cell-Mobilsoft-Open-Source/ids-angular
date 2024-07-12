export function addClassPrefix(componentClass: string, className: string | null): string | null {
  return className ? `${componentClass}-${className}` : null;
}

export function createHostClassList(componentClass: string, classNames: Array<string | null> = []): string {
  return [
    componentClass,
    ...classNames.map((className) => addClassPrefix(componentClass, className)),
  ].filter(Boolean).join(' ');
}
