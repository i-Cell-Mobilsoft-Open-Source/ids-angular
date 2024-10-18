import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconVariant, IdsIconVariantType, IDS_ICON_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/icon';
import { IdsIconComponent } from '@i-cell/ids-angular/icon/icon.component';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_ICON_DEFAULT_CONFIG_FACTORY();

interface IconData {
  name: string;
}

type IconInputs = {
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
    UpperCasePipe,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './icon-demo.component.html',
  styleUrl: './icon-demo.component.scss',
})
export class IconDemoComponent implements OnInit {
  private _http = inject(HttpClient);

  private _iconNames = signal<string[]>([]);

  protected readonly _destroyRef = inject(DestroyRef);

  protected _inputControlConfig: DemoControlConfig<IconInputs> = {
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
      list: this._iconNames(),
    },
    svgIcon: {
      description: 'Name of svg icon file',
      type: 'IdsIconVariantType',
      default: '-',
      demoDefault: 'moon',
      control: 'select',
      list: this._iconNames(),
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
    this._http.get<IconData[]>('assets/fonts/I-DS-font-icon-default.json').pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((data) => {
      this._iconNames.set(data.map((item) => item.name));
    });
  }

  public defaults = getDefaultFromDemoConfig<IconInputs>(this._inputControlConfig);

  public model: IconInputs = { ...this.defaults  };
  
  public reset(): void {
    this.model = { ...this.defaults };
  }
}
