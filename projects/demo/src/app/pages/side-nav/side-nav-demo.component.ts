import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { IconService } from '../../core/services/icon.service';

import { Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core/types/size.type';
import { IdsSideNavComponent } from '@i-cell/ids-angular/side-nav';
import { MenuConfig } from '@i-cell/ids-angular/side-nav/menu.interface';
import { IdsSideNavAppearance, IdsSideNavAppearanceType } from '@i-cell/ids-angular/side-nav/types/side-nav-appearance.type';
import { TranslateModule } from '@ngx-translate/core';

export const idsSideNavVariant = {
  SURFACE: 'surface',
  LIGHT: 'light',
} as const;

type IdsSideNavVariantType = (typeof idsSideNavVariant)[keyof typeof idsSideNavVariant];

type SideNavControls = {
  appearance: IdsSideNavAppearanceType;
  size: IdsSizeType;
  disabled: boolean;
  variant: IdsSideNavVariantType;
  label: string;
  leadingIcon?: string;
  trailingIcon?: string;
};

@Component({
  selector: 'app-side-nav-demo',
  imports: [
    IdsSideNavComponent,
    TryoutComponent,
    ControlTableComponent,
    TranslateModule,
  ],
  templateUrl: './side-nav-demo.component.html',
  styleUrl: './side-nav-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SideNavDemoComponent implements OnInit {
  private readonly _iconService = inject(IconService);
  private readonly _destroyRef = inject(DestroyRef);

  protected _inputControlConfig: DemoControlConfig<SideNavControls> = {
    appearance: {
      description: 'Set different appearances of the component.',
      type: 'IdsSideNavAppearanceType',
      default: 'standard', // TODO: defaultConfig.appearance?,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSideNavAppearance),
    },
    variant: {
      description: 'Set the color of the component.',
      type: 'IdsSideNavVariantType',
      default: 'surface', // TODO: defaultConfig.variant?,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(idsSideNavVariant),
    },
    disabled: {
      description: 'Sets the component as disabled.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    label: {
      description: 'Text of the label.',
      type: 'string',
      default: '-',
      demoDefault: '-',
    },
    size: {
      description: 'Set the size of the component.',
      type: 'IdsSizeType',
      default: 'compact', // TODO: defaultConfig.size?,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
  };

  public defaults = getDefaultFromDemoConfig<SideNavControls>(this._inputControlConfig);

  public model: SideNavControls = { ...this.defaults };

  public menuConfig: MenuConfig = {
    sections: [
      {
        title: {
          name: 'SIDE_NAV.SECTION.WITHOUT_ITEMS',
          type: 'TITLE',
        },
        items: [],
      },
      {
        title: {
          name: 'SIDE_NAV.SECTION.WITH_LEADING_ICON',
          type: 'TITLE',
          leadingIcon: 'sun',
        },
        items: [],
      },
      {
        title: {
          name: 'SIDE_NAV.SECTION.WITH_TRAILING_ICON',
          type: 'TITLE',
          trailingIcon: 'sun',
        },
        items: [],
      },
      {
        title: {
          name: 'SIDE_NAV.SECTION.WITH_LEADING_AND_TRAILING_ICON',
          type: 'TITLE',
          leadingIcon: 'sun',
          trailingIcon: 'sun',
        },
        items: [],
      },
      {
        title: {
          name: 'SIDE_NAV.SECTION.WITH_ITEMS',
          type: 'TITLE',
        },
        items: [
          { name: 'SIDE_NAV.ITEM.WITH_LEADING_ICON', type: 'ITEM', leadingIcon: 'sun', id: '1',
            items: [
              { name: 'SIDE_NAV.SUB_ITEM.WITHOUT_ICONS', type: 'ITEM' },
              { name: 'SIDE_NAV.SUB_ITEM.WITHOUT_ICONS', type: 'ITEM' },
            ],
          },
        ],
      },
      {
        title: {
          name: 'SIDE_NAV.SECTION.WITH_ITEMS',
          type: 'TITLE',
        },
        items: [
          { name: 'SIDE_NAV.ITEM.WITH_LEADING_ICON', type: 'ITEM', leadingIcon: 'sun', id: '1', isActive: true,
            items: [
              { name: 'Child 1', type: 'ITEM' },
              { name: 'Child 2', type: 'ITEM', items: [
                { name: 'GrandChild 1', type: 'ITEM' },
                { name: 'GrandChild 2', type: 'ITEM' },
              ] },
            ],
          },
        ],
      },
    ],
  };

  // TODO: remove after new menuConfig is implemented
  // public menuConfigs: MenuItem[] = [
  // {
  //   name: 'SIDE_NAV.SECTION.WITH_ITEMS',
  //   items: [
  //     { name: 'SIDE_NAV.ITEM.WITHOUT_ICONS', isActive: true },
  //     { name: 'SIDE_NAV.ITEM.WITH_LEADING_ICON', leadingIcon: 'sun' },
  //     { name: 'SIDE_NAV.ITEM.WITH_TRAILING_ICON', trailingIcon: 'sun' },
  //     { name: 'SIDE_NAV.ITEM.WITH_LEADING_AND_TRAILING_ICON', leadingIcon: 'sun', trailingIcon: 'sun' },
  //     {
  //       name: 'SIDE_NAV.BUTTON_ITEM.WITH_SUB_ITEMS_AND_WITHOUT_ICONS',
  //       items: [
  //         { name: 'SIDE_NAV.SUB_ITEM.WITHOUT_ICONS', path: '/example-path/1' },
  //         { name: 'SIDE_NAV.SUB_ITEM.WITHOUT_ICONS', path: '/example-path/2' },
  //       ],
  //     },
  //     {
  //       name: 'SIDE_NAV.BUTTON_ITEM.WITH_SUB_ITEMS_AND_WITH_LEADING_ICON',
  //       leadingIcon: 'sun',
  //       items: [
  //         { name: 'SIDE_NAV.SUB_ITEM.WITHOUT_ICONS', path: '/example-path/3' },
  //         { name: 'SIDE_NAV.SUB_ITEM.WITHOUT_ICONS', path: '/example-path/4' },
  //       ],
  //     },
  //     {
  //       name: 'SIDE_NAV.ITEM.WITH_SUB_ITEMS_AND_WITHOUT_ICONS',
  //       path: '/example-path/11',
  //       items: [
  //         { name: 'SIDE_NAV.SUB_ITEM.WITHOUT_ICONS', path: '/example-path/5' },
  //         { name: 'SIDE_NAV.SUB_ITEM.WITH_LEADING_ICON', path: '/example-path/6', leadingIcon: 'sun' },
  //         { name: 'SIDE_NAV.SUB_ITEM.WITH_TRAILING_ICON', path: '/example-path/7', trailingIcon: 'sun' },
  //         { name: 'SIDE_NAV.SUB_ITEM.WITH_LEADING_AND_TRAILING_ICON', path: '/example-path/8', leadingIcon: 'sun', trailingIcon: 'sun' },
  //       ],
  //     },
  //     {
  //       name: 'SIDE_NAV.ITEM.WITH_SUB_ITEMS_AND_WITH_LEADING_ICON',
  //       leadingIcon: 'sun',
  //       path: '/example-path/12',
  //       items: [
  //         { name: 'SIDE_NAV.SUB_ITEM.WITHOUT_ICONS', path: '/example-path/9' },
  //         { name: 'SIDE_NAV.SUB_ITEM.WITHOUT_ICONS', path: '/example-path/10' },
  //       ],
  //     },
  //   ],
  // },
  // ];

  public ngOnInit(): void {
    this._loadIcons();
  }

  public reset(): void {
    this.model = { ...this.defaults };
  }

  private _loadIcons(): void {
    this._iconService
      .loadIcons()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._inputControlConfig = {
          ...this._inputControlConfig,
        };
      });
  }
}
