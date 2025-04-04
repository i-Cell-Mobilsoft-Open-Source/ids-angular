import { ComponentData } from '../../model/componentData';

import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdsCardComponent } from '@i-cell/ids-angular/card';

@Component({
  selector: 'app-article-card',
  standalone: true,
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
  imports: [
    IdsCardComponent,
    RouterModule,
  ],
})
export class ArticleCardComponent {
  public componentData = input.required<ComponentData>();
}
