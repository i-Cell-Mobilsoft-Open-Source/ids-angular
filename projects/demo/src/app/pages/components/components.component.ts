import { environment } from '../../../environments/environment.development';
import { ContentCardComponent } from '../../components/content-card/content-card.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ComponentData } from '../../model/componentData';
import { ContentCardData } from '../../model/contentCardData';
import { EntryData } from '../../model/entryData';
import { HeroData } from '../../model/heroData';
import { StatamicComponentListItem } from '../../model/statamicComponentListItemData';
import { GraphqlService } from '../../services/graphql.service';

import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  imports: [
    HeroComponent,
    RouterOutlet,
    ContentCardComponent,
    RouterModule,
  ],
})
export class ComponentsComponent implements OnInit {
  public componentDatas = signal<ComponentData[]>([]);
  public heroData = signal<HeroData>({
    title: '',
    description: '',
    imageUrl: '',
    imageUrlLight: '',
    imageUrlDark: '',
    id: 0,
    isBackButton: true,
  });

  private readonly _graphqlService = inject(GraphqlService);
  private readonly _baseUrl = environment.cmsBaseUrl.replace(/\/$/, '');

  public ngOnInit(): void {
    this._graphqlService
      .getComponentsList()
      .subscribe((result: ApolloQueryResult<{ entries: { data: StatamicComponentListItem[] }; entry?: EntryData }>) => {
        const fallbackImage = 'https://via.placeholder.com/600x400?text=No+Image';
        let components: ComponentData[] = [];

        const entry = result.data.entry;

        if (entry?.navs_field) {
          entry.navs_field[0]?.tree?.forEach((treeNode) => {
            treeNode.children?.forEach((childNode) => {
              childNode.children?.forEach((grandchild) => {
                const page = grandchild.page;
                if (page?.id) {
                  components.push({
                    id: Number(page.id) || 0,
                    title: page.title ?? '',
                    comp_description: page.comp_description ?? '',
                    description: page.comp_description ?? '',
                    slug: page.slug ?? '',
                    imageUrl:
                      (page.comp_img_light_mode?.[0]?.url ? `${environment.cmsBaseUrl}${page.comp_img_light_mode[0].url}` : '') ||
                      (page.comp_img_dark_mode?.[0]?.url ? `${environment.cmsBaseUrl}${page.comp_img_dark_mode[0].url}` : '') ||
                      fallbackImage,
                    imageLink: page.slug ? `/components/${page.slug}` : '',
                    comp_img_light_mode: page.comp_img_light_mode,
                    comp_img_dark_mode: page.comp_img_dark_mode,
                  });
                }
              });
            });
          });
        }

        if (components.length === 0) {
          const componentsList = result.data.entries.data ?? [];
          components = componentsList.map((componentItem: StatamicComponentListItem) => ({
            id: Number(componentItem.id) || 0,
            title: componentItem.title ?? '',
            comp_description: componentItem.comp_description ?? '',
            description: componentItem.comp_description ?? '',
            slug: componentItem.slug ?? '',
            imageUrl:
              (componentItem.comp_img_light_mode?.[0]?.url ? `${environment.cmsBaseUrl}${componentItem.comp_img_light_mode[0].url}` : '') ||
              (componentItem.comp_img_dark_mode?.[0]?.url ? `${environment.cmsBaseUrl}${componentItem.comp_img_dark_mode[0].url}` : '') ||
              fallbackImage,
            imageLink: componentItem.slug ? `/components/${componentItem.slug}` : '',
            comp_img_light_mode: componentItem.comp_img_light_mode,
            comp_img_dark_mode: componentItem.comp_img_dark_mode,
          }));
        }

        this.componentDatas.set(components.sort((a, b) => a.title.localeCompare(b.title)));

        if (entry) {
          const lightUrl = entry.hero_image_light?.url ? `${environment.cmsBaseUrl}${entry.hero_image_light.url}` : '';
          const darkUrl = entry.hero_image_dark?.url ? `${environment.cmsBaseUrl}${entry.hero_image_dark.url}` : '';

          this.heroData.set({
            title: entry.title ?? 'Components',
            description: entry.hero_description ?? '',
            imageUrl: lightUrl || darkUrl,
            imageUrlLight: lightUrl,
            imageUrlDark: darkUrl,
            id: 0,
            isBackButton: true,
          });
        } else if (components.length > 0) {
          this.heroData.set({
            title: 'Components',
            description: components[0].description ?? '',
            imageUrl: components[0].imageUrl || fallbackImage,
            imageUrlLight: components[0].imageUrl || fallbackImage,
            imageUrlDark: components[0].imageUrl || fallbackImage,
            id: 0,
            isBackButton: true,
          });
        } else {
          this.heroData.set({
            title: '',
            description: '',
            imageUrl: fallbackImage,
            imageUrlLight: fallbackImage,
            imageUrlDark: fallbackImage,
            id: 0,
            isBackButton: true,
          });
        }
      });
  }

  public transformToCardData(item: ComponentData): ContentCardData {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      orientation: 'vertical',
      aspectRatio: '16/9',
      appearance: 'elevated',
      variant: 'light',
      imageCaption: item.title,
      imageURL: item.imageUrl,
      imageUrlLight: item.imageUrl,
      imageUrlDark: item.comp_img_dark_mode?.[0]?.url ? environment.cmsBaseUrl + item.comp_img_dark_mode[0].url : item.imageUrl,
      buttonOneUrl: item.imageLink, //contains the link to the component page
    };
  }
}
