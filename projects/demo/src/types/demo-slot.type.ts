import { Signal } from '@angular/core';

export type DemoSlotConfigItem = {
  name: string;
  selector?: string;
  description: string | Signal<string>;
};

export type DemoSlotConfig = DemoSlotConfigItem[];
