import { IdsTabGroupComponent } from '../../../../../../widgets/tab/tab-group.component';
import { environment } from '../../../../environments/environment.development';
import { ContentCardComponent } from '../../../components/content-card/content-card.component';
import { HeroComponent } from '../../../components/hero/hero.component';
import { ComponentEntry, SetContentCard } from '../../../model/componentEntry';
import { ContentCardData } from '../../../model/contentCardData';
import { HeroData } from '../../../model/heroData';
import { GraphqlService } from '../../../services/graphql.service';

import { Component, OnInit, inject } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsTabComponent } from '@i-cell/ids-angular/tab';
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
  public heroData?: HeroData;
  public contentCardDataList: ContentCardData[] = [];

  private _graphqlService = inject(GraphqlService);

  public ngOnInit(): void {
    this._graphqlService.getComponents().subscribe((result) => {
      const typedResult = result as { data: { entries: { data: ComponentEntry[] } } };
      const components = typedResult.data.entries.data;
      if (components.length > 0) {
        const component = components[0];
        this.heroData = {
          id: Number(component.id),
          title: component.title,
          description: component.comp_description,
          imageUrl: component.comp_img_light_mode?.[0]?.url
            ? `${environment.cmsBaseUrl}${component.comp_img_light_mode[0].url}`
            : '',
        };
        const cards = component.content.filter(
          // eslint-disable-next-line id-length
          (c): c is SetContentCard => c.__typename === 'Set_Content_Card',
        );
        this.contentCardDataList = cards.map((card) => ({
          id: Number(card.id),
          orientation: card.card_properties?.card_orientation?.value ?? 'vertical',
          variant: card.card_properties?.card_variant?.value ?? 'surface',
          imageURL: card.group_image?.img_light_mode?.[0]?.url
            ? `${environment.cmsBaseUrl}${card.group_image?.img_light_mode?.[0]?.url}`
            : '',
          imageCaption: card.group_image?.img_caption,
          aspectRatio: card.group_image?.img_aspect_ratio?.value ?? '1/1',
          state: card.group_image?.state?.value,
          imageBgColorVariant: card.group_image?.img_bg_color?.value ?? 'surface',
          heading: card?.content_heading,
          overTitle: card.content?.content_over_title,
          title: card.content?.content_title,
          description: card.content?.content_description,
          buttonOne: Array.isArray(card.button?.button) ? card.button?.button[0]?.button_label : undefined,
          buttonTwo: Array.isArray(card.button?.button) ? card.button?.button[1]?.button_label : undefined,
        }));
      }
    });
  }
}
