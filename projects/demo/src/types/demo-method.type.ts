export type DemoMethodConfigItem = {
  name: string;
  description: string;
  parameters?: string[];
  parameterTypes?: string[];
  parameterDescriptions?: string[];
  returnType: string;
};

export type DemoMethodConfig = DemoMethodConfigItem[];
