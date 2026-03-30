import { ContentCardComponent } from '../../components/content-card/content-card.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ContentCardData } from '../../model/contentCardData';
import { ContentData } from '../../model/contentData';
import { EntryListData } from '../../model/entryListData';
import { HeroData } from '../../model/heroData';
import { GraphqlService } from '../../services/graphql.service';

import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { IdsChipGroupComponent, IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsPaginatorComponent } from '@i-cell/ids-angular/paginator';
import { environment } from 'projects/demo/src/environments/environment.development';

const PAGE_SIZE = 6;

@Component({
  selector: 'app-list-page',
  imports: [
    HeroComponent,
    ContentCardComponent,
    RouterModule,
    IdsChipGroupComponent,
    IdsChipComponent,
    IdsIconComponent,
    IdsPaginatorComponent,
    RouterOutlet,
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent implements OnInit {
  public contentDatas = signal<ContentData[]>([]);
  public heroData = signal<HeroData>({
    title: '',
    description: '',
    imageUrl: '',
    imageUrlLight: '',
    imageUrlDark: '',
    id: 0,
    isBackButton: true,
  });

  public pageSize = signal<number>(PAGE_SIZE);
  public pageIndex = signal<number>(0);

  public activeFilter = signal<string>('All');

  // Compute the list of available tags from the content data
  public availableTags = computed(() => {
    const allTags = new Set<string>();
    this.contentDatas().forEach((item) => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((tag) => {
          const tagValue = typeof tag === 'string' ? tag : tag.title;
          if (tagValue) {
            allTags.add(tagValue);
          }
        });
      }
    });
    return Array.from(allTags).sort();
  });

  public filteredContentDatas = computed(() => {
    const filter = this.activeFilter();
    const allData = this.contentDatas();

    if (filter === 'All') {
      return allData;
    }

    return allData.filter((item) => {
      if (!item.tags || !Array.isArray(item.tags)) {
        return false;
      }

      return item.tags.some((tag) => {
        const tagValue = typeof tag === 'string' ? tag : tag.title;
        return tagValue === filter;
      });
    });
  });

  public paginatedContentDatas = computed(() => {
    const startIndex = this.pageIndex() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return this.filteredContentDatas().slice(startIndex, endIndex);
  });

  private readonly _graphqlService = inject(GraphqlService);
  private readonly _route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this._route.data.subscribe((routeData) => {
      const collection = routeData['collection'];
      const slug = routeData['slug'];
      const typeName = this._generateTypeName(slug);

      this._loadData(collection, typeName, slug);
    });

  }

  private _loadData(collection: string, typeName: string, slug: string): void {
    this._graphqlService.getPagesList(collection, typeName, slug).subscribe({
      next: (result) => {
        const typedResult = result as unknown as { data: { entry?: EntryListData } };
        const entry = typedResult.data?.entry;

        const fallbackImage = 'https://via.placeholder.com/600x400?text=No+Image';
        const contents: ContentData[] = [];

        if (entry?.collections_contents) {
          entry.collections_contents.forEach((collection) => {
            const treeArray = collection.structure?.tree || [];

            if (Array.isArray(treeArray)) {
              treeArray.forEach((treeNode) => {
                const entryItem = treeNode.entry;

                if (entryItem && entryItem.id) {
                  const heroDesc = typeof entryItem.hero_description === 'string' ? entryItem.hero_description : '';

                  contents.push({
                    id: Number(entryItem.id) || 0,
                    title: entryItem.title ?? '',
                    slug: entryItem.slug ?? '',
                    description: heroDesc,
                    imageUrl: entryItem.hero_image_light?.url ? `${environment.cmsBaseUrl}${entryItem.hero_image_light.url}` : '',
                    imageLink: entryItem.slug ? `/${slug}/${entryItem.slug}` : '',
                    last_modified: entryItem.last_modified,
                    date: entryItem.date,
                    tags: entryItem.tags,
                  });
                }
              });
            }
          });
        }

        this.contentDatas.set(contents.sort((a, b) => a.title.localeCompare(b.title)));

        const lightUrl = entry?.hero_image_light?.url ? `${environment.cmsBaseUrl}${entry.hero_image_light.url}` : '';
        const darkUrl = entry?.hero_image_dark?.url ? `${environment.cmsBaseUrl}${entry.hero_image_dark.url}` : '';

        this.heroData.set({
          id: Number(entry?.id) || 0,
          title: entry?.title ?? 'List Page',
          description: entry?.hero_description ?? '',
          imageUrl: lightUrl || darkUrl || fallbackImage,
          imageUrlLight: lightUrl || fallbackImage,
          imageUrlDark: darkUrl || fallbackImage,
          isBackButton: true,
        });
      },
      error: (err) => {
        console.warn('Hiba történt a GraphQL lekérdezés során:', err);
      },
    });
  }

  private _generateTypeName(collection: string): string {

    const pascalCaseCollection = collection
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    let blueprintName = pascalCaseCollection;
    if (blueprintName.endsWith('s')) {
      blueprintName = blueprintName.slice(0, -1);
    }

    const result = `Entry_${pascalCaseCollection}_${blueprintName}`;

    return result;
  }

  public transformToCardData(item: ContentData): ContentCardData {
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
      imageUrlDark: item.comp_img_dark_mode?.[0]?.url ? `${environment.cmsBaseUrl}${item.comp_img_dark_mode[0].url}` : item.imageUrl,
      buttonOneUrl: item.imageLink,
      last_modified: item.last_modified,
      date: item.date,
      tags: item.tags,
    };
  }

  public onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  public onFilterChange(tag: string): void {
    this.activeFilter.set(tag);
    this.pageIndex.set(0);
  }

  public selectedTag(): string {
    return this.activeFilter();
  }
}
