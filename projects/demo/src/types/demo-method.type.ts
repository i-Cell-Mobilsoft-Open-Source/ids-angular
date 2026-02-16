export type DemoMethodConfig<T> = {
  [K in keyof T]:{
    name: string;
    description: string;
    parameters?: string[];
    parameterTypes?: string[];
    parameterDescriptions?: string[];
    returnType: string;
  };
};
