import { ContentCardComponent } from '../../components/content-card/content-card.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ContentCardData } from '../../model/contentCardData';
import { EntryListData } from '../../model/entryListData';
import { HeroData } from '../../model/heroData';
import { GraphqlService } from '../../services/graphql.service';

import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { IdsChipGroupComponent, IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsPaginatorComponent } from '@i-cell/ids-angular/paginator';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'projects/demo/src/environments/environment.development';
import { combineLatest, startWith } from 'rxjs';

const PAGE_SIZE = 8;

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
  public contentDatas = signal<ContentCardData[]>([]);
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
    const allData = this.contentDatas().sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

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
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  private readonly _translate = inject(TranslateService);

  private _currentSlug = '';

  public ngOnInit(): void {
    let lastLoadedKey = '';

    combineLatest({
      routeData: this._route.data,
      queryParams: this._route.queryParamMap,
      langTrigger: this._translate.onLangChange.pipe(startWith(null)),
    })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(({ routeData, queryParams }) => {
        const collection = routeData['collection'];
        const slug = routeData['slug'];
        const typeName = this._generateTypeName(slug);

        const storageKey = `list_filter_${slug}`;
        const filterValue = queryParams.get('filter') ?? sessionStorage.getItem(storageKey) ?? 'All';
        this.activeFilter.set(filterValue);

        const currentLoadKey = `${collection}_${slug}_${this._translate.getCurrentLang()}`;

        if (currentLoadKey !== lastLoadedKey) {
          lastLoadedKey = currentLoadKey;
          this._loadData(collection, typeName, slug);
        }
      });
  }

  private _loadData(collection: string, typeName: string, slug: string): void {
    this._graphqlService.getPagesList(collection, typeName, slug).subscribe({
      next: (result) => {
        const typedResult = result as unknown as { data: { entry?: EntryListData } };
        const entry = typedResult.data?.entry;

        const fallbackImage = 'https://via.placeholder.com/600x400?text=No+Image';
        const contents: ContentCardData[] = [];

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
                    card: {
                      orientation: 'vertical',
                      appearance: 'elevated',
                      variant: 'light',
                      transparent: false,
                    },
                    image: {
                      imageUrl: entryItem.hero_image_light?.url ? `${environment.cmsBaseUrl}${entryItem.hero_image_light.url}` : '',
                      lightUrl: entryItem.hero_image_light?.url ? `${environment.cmsBaseUrl}${entryItem.hero_image_light.url}` : '',
                      darkUrl: entryItem.hero_image_dark?.url ? `${environment.cmsBaseUrl}${entryItem.hero_image_dark.url}` : '',
                      aspectRatio: '16/9',
                      caption: entryItem.title ?? '',
                      bgColorVariant: 'light',
                      bgTransparent: true,
                      filledInContainer: false,
                      state: 'no_state',
                    },
                    button: [
                      {
                        text: 'Tovább',
                        url: entryItem.slug ? `/${sessionStorage.getItem('ids_lang') || 'en'}/${slug}/${entryItem.slug}` : '',
                      },
                    ],
                    last_modified: entryItem.last_modified,
                    date: entryItem.date,
                    tags: entryItem.tags?.filter(
                      (tag): tag is { id: number; title: string } => tag.id !== undefined && tag.title !== undefined,
                    ),
                  });
                }
              });
            }
          });
        }

        this.contentDatas.set(contents.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? '')));

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

  public onPageChange(event: { pageIndex: number; pageSize: number }): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  public onFilterChange(tag: string): void {
    this.activeFilter.set(tag);
    this.pageIndex.set(0);

    const filterValue = tag === 'All' ? null : tag;
    const storageKey = `list_filter_${this._currentSlug}`;

    if (filterValue) {
      sessionStorage.setItem(storageKey, filterValue);
    } else {
      sessionStorage.removeItem(storageKey);
    }

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: { filter: filterValue },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  public selectedTag(): string {
    return this.activeFilter();
  }
}
