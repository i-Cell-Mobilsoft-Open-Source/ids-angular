import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';

type ScrollbarWidthType = 'auto' | 'thin' | 'none';
type ScrollbarGutterType = 'auto' | 'stable' | 'stable both-edges';

type ScrollbarInputControls = {
  'scrollbar-color': string
  'scrollbar-width': ScrollbarWidthType
  'scrollbar-gutter': ScrollbarGutterType
};

type ScrollbarHelperControls = {
  'childFitsInParent': boolean
};
@Injectable()
export class ScrollbarDemoService {
  public readonly controlConfig: DemoControlConfig<ScrollbarInputControls> = {
    'scrollbar-color': {
      description: 'Scrollbar color.',
      type: '<thumb color> <track color>',
      default: '-',
      control: DemoControl.TEXT,
      demoDefault: 'var(--ids-smc-colors-surface-darker-30) transparent',
      disabled: true,
    },
    'scrollbar-width': {
      description: 'Scrollbar width',
      type: 'auto | thin | none',
      default: 'auto',
      control: DemoControl.SELECT,
      list: [
        'auto',
        'thin',
        'none',
      ],
    },
    'scrollbar-gutter': {
      description: 'Scrollbar gutter',
      type: 'auto | stable | stable both-edges',
      default: 'auto',
      control: DemoControl.SELECT,
      list: [
        'auto',
        'stable',
        'stable both-edges',
      ],
    },
  };

  public readonly helperControlConfig: DemoControlConfig<ScrollbarHelperControls> = {
    childFitsInParent: {
      description: 'Whether the content fits in scrollable div or not. This is for testing scrollbar gutter.',
      type: 'auto | thin | none',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public defaults = getDefaultFromDemoConfig<ScrollbarInputControls>(this.controlConfig);
  public helperDefaults = getDefaultFromDemoConfig<ScrollbarHelperControls>(this.helperControlConfig);

  public model: ScrollbarInputControls = { ...this.defaults };
  public helperModel: ScrollbarHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [
      this.controlConfig,
      this.helperControlConfig,
    ];
  }
}
