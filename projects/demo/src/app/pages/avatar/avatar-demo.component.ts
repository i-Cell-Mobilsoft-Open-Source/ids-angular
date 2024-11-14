import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsAvatarVariantType, IDS_AVATAR_DEFAULT_CONFIG_FACTORY, IdsAvatarComponent, IdsAvatarImageDirective, IdsAvatarVariant } from '@i-cell/ids-angular/avatar';
import {
  IdsSizeType,
  IdsSizeCollectionType,
  IdsSize,
  IdsSizeCollection,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_AVATAR_DEFAULT_CONFIG_FACTORY();

type AvatarInputControls = {
  initials: string,
  size: IdsSizeType,
  sizeCollection: IdsSizeCollectionType,
  variant: IdsAvatarVariantType,
};

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsAvatarComponent,
    IdsIconComponent,
    IdsAvatarImageDirective,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './avatar-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './avatar-demo.component.scss',
  ],
})
export class AvatarDemoComponent {
  protected _inputControlConfig: DemoControlConfig<AvatarInputControls> = {
    initials: {
      description: 'Avatar initials.',
      type: 'string',
      default: '-',
      demoDefault: 'SJ',
    },
    size: {
      description: 'Avatar size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    sizeCollection: {
      description: 'Avatar sizeCollection.',
      type: 'IdsSizeCollectionType',
      default: defaultConfig.sizeCollection,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSizeCollection),
    },
    variant: {
      description: 'Avatar variant.',
      type: 'IdsAvatarVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsAvatarVariant),
    },
  };

  public defaults = getDefaultFromDemoConfig<AvatarInputControls>(this._inputControlConfig);

  public model: AvatarInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
