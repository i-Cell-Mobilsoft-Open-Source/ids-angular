import { HeroList } from '../../model/heroList';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  @Input()
  public heroList!: HeroList;
}
