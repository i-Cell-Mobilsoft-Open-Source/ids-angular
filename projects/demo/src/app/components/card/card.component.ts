import { ComponentData } from '../../model/componentData';

import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdsCardComponent } from '@i-cell/ids-angular/card';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [
    IdsCardComponent,
    RouterModule,
  ],
})
export class CardComponent {
  public componentData = input.required<ComponentData>();
}
