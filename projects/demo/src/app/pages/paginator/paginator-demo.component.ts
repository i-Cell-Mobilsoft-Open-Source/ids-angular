import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsPaginatorComponent, PaginatorVariant, PaginatorVariantType } from '@i-cell/ids-angular/paginator';

@Component({
  selector: 'app-paginator-demo',
  standalone: true,
  imports: [
    IdsPaginatorComponent,
    UpperCasePipe,
  ],
  templateUrl: './paginator-demo.component.html',
  styleUrl: './paginator-demo.component.scss',
})
export class PaginatorDemoComponent {
  public sizes: SizeType[] = [
    Size.DENSE,
    Size.COMPACT,
    Size.COMFORTABLE,
    Size.SPACIOUS,
  ];

  public variants: PaginatorVariantType[] = [
    PaginatorVariant.PRIMARY,
    PaginatorVariant.SECONDARY,
    PaginatorVariant.LIGHT,
    PaginatorVariant.SURFACE,
  ];

  // eslint-disable-next-line no-magic-numbers
  public length = 120;
}
