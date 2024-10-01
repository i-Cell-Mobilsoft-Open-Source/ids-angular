import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IDS_PAGINATOR_DEFAULT_OPTIONS_FACTORY, IdsPaginatorComponent, PaginatorPageButtonAppearance, PaginatorPageButtonAppearanceType, PaginatorVariant, PaginatorVariantType } from '@i-cell/ids-angular/paginator';
import { TranslateModule } from '@ngx-translate/core';

type PaginatorPublicApi = {
  pageSize: number
  pageSizeOptions: number[]
  showFirstLastButton: boolean
  showPrevNextLabel: boolean
  showPageInfo: boolean
  showPageButtons: boolean
  showAllPages: boolean
  maxDisplayedItemCount: number
  size: SizeType
  variant: PaginatorVariantType
  pageButtonAppearance: PaginatorPageButtonAppearanceType
  debounceTime: number
};

const defaultConfig = IDS_PAGINATOR_DEFAULT_OPTIONS_FACTORY();

@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  imports: [
    IdsPaginatorComponent,
    UpperCasePipe,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './paginator-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './paginator-demo.component.scss',
  ],
})
export class PaginatorDemoComponent {
  public defaults: PaginatorPublicApi = {
    pageSize: defaultConfig.pageSize,
    pageSizeOptions: defaultConfig.pageSizeOptions,
    showFirstLastButton: defaultConfig.showFirstLastButton,
    showPrevNextLabel: defaultConfig.showPrevNextLabel,
    showPageInfo: defaultConfig.showPageInfo,
    showPageButtons: defaultConfig.showPageButtons,
    showAllPages: defaultConfig.showAllPages,
    maxDisplayedItemCount: defaultConfig.maxDisplayedItemCount,
    size: defaultConfig.size,
    variant: defaultConfig.variant,
    pageButtonAppearance: defaultConfig.pageButtonAppearance,
    debounceTime: defaultConfig.debounceTime,
  };

  public model: PaginatorPublicApi = { ...this.defaults  };

  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(PaginatorVariant) as PaginatorVariantType[];
  public pageButtonAppearances = Object.values(PaginatorPageButtonAppearance) as PaginatorPageButtonAppearanceType[];

  // eslint-disable-next-line no-magic-numbers
  public length = 120;

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
