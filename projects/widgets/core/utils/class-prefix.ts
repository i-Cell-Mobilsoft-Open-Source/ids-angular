export function addClassPrefix(componentClass: string, className: string | null): string | null {
  return className ? `${componentClass}-${className}` : null;
}

export function createClassList(
  componentClass: string,
  appendableClassNames: Array<string | null> = [],
  nonAppendableClassNames: Array<string | null> = []): string {
  return [
    componentClass,
    ...appendableClassNames.map((className) => addClassPrefix(componentClass, className)),
    ...nonAppendableClassNames,
  ].filter(Boolean).join(' ');
}
