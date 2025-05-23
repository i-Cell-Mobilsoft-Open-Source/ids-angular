import { HeroData } from '../../model/heroData';

import { Component, input } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    IdsIconComponent,
    IdsIconButtonComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  public heroData = input.required<HeroData>();
}
