import { environment } from '../../../environments/environment.development';
import { ISSUE_DATA } from '../../../utils/issueListData';
import { ContentCardComponent } from '../../components/content-card/content-card.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ContentCardData } from '../../model/contentCardData';
import { HeroData } from '../../model/heroData';
import { PageEntry } from '../../model/pageEntry';
import { GraphqlService } from '../../services/graphql.service';

import { Component, OnInit, inject, OnDestroy, signal } from '@angular/core';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
type ComponentBlock =
  | { type: 'heading'; heading: string }
  | (ContentCardData & { type: 'card' });

@Component({
  selector: 'app-issue-report',
  imports: [
    IdsCardComponent,
    HeroComponent,
    IdsIconButtonComponent,
    IdsIconComponent,
    ContentCardComponent,
  ],
  templateUrl: './issue-report.component.html',
  styleUrl: './issue-report.component.scss',
})
export class IssueReportComponent implements OnInit, OnDestroy {
  public indexDatas = ISSUE_DATA;
  public heroData?: HeroData;
  public componentBlocks: ComponentBlock[] = [];

  // public heroData = signal<HeroData>({
  //   title: 'Issue report',
  //   description:
  //     // eslint-disable-next-line @stylistic/js/max-len
  //     'Welcome to the Issue Report page! Here, you can  submit requests for improvements to the i-DS Design System or report specific design or development issues. However, before submitting a new request or bug report, please check the issue list to make sure it hasn’t already been reported by someone else.',
  //   id: 0,
  //   imageUrl: '',
  //   imageUrlLight: 'assets/images/heros/ids-issue-hero@2x.png',
  //   imageUrlDark: 'assets/images/heros/ids-issue-hero-dark@2x.png',
  // });

  private _observer: MutationObserver | undefined;
  private _isDarkTheme = signal<boolean>(false);
  private _graphqlService = inject(GraphqlService);

  public ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('ngOnInit running');
    this._updateTheme();

    this._observer = new MutationObserver(() => {
      this._updateTheme();
    });

    this._observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    this._graphqlService.getPages().subscribe((result) => {
      const typedResult = result as { data: { entries: { data: PageEntry[] } } };
      const components = typedResult.data.entries.data;

      if (components.length === 0) {
        return;
      }

      const component = components[0];

      this.heroData = {
        id: Number(component.id),
        title: component.title,
        isBackButton: true,
        description: component.hero_description,
        imageUrl: component.hero_image_light?.url
          ? `${environment.cmsBaseUrl}${component.hero_image_light.url}`
          : '',
        imageUrlLight: component.hero_image_light?.url
          ? `${environment.cmsBaseUrl}${component.hero_image_light.url}`
          : '',
        imageUrlDark: component.hero_image_dark?.url
          ? `${environment.cmsBaseUrl}${component.hero_image_dark.url}`
          : '',
      };
      // eslint-disable-next-line no-console
      console.log('hero_image_light:', component.hero_image_light);
      // eslint-disable-next-line no-console
      console.log('Component from CMS:', component);
      // eslint-disable-next-line no-console
      console.log('hero_image_light:', component.hero_image_light);

      const blocks: ComponentBlock[] = [];

      for (const block of component.content) {
        if (block.__typename === 'Set_Content_Heading') {
          blocks.push({
            type: 'heading',
            heading: block.heading,
          });
        }

        if (block.__typename === 'Set_Content_Card') {
          // eslint-disable-next-line no-console
          console.log('Aspect Ratio:', block.group_image?.img_aspect_ratio?.value);
          blocks.push({
            type: 'card',
            id: Number(block.id),
            orientation: block.card_properties?.card_orientation?.value ?? 'vertical',
            variant: block.card_properties?.card_variant?.value ?? 'surface',
            appearance: block.card_properties?.appearance?.value ?? 'filled',
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
            aspectRatio: block.group_image?.img_aspect_ratio?.value ?? '16/9',
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

  public ngOnDestroy(): void {
    this._observer?.disconnect();
  }

  public getImageUrl(indexData: unknown): string {
    const data = indexData as { imageUrlDark: string; imageUrlLight: string };
    return this._isDarkTheme() ? data.imageUrlDark : data.imageUrlLight;
  }

  private _updateTheme(): void {
    const htmlClassList = document.documentElement.classList;
    this._isDarkTheme.set(htmlClassList.contains('ids-theme-dark'));
  }
}
