import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { IconService } from '../../core/services/icon.service';

import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconVariant, IdsIconVariantType, IDS_ICON_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/icon';
import { IdsIconComponent } from '@i-cell/ids-angular/icon/icon.component';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_ICON_DEFAULT_CONFIG_FACTORY();

type IconInputControls = {
  size: IdsSizeType,
  sizeCollection: IdsSizeCollectionType,
  variant: IdsIconVariantType,
  fontIcon: string
  svgIcon: string,
  'aria-hidden': boolean,
};

@Component({
  standalone: true,
  selector: 'app-icon-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './icon-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './icon-demo.component.scss',
  ],
})
export class IconDemoComponent implements OnInit {
  private readonly _iconService = inject(IconService);
  private readonly _destroyRef = inject(DestroyRef);

  protected _inputControlConfig: DemoControlConfig<IconInputControls> = {
    size: {
      description: 'Icon size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    sizeCollection: {
      description: 'Icon size collection.',
      type: 'IdsSizeCollectionType',
      default: defaultConfig.sizeCollection,
      control: 'select',
      list: convertEnumToStringArray(IdsSizeCollection),
    },
    variant: {
      description: 'Icon variant.',
      type: 'IdsIconVariantType',
      default: defaultConfig.variant,
      control: 'select',
      list: convertEnumToStringArray(IdsIconVariant),
    },
    fontIcon: {
      description: 'Name of font icon.',
      type: 'string',
      default: '-',
      demoDefault: 'moon',
      control: 'select',
      list: [],
    },
    svgIcon: {
      description: 'Name of svg icon file',
      type: 'IdsIconVariantType',
      default: '-',
      demoDefault: 'moon',
      control: 'select',
      list: [],
    },
    'aria-hidden': {
      description: 'Determinate whether the component is hidden or not for screen readers.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };

  public ngOnInit(): void {
    this._loadIcons();
  }

  private _loadIcons(): void {
    this._iconService.loadIcons().pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((list: string[]) => {
      this._inputControlConfig = {
        ...this._inputControlConfig,
        fontIcon: { ...this._inputControlConfig.fontIcon, list },
        svgIcon: { ...this._inputControlConfig.svgIcon, list },
      };
    });
  }

  public defaults = getDefaultFromDemoConfig<IconInputControls>(this._inputControlConfig);

  public model: IconInputControls = { ...this.defaults  };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
