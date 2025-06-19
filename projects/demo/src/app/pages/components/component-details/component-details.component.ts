import { IdsTabGroupComponent } from '../../../../../../widgets/tab/tab-group.component';
import { environment } from '../../../../environments/environment.development';
import { ContentCardComponent } from '../../../components/content-card/content-card.component';
import { HeroComponent } from '../../../components/hero/hero.component';
import { ComponentEntry } from '../../../model/componentEntry';
import { ContentCardData } from '../../../model/contentCardData';
import { HeroData } from '../../../model/heroData';
import { GraphqlService } from '../../../services/graphql.service';

import { Component, OnInit, inject, signal } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { IdsTabComponent } from '@i-cell/ids-angular/tab';

type ComponentBlock =
  | { type: 'heading'; heading: string }
  | (ContentCardData & { type: 'card' });

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
    IdsCardComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
  ],
  templateUrl: './component-details.component.html',
  styleUrl: './component-details.component.scss',
})
export class ComponentDetailsComponent implements OnInit {
  public heroData?: HeroData;
  public componentBlocks: ComponentBlock[] = [];

  private _graphqlService = inject(GraphqlService);

  public ngOnInit(): void {
    this._graphqlService.getComponents().subscribe((result) => {
      const typedResult = result as { data: { entries: { data: ComponentEntry[] } } };
      const components = typedResult.data.entries.data;

      if (components.length === 0) {
        return;
      }

      const component = components[0];

      this.heroData = {
        id: Number(component.id),
        title: component.title,
        isBackButton: true,
        description: component.comp_description,
        imageUrl: component.comp_img_light_mode?.[0]?.url
          ? `${environment.cmsBaseUrl}${component.comp_img_light_mode[0].url}`
          : '',
        imageUrlLight: component.comp_img_light_mode?.[0]?.url
          ? `${environment.cmsBaseUrl}${component.comp_img_light_mode[0].url}`
          : '',
        imageUrlDark: component.comp_img_dark_mode?.[0]?.url
          ? `${environment.cmsBaseUrl}${component.comp_img_dark_mode[0].url}`
          : '',
      };

      const blocks: ComponentBlock[] = [];

      for (const block of component.content) {
        if (block.__typename === 'Set_Content_Heading') {
          blocks.push({
            type: 'heading',
            heading: block.heading,
          });
        }

        if (block.__typename === 'Set_Content_Card') {
          blocks.push({
            type: 'card',
            id: Number(block.id),
            orientation: block.card_properties?.card_orientation?.value ?? 'vertical',
            variant: block.card_properties?.card_variant?.value ?? 'surface',
            transparent: block.card_properties?.card_bg_transparent ?? false,
            state: block.group_image?.state?.value,
            imageURL: block.group_image?.img_light_mode?.[0]?.url
              ? `${environment.cmsBaseUrl}${block.group_image.img_light_mode[0].url}`
              : '',
            imageUrlLight: block.group_image?.img_light_mode?.[0]?.url
              ? `${environment.cmsBaseUrl}${block.group_image.img_light_mode[0].url}`
              : '',
            imageUrlDark: block.group_image?.img_dark_mode?.[0]?.url
              ? `${environment.cmsBaseUrl}${block.group_image.img_dark_mode[0].url}`
              : '',
            imageCaption: block.group_image?.img_caption,
            imageBgColorVariant: block.group_image?.img_bg_color?.value ?? 'surface',
            imageBGTransparent: block.group_image?.bg_transparent ?? false,
            overTitle: block.content?.content_over_title,
            title: block.content?.content_title,
            description: block.content?.content_description,
            buttonOne: Array.isArray(block.button?.button) ? block.button?.button[0]?.button_label : undefined,
            buttonOneUrl: Array.isArray(block.button?.button) ? block.button?.button[0]?.button_url : block.button?.button?.button_url,
            buttonTwo: Array.isArray(block.button?.button) ? block.button?.button[1]?.button_label : undefined,
            buttonTwoUrl: Array.isArray(block.button?.button) ? block.button?.button[1]?.button_url : block.button?.button?.button_url,
          });
        }
      }

      this.componentBlocks = blocks;
    });
  }

  public trackByBlock(index: number, item: ComponentBlock): string | number {
    if (item.type === 'card') {
      return item.id ?? index;
    }
    if (item.type === 'heading') {
      return item.heading ?? index;
    }
    return index;
  }

  public trackByCardOrHeading(index: number, item: ComponentBlock): string | number {
    return item.type === 'card' ? item.id ?? `card-${index}` : `heading-${index}`;
  }

  public isOpen = signal(false);
  public isDark = signal(false);

  public toggleFooter(): void {
    this.isOpen.update((open) => !open);
  }

  public toggleDark(): void {
    this.isDark.update((dark) => !dark);
  }
}
