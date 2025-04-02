import { IdsTabGroupComponent } from '../../../../../../widgets/tab/tab-group.component';
import { HERO_DATA } from '../../../../utils/componentHeroListData';
import { CONTENTCARD_DATA } from '../../../../utils/contentCardListData';
import { ContentCardComponent } from '../../../components/content-card/content-card.component';
import { HeroComponent } from '../../../components/hero/hero.component';
import { GraphqlService } from '../../../services/graphql.service';

import { Component, OnInit } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsTabComponent } from '@i-cell/ids-angular/tab';

interface Collection {
  title: string;
}

interface GraphQLResponse {
  data: {
    collections: Collection[];
  };
}

@Component({
  selector: 'app-component-details',
  standalone: true,
  imports: [
    HeroComponent,
    ContentCardComponent,
    IdsTabComponent,
    IdsTabGroupComponent,
    IdsChipComponent,
    IdsButtonComponent,
  ],
  templateUrl: './component-details.component.html',
  styleUrl: './component-details.component.scss',
})
export class ComponentDetailsComponent implements OnInit {
  public heroDatas = HERO_DATA;
  public contentCardDatas = CONTENTCARD_DATA;
  public collections: Collection[] = [];

  // eslint-disable-next-line @typescript-eslint/naming-convention
  constructor(private graphqlService: GraphqlService) {}

  public ngOnInit(): void {
    this.graphqlService.getCollections().subscribe({
      next: (response) => {
        const typedResponse = response as GraphQLResponse;
        if (typedResponse?.data?.collections) {
          this.collections = typedResponse.data.collections;
        }
      },
      error: () => {},
    });
  }
}
