import { AbstractType, Type } from '@angular/core';

export function isTypeDerivedFrom<T1, T2>(type: Type<T1> | AbstractType<T1>, ancestorType: Type<T2> | AbstractType<T2>): boolean {
  if (!type || !ancestorType) {
    return false;
  }

  const superType = Object.getPrototypeOf(type);

  return superType === ancestorType || isTypeDerivedFrom(superType, ancestorType);
}
