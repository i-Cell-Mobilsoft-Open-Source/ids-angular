import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import {
  IDS_BADGE_DEFAULT_CONFIG_FACTORY,
  IdsBadgeDirective,
  IdsBadgeVariant,
  IdsBadgeVariantType,
} from '@i-cell/ids-angular/badge';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslatePipe } from '@ngx-translate/core';

type BadgeInputControls = {
  size: IdsSizeType,
  variant: IdsBadgeVariantType,
  hasLeadingIcon: boolean,
  label: string,
  limit: number | null,
};

const defaultConfig = IDS_BADGE_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [
    IdsBadgeDirective,
    IdsIconComponent,
    TryoutComponent,
    TranslatePipe,
    ControlTableComponent,
  ],
  templateUrl: './badge-demo.component.html',
  styleUrl: './badge-demo.component.scss',
})
export class BadgeDemoComponent {
  protected _inputControlConfig: DemoControlConfig<BadgeInputControls> = {
    size: {
      description: 'Badge size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      list: Object.values(IdsSize),
      control: 'select',
    },
    variant: {
      description: 'Badge variant.',
      type: 'IdsBadgeVariantType',
      default: defaultConfig.variant,
      list: Object.values(IdsBadgeVariant),
      control: 'select',
    },
    hasLeadingIcon: {
      description: 'Has leading icon.',
      type: 'boolean',
      control: 'checkbox',
      default: defaultConfig.showLeadingElement,
    },
    label: {
      description: 'Badge text.',
      type: 'string',
      default: '',
      demoDefault: '1000',
    },
    limit: {
      description: 'Badge limit.',
      type: 'number',
      default: null,
      demoDefault: 100,
    },
  };

  public defaults = getDefaultFromDemoConfig<BadgeInputControls>(this._inputControlConfig);

  public model: BadgeInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
