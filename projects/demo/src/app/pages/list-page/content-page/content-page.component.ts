import { ContentHeroComponent } from '../../../components/content-hero/content-hero.component';
import { ContentBlock, ContentContent, ContentEntry } from '../../../model/contentEntry';
import { HeroData } from '../../../model/heroData';
import { GraphqlService } from '../../../services/graphql.service';

import { formatDate } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IdsButtonGroupComponent, IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsCardComponent,
  IdsCardTitleDirective,
  IdsCardSubtitleDirective,
  IdsCardBodyDirective,
  IdsCardHeaderComponent,
} from '@i-cell/ids-angular/card';
import { environment } from 'projects/demo/src/environments/environment.development';
import { combineLatest } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-content-page',
  imports: [
    RouterModule,
    ContentHeroComponent,
    IdsCardComponent,
    IdsCardTitleDirective,
    IdsCardSubtitleDirective,
    IdsCardBodyDirective,
    IdsCardHeaderComponent,
    IdsButtonGroupComponent,
    IdsButtonComponent,
  ],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
})
export class ContentPageComponent implements OnInit {
  public heroData = signal<HeroData>({
    title: '',
    description: '',
    imageUrl: '',
    imageUrlLight: '',
    imageUrlDark: '',
    id: 0,
    isBackButton: true,
    tags: [],
    writtenBy: '',
    date: '',
  });

  private readonly _graphqlService = inject(GraphqlService);
  private readonly _route = inject(ActivatedRoute);
  private _router = inject(Router);

  public contentBlocks = signal<ContentBlock[]>([]);

  public ngOnInit(): void {

    combineLatest([
      this._route.paramMap,
      this._route.data,
    ])
      .pipe(
        map(([
          params,
          routeData,
        ]) => {
          const rawCollection = routeData['collection'] || '';
          const safeCollection = rawCollection.replace(/-/g, '_');

          const slug = params.get('slug') || '';

          return {
            slug: slug,
            collection: safeCollection,
            typeName: this._generateTypeName(safeCollection),
          };
        }),
        filter((info): info is { slug: string; collection: string; typeName: string } => !!info.slug),

        switchMap((info) => this._graphqlService.getDynamicContent(info.collection, info.typeName, info.slug)),
      )
      .subscribe({
        next: (result) => {
          const data = result.data as { entry?: ContentEntry };
          const entry = data?.entry;

          if (entry) {
            const fallbackImage = 'https://via.placeholder.com/600x400?text=No+Image';
            const heroDesc = typeof entry.hero_description === 'string' ? entry.hero_description : '';

            const lightUrl = entry.hero_image_light?.url ? `${environment.cmsBaseUrl}${entry.hero_image_light.url}` : fallbackImage;
            const darkUrl = entry.hero_image_dark?.url ? `${environment.cmsBaseUrl}${entry.hero_image_dark.url}` : fallbackImage;

            const formattedDate = entry.date ? formatDate(entry.date, 'yyyy-MM-dd', 'en-US') : '';

            this.heroData.set({
              id: Number(entry.id) || 0,
              title: entry.title ?? '',
              description: heroDesc,
              imageUrl: lightUrl,
              imageUrlLight: lightUrl,
              imageUrlDark: darkUrl,
              isBackButton: true,
              tags: entry.tags?.map((tag) => tag.title ?? '') || [],
              writtenBy: typeof entry.author === 'string' ? entry.author : (entry.author?.name ?? ''),
              date: formattedDate,
            });

            this.contentBlocks.set(this._mapContentBlocks(entry.content ?? []));

          }
        },
      });
  }

  public handleButtonClick(url?: string): void {
    if (!url) {
      return;
    }
    // Navigate internally for relative URLs, open in new tab for absolute URLs
    if (url.startsWith('/')) {
      this._router.navigateByUrl(url);
      return;
    }
    window.open(url, '_blank', 'noopener');

  }

  private _generateTypeName(collection: string): string {
    const pascalCaseCollection = collection
      .split('_')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    let blueprintName = pascalCaseCollection;
    if (blueprintName.endsWith('s')) {
      blueprintName = blueprintName.slice(0, -1);
    }

    const result = `Entry_${pascalCaseCollection}_${blueprintName}`;

    return result;
  }

  private _mapContentBlocks(rawContent: ContentContent[] | undefined): ContentBlock[] {
    if (!rawContent || !Array.isArray(rawContent)) {
      return [];
    }

    const blocks: ContentBlock[] = [];

    rawContent.forEach((block) => {
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
          overTitle: block.content?.content_over_title,
          title: block.content?.content_title,
          description: block.content?.content_description,
          orientation: block.card_properties?.card_orientation?.value,
          variant: block.card_properties?.card_variant?.value,
          appearance: block.card_properties?.appearance?.value,
          isImage: block.is_image,
          image: block.group_image
            ? {
              caption: block.group_image.img_caption,
              lightUrl: block.group_image.img_light_mode?.[0]?.url
                ? `${environment.cmsBaseUrl}${block.group_image.img_light_mode[0].url}`
                : undefined,
              darkUrl: block.group_image.img_dark_mode?.[0]?.url
                ? `${environment.cmsBaseUrl}${block.group_image.img_dark_mode[0].url}`
                : undefined,
              aspectRatio: block.group_image.img_aspect_ratio?.value,
              bgColor: block.group_image.img_bg_color?.value,
              bgTransparent: block.group_image.bg_transparent,
              filledInContainer: block.group_image.filled_in_container,
              state: block.group_image.state?.value,
            }
            : undefined,
          isButton: block.is_button,
          buttonOne: Array.isArray(block.button?.button) ? block.button?.button[0]?.button_label : block.button?.button?.button_label,
          buttonOneUrl: Array.isArray(block.button?.button) ? block.button?.button[0]?.button_url : block.button?.button?.button_url,
          buttonTwo: Array.isArray(block.button?.button) ? block.button?.button[1]?.button_label : undefined,
          buttonTwoUrl: Array.isArray(block.button?.button) ? block.button?.button[1]?.button_url : undefined,
        } as ContentBlock);
      }
    });

    return blocks;
  }
}
