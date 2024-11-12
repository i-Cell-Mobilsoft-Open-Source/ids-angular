export function addClassPrefix(
  hostClass: string,
  className: string | Array<string | null | undefined> | null | undefined,
): string | null {
  if (className == null) {
    return null;
  }

  if (Array.isArray(className)) {
    if (className.some((item) => item == null)) {
      return null;
    }
    return `${hostClass}-${className.filter(Boolean).join('-')}`;
  }

  return `${hostClass}-${className}`;
}

export function createClassList(
  hostClass: string,
  appendableClassNames: Array<string | Array<string | null | undefined> | null | undefined> = [],
  nonAppendableClassNames: Array<string | null> = [],
): string {
  return [
    hostClass,
    ...appendableClassNames.map((className) => addClassPrefix(hostClass, className)),
    ...nonAppendableClassNames,
  ].filter(Boolean).join(' ');
}
