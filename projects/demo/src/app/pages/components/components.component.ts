import { environment } from '../../../environments/environment.development';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ComponentData } from '../../model/componentData';
import { EntryData } from '../../model/entryData';
import { HeroData } from '../../model/heroData';
import { StatamicComponentListItem } from '../../model/statamicComponentListItemData';
import { GraphqlService } from '../../services/graphql.service';

import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';

@Component({
  standalone: true,
  selector: 'app-components',
  templateUrl: './components.component.html',
  imports: [
    HeroComponent,
    ArticleCardComponent,
    RouterOutlet,
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

  public ngOnInit(): void {
    this._graphqlService
      .getComponentsList()
      .subscribe((result: ApolloQueryResult<{ entries: { data: StatamicComponentListItem[] }; entry?: EntryData }>) => {
        const baseUrl = environment.cmsBaseUrl.replace(/\/$/, '');
        const fallbackImage = 'https://via.placeholder.com/600x400?text=No+Image';

        const buildCmsUrl = (path?: string): string => {
          if (!path) {
            return '';
          }
          const fixedPath = path.startsWith('/') ? path : `/${path}`;
          return `${baseUrl}${fixedPath}`.replace(/([^:]\/)\/+/g, '$1');
        };

        const entry = result.data.entry;
        let components: ComponentData[] = [];

        // Extract from nested navs_field tree if available
        if (entry?.navs_field) {
          entry.navs_field[0]?.tree?.forEach((treeNode) => {
            treeNode.children?.forEach((childNode) => {
              childNode.children?.forEach((grandchild) => {
                const page = grandchild.page;
                if (page?.id) {
                  // Map Statamic fields to ComponentData
                  components.push({
                    id: Number(page.id) || 0,
                    title: page.title ?? '',
                    comp_description: page.comp_description ?? '', // Statamic field
                    description: page.comp_description ?? '', // For display
                    slug: page.slug ?? '',
                    imageUrl:
                      buildCmsUrl(page.comp_img_light_mode?.[0]?.url) || buildCmsUrl(page.comp_img_dark_mode?.[0]?.url) || fallbackImage,
                    imageLink: page.slug ? `/components/${page.slug}` : '',
                    comp_img_light_mode: page.comp_img_light_mode,
                    comp_img_dark_mode: page.comp_img_dark_mode,
                  });
                }
              });
            });
          });
        }

        // Fallback to flat list if nested not available
        if (components.length === 0) {
          const componentsList = result.data.entries.data ?? [];
          components = componentsList.map((componentItem: StatamicComponentListItem) => ({
            id: Number(componentItem.id) || 0,
            title: componentItem.title ?? '',
            comp_description: componentItem.comp_description ?? '', // Statamic field
            description: componentItem.comp_description ?? '', // For display
            slug: componentItem.slug ?? '',
            imageUrl:
              buildCmsUrl(componentItem.comp_img_light_mode?.[0]?.url) ||
              buildCmsUrl(componentItem.comp_img_dark_mode?.[0]?.url) ||
              fallbackImage,
            imageLink: componentItem.slug ? `/components/${componentItem.slug}` : '',
            comp_img_light_mode: componentItem.comp_img_light_mode,
            comp_img_dark_mode: componentItem.comp_img_dark_mode,
          }));
        }

        this.componentDatas.set(components.sort((a, b) => a.title.localeCompare(b.title)));

        // Set heroData signal based on entry or fallback.
        if (entry) {
          const lightUrl = entry.hero_image_light?.url ? buildCmsUrl(entry.hero_image_light.url) : '';
          const darkUrl = entry.hero_image_dark?.url ? buildCmsUrl(entry.hero_image_dark.url) : '';

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
}
