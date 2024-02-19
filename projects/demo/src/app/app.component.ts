import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Appearance, AppearanceType, IdsButtonComponent, Size, SizeType, Variant, VariantType } from '@i-cell/widgets/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IdsButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public appearances = Object.values(Appearance) as AppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(Variant) as VariantType[];
  public filteredVariants = Object.values(Variant).filter((variant) => !["error", "success", "warning"].includes(variant)) as VariantType[];
}
