import { ComponentList } from '../../model/componentList';

import { Component, Input } from '@angular/core';
import { IdsCardComponent } from '@i-cell/ids-angular/card';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [IdsCardComponent],
})
export class CardComponent {
  @Input()
  public componentList!: ComponentList;
}
