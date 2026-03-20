import { ContentHeroComponent } from '../../../components/content-hero/content-hero.component';
import { HeroData } from '../../../model/heroData';
import { GraphqlService } from '../../../services/graphql.service';

import { formatDate } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from 'projects/demo/src/environments/environment.development';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-content-page',
  imports: [
    RouterModule,
    ContentHeroComponent,
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
  private readonly _baseUrl = environment.cmsBaseUrl.replace(/\/$/, '');

  public articleContent = signal<unknown>(null);

  public ngOnInit(): void {
    this._route.paramMap.pipe(
      map((params) => params.get('slug')),
      filter((slug): slug is string => !!slug),
      switchMap((slug) => this._graphqlService.getContent(slug)),
    ).subscribe({
      next: (result) => {
        const entry = result.data?.entry as {
          id?: string | number;
          title?: string;
          hero_description?: string;
          hero_image_light?: { url?: string };
          hero_image_dark?: { url?: string };
          date?: string;
          tags?: { title?: string }[];
          author?: { name?: string; id?: string; avatar?: { url?: string } } | string;
        };

        if (entry) {
          const fallbackImage = 'https://via.placeholder.com/600x400?text=No+Image';
          const heroDesc = typeof entry.hero_description === 'string' ? entry.hero_description : '';

          const lightUrl = entry.hero_image_light?.url ? `${this._baseUrl}${entry.hero_image_light.url}` : fallbackImage;
          const darkUrl = entry.hero_image_dark?.url ? `${this._baseUrl}${entry.hero_image_dark.url}` : fallbackImage;

          const formattedDate = entry.date
            ? formatDate(entry.date, 'yyyy-MM-dd', 'en-US')
            : '';

          // 1. Hero adatok beállítása
          this.heroData.set({
            id: Number(entry.id) || 0,
            title: entry.title ?? '',
            description: heroDesc,
            imageUrl: lightUrl,
            imageUrlLight: lightUrl,
            imageUrlDark: darkUrl,
            isBackButton: true,
            tags: entry.tags?.filter((tag): tag is { title: string } => !!tag.title) ?? [],
            writtenBy: typeof entry.author === 'string' ? entry.author : entry.author?.name ?? '',
            date: formattedDate,

          });

          // 2. Teljes cikk eltárolása (benne van az author, date, tags is!)
          this.articleContent.set(entry);
        }
      },
      error: (err) => console.warn('Hiba a cikk lekérdezésekor:', err),
    });
  }
}
