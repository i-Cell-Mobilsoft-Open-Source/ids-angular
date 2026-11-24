import { environment } from '../../../environments/environment.development';
import { ContentCardComponent } from '../../components/content-card/content-card.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ComponentData } from '../../model/componentData';
import { ContentCardData } from '../../model/contentCardData';
import { EntryData } from '../../model/entryData';
import { HeroData } from '../../model/heroData';
import { StatamicComponentListItem } from '../../model/statamicComponentListItemData';
import { GraphqlService, StatamicNavTreeBranch } from '../../services/graphql.service';

import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, startWith, switchMap } from 'rxjs';

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
  private readonly _translate = inject(TranslateService);
  private readonly _destroyRef = inject(DestroyRef);

  public currentLang = toSignal(this._translate.onLangChange.pipe(map((event) => event.lang)), {
    initialValue: sessionStorage.getItem('ids_lang') || 'en',
  });

  public ngOnInit(): void {
    this._translate.onLangChange.pipe(
      map((event) => event.lang),
      startWith(this.currentLang()),
      switchMap((lang) => this._graphqlService.getComponentsList(lang).pipe(
        map((result) => ({ result, lang })),
      )),
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(({ result, lang }) => this._loadComponentsList(result, lang));
  }

  private _loadComponentsList(result: unknown, lang: string): void {
    const typedResult = result as { data?: { entries?: { data?: Partial<StatamicComponentListItem>[] }; entry?: EntryData } };
    const fallbackImage = 'https://via.placeholder.com/600x400?text=No+Image';
    const entry = typedResult?.data?.entry;
    const components: ComponentData[] = [];
    const seen = new Set<string>();
    this._collectComponents(entry?.navs_field?.[0]?.tree ?? [], lang, components, seen);

    if (components.length === 0) {
      for (const item of typedResult?.data?.entries?.data ?? []) {
        const key = item.id != null ? String(item.id) : item.slug;
        if (key && !seen.has(key)) {
          seen.add(key);
          components.push(this._toComponentData(item, lang));
        }
      }
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
  }

  private _collectComponents(
    nodes: StatamicNavTreeBranch[],
    lang: string,
    components: ComponentData[],
    seen: Set<string>,
    parentTitle?: string,
  ): void {
    for (const node of nodes) {
      const page = node.page;
      const isComponent = page?.__typename === 'NavEntryPage_SideNav_Components_Component';
      if (isComponent && page.id) {
        const key = String(page.id);
        if (!seen.has(key)) {
          seen.add(key);
          components.push(this._toComponentData(page, lang, parentTitle));
        }
      }
      const nextParentTitle = isComponent && page.id ? page.title || parentTitle : parentTitle;
      this._collectComponents(node.children ?? [], lang, components, seen, nextParentTitle);
    }
  }

  private _toComponentData(item: Partial<StatamicComponentListItem>, lang: string, parentTitle?: string): ComponentData {
    const lightImage = item.comp_img_light_mode?.[0]?.url;
    const darkImage = item.comp_img_dark_mode?.[0]?.url;
    const image = lightImage || darkImage;
    return {
      id: item.id ?? item.slug ?? '',
      title: item.title ?? '',
      description: item.comp_description ?? '',
      comp_description: item.comp_description ?? '',
      slug: item.slug ?? '',
      imageUrl: image ? `${environment.cmsBaseUrl}${image}` : 'https://via.placeholder.com/600x400?text=No+Image',
      imageLink: item.slug ? `/${lang}/components/${item.slug}` : '',
      comp_img_light_mode: item.comp_img_light_mode as { url: string }[] | undefined,
      comp_img_dark_mode: item.comp_img_dark_mode as { url: string }[] | undefined,
      parentTitle,
    };
  }

  public transformToCardData(item: ComponentData): ContentCardData {
    return {
      id: item.id,
      title: item.title,
      overTitle: item.parentTitle,
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
          text: this._translate.instant('BUTTONS.LEARN_MORE'),
          url: item.imageLink ?? '',
        },
      ],
    };
  }
}
