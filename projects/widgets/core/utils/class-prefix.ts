export function addClassPrefix(
  componentClass: string,
  className: string | Array<string | null | undefined> | null | undefined,
): string | null {
  if (className == null) {
    return null;
  }

  if (Array.isArray(className)) {
    if (className.some((item) => item == null)) {
      return null;
    }
    return `${componentClass}-${className.filter(Boolean).join('-')}`;
  }

  return `${componentClass}-${className}`;
}

export function createClassList(
  componentClass: string,
  appendableClassNames: Array<string | Array<string | null | undefined> | null | undefined> = [],
  nonAppendableClassNames: Array<string | null> = []): string {
  return [
    componentClass,
    ...appendableClassNames.map((className) => addClassPrefix(componentClass, className)),
    ...nonAppendableClassNames,
  ].filter(Boolean).join(' ');
}
