import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { TranslateModule } from '@ngx-translate/core';

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

@Component({
  selector: 'app-scrollbar-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
    TranslateModule,
  ],
  templateUrl: './scrollbar-demo.component.html',
  styleUrl: './scrollbar-demo.component.scss',
})
export class ScrollbarDemoComponent {
  protected _controlConfig: DemoControlConfig<ScrollbarInputControls> = {
    'scrollbar-color': {
      description: 'Scrollbar color.',
      type: '<thumb color> <track color>',
      default: '-',
      control: 'text',
      demoDefault: 'var(--ids-smc-colors-surface-darker-30) transparent',
      disabled: true,
    },
    'scrollbar-width': {
      description: 'Scrollbar width',
      type: 'auto | thin | none',
      default: 'auto',
      control: 'select',
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
      control: 'select',
      list: [
        'auto',
        'stable',
        'stable both-edges',
      ],
    },
  };

  protected _helperControlConfig: DemoControlConfig<ScrollbarHelperControls> = {
    childFitsInParent: {
      description: 'Whether .',
      type: 'auto | thin | none',
      default: false,
      control: 'checkbox',
    },
  };

  public defaults = getDefaultFromDemoConfig<ScrollbarInputControls>(this._controlConfig);
  public helperDefaults = getDefaultFromDemoConfig<ScrollbarHelperControls>(this._helperControlConfig);

  public model: ScrollbarInputControls = { ...this.defaults };
  public helperModel: ScrollbarHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
