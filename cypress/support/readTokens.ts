const valueRefRegExp = /^\{([\w.-]+(?:\.[\w.-]+)+)\}$/;
const CSS_MAX_DECIMAL_PRECISION = 4;

function isValueRef(value: unknown): boolean {
  return typeof value === "string" && valueRefRegExp.test(value);
}

function getValueRefPath(value: string): string[] {
  return valueRefRegExp.exec(value)[1].split(".");
}

function setPropValue(obj: any, propPath: string[], value: any): void {
  const [propName, ...restPath] = propPath;

  if (restPath.length > 0) {
    setPropValue(obj[propName] = obj[propName] || {}, restPath, value);
  } else {
    obj[propName] = value;
  }

  return obj;
}

function getPropValue(obj: any, propPath: string[]): any {
  return propPath.reduce((acc, propName) => (acc?.[propName]), obj);
}

function resolveValueRef(rawTokens: any, accumulator: object, valueRef: string): any {
  const propPath = getValueRefPath(valueRef);

  // Trying to get already resolved value from the accumulator object
  const cachedValue = getPropValue(accumulator, propPath);

  if (cachedValue != null) {
    return cachedValue;
  }

  // No resolved value in the accumulator, look for it in the raw token def object
  const rawValue = getPropValue(rawTokens, propPath)?.value;

  if (isValueRef(rawValue)) {
    return resolveValueRef(rawTokens, accumulator, rawValue);
  }

  return rawValue;
}

function hasModeExtensions(obj: any): boolean {
  const modes = obj.$extensions.mode;
  return (
    modes != null && typeof modes === 'object' && Object.keys(modes).length > 0
  );
}

function _readTokens(obj: any, rawTokens: any, propPath: string[] = [], accumulator: object = {}): object {
  if (!obj.hasOwnProperty('value')) {
    // obj is not a token definition object, continue parsing the object's props
    for (const key in obj) {
      const value = obj[key];

      if (typeof value === 'object' && value !== null) {
        _readTokens(value, rawTokens, [...propPath, key], accumulator);
      }
    }
  } else if (!isValueRef(obj.value)) {
    // The value is not a token reference, set plain value
    setPropValue(accumulator, propPath, obj.value);
  }
  else if (hasModeExtensions(obj)) {
    // The token definition has a mode extension sub-object, which is also added to the accumulator
    const modeExtensions = obj.$extensions.mode;
    Object.keys(modeExtensions).forEach((modeKey: string) => {
      const tokenModeValue = resolveValueRef(rawTokens, accumulator, modeExtensions[modeKey]);
      setPropValue(accumulator, [...propPath, modeKey], tokenModeValue);
    });
  } else {
    // A token definition with a value reference, the referred value is added to the accumulator
    // (reference chains are resolved to the final plain value)
    setPropValue(accumulator, propPath, resolveValueRef(rawTokens, accumulator, obj.value));
  }

  return accumulator;
}

function roundDecimals(value: string, decimal: number): number {
  return +parseFloat(value).toFixed(decimal);
}

function fixUnit(obj: any, correctUnit: string): void {
  Object.keys(obj).forEach((propName) => {
    const tokenObj = obj[propName];
    const normalizedTokenValue = roundDecimals(tokenObj.value, CSS_MAX_DECIMAL_PRECISION);
    tokenObj.value = `${normalizedTokenValue}${correctUnit}`
  });
}

export function readTokens(obj: any): object {
  fixUnit(obj.base.percentage, "%");
  fixUnit(obj.base.typography.weight, "");
  return _readTokens(obj, obj);
}
