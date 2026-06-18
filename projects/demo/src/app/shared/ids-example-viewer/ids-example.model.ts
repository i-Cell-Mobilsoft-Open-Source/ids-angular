import { Type } from '@angular/core';

export interface IdsExampleFile {
  HTMLpath: string;
  TSpath: string;
}

export interface IdsExampleDef {
  id: string;
  title: string;
  description?: string;
  component: Type<unknown>;
  files: IdsExampleFile[];
}
