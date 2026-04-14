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
import { ObservableQuery } from '@apollo/client/core';
import { IdsSpinnerComponent } from '@i-cell/ids-angular/spinner';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  imports: [
    HeroComponent,
    RouterOutlet,
    ContentCardComponent,
    RouterModule,
    IdsSpinnerComponent,
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

  public isLoading = signal<boolean>(true);

  private readonly _graphqlService = inject(GraphqlService);
  private readonly _baseUrl = environment.cmsBaseUrl.replace(/\/$/, '');

  public ngOnInit(): void {
    this.isLoading.set(true);

    this._graphqlService
      .getComponentsList()
      .pipe(tap(() => this.isLoading.set(true)),
        filter((result) => !result.loading))
      .subscribe((result: ObservableQuery.Result<{ entries: { data: Partial<StatamicComponentListItem>[] }; entry?: EntryData }>) => {
        const fallbackImage = 'https://via.placeholder.com/600x400?text=No+Image';
        let components: ComponentData[] = [];

        const entry = result.data?.entry;

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
                    comp_img_light_mode: page.comp_img_light_mode as { url: string }[] | undefined,
                    comp_img_dark_mode: page.comp_img_dark_mode as { url: string }[] | undefined,
                  });
                }
              });
            });
          });
        }

        if (components.length === 0) {
          const componentsList = result.data?.entries?.data ?? [];
          components = componentsList.map((componentItem: Partial<StatamicComponentListItem>) => ({
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
            comp_img_light_mode: componentItem.comp_img_light_mode as { url: string }[] | undefined,
            comp_img_dark_mode: componentItem.comp_img_dark_mode as { url: string }[] | undefined,
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
        this.isLoading.set(false);

      });
  }

  public transformToCardData(item: ComponentData): ContentCardData {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      card: {
        orientation: 'vertical',
        appearance: 'elevated',
        variant: 'light',
        transparent: false,
      },
      image: {
        aspectRatio: '16/9',
        imageUrl: item.imageUrl,
        lightUrl: item.imageUrl,
        darkUrl: item.comp_img_dark_mode?.[0]?.url ? `${environment.cmsBaseUrl}${item.comp_img_dark_mode[0].url}` : item.imageUrl,
        caption: item.title,
        bgColorVariant: 'surface',
        bgTransparent: false,
        filledInContainer: false,
        state: 'no_state',
      },
      button: [
        {
          text: 'Learn More',
          url: item.imageLink ?? '',
        },
      ],
    };
  }
}
