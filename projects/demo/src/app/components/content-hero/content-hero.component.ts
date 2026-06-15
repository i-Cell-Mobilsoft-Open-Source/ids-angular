import { HeroData } from '../../model/heroData';

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IdsAvatarComponent } from '@i-cell/ids-angular/avatar';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsChipGroupComponent, IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsDividerComponent } from '@i-cell/ids-angular/divider';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'app-content-hero',
  imports: [
    IdsIconComponent,
    RouterLink,
    IdsButtonComponent,
    IdsChipGroupComponent,
    IdsChipComponent,
    IdsDividerComponent,
    IdsAvatarComponent,
  ],
  templateUrl: './content-hero.component.html',
  styleUrl: './content-hero.component.scss',
})
export class ContentHeroComponent {
  public heroData = input.required<HeroData>();
}
