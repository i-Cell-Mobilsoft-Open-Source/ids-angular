export function addClassPrefix(componentClass: string, className: string | null): string | null {
  return className ? `${componentClass}-${className}` : null;
}

export function hostClassGenerator(componentClass: string, classNames: Array<string | null>, disabled?: boolean): string {
  return [
    componentClass,
    ...classNames.map((className) => addClassPrefix(componentClass, className)),
    ...[(disabled === true) ? [addClassPrefix(componentClass, 'disabled')] : []],
  ].filter(Boolean).join(' ');
}
