export function isNumber(value: unknown): value is number {
  return typeof value === 'number' || value instanceof Number;
}

export function isNumberEven(val: number): boolean {
  return val % 2 === 0;
}

export function isNumberOdd(val: number): boolean {
  return val % 2 === 1;
}

export function positiveModulus(num: number, divisor: number): number {
  return ((num % divisor) + divisor) % divisor;
}
