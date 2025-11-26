/* eslint-disable @typescript-eslint/no-explicit-any */
import { IdsTabGroupComponent } from '../../../../../../widgets/tab/tab-group.component';
import { environment } from '../../../../environments/environment.development';
import { HeroComponent } from '../../../components/hero/hero.component';
import { ComponentEntry } from '../../../model/componentEntry';
import { ContentCardData } from '../../../model/contentCardData';
import { HeroData } from '../../../model/heroData';
import { GraphqlService } from '../../../services/graphql.service';

import { Component, OnInit, computed, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterModule, NavigationEnd } from '@angular/router';
import { IdsTabComponent } from '@i-cell/ids-angular/tab';
import { map, filter, switchMap, startWith, distinctUntilChanged } from 'rxjs';

type ComponentBlock = { type: 'heading'; heading: string } | (ContentCardData & { type: 'card' });

@Component({
  selector: 'app-component-details',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HeroComponent,
    IdsTabComponent,
    IdsTabGroupComponent,
  ],
  templateUrl: './component-details.component.html',
  styleUrl: './component-details.component.scss',
})
export class ComponentDetailsComponent implements OnInit {
  public heroData?: HeroData;
  public componentBlocks: ComponentBlock[] = [];

  // @ViewChild('demoHost', { read: ViewContainerRef, static: true }) public demoHost!: ViewContainerRef;
  // @ViewChild('controlHost', { read: ViewContainerRef, static: true }) public controlHost!: ViewContainerRef;

  public tabGroup = viewChild(IdsTabGroupComponent);
  public activeTab = signal<string>('guidelines');

  private _tabs = [
    'guidelines',
    'demo',
    'api',
  ];

  public targetTabIndex = computed(() =>
    this._tabs.indexOf(this.activeTab()),
  );

  private _graphqlService = inject(GraphqlService);
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  public selectedSection = 'demo';

  constructor() {
    effect(() => {
      const group = this.tabGroup();
      const targetIndex = this.targetTabIndex();

      if (group) {
        untracked(() => {
          if (group.selectedTabIndex() !== targetIndex) {
            setTimeout(() => {
              group.selectTab(targetIndex);
            }, 0);
          }
        });
      }
    });
    effect(() => {
      const group = this.tabGroup();

      if (group) {

        const clickedIndex = group.selectedTabIndex();

        const targetPath = this._tabs[clickedIndex] || 'guidelines';

        const currentPath = untracked(() => this.activeTab());

        if (currentPath !== targetPath) {
          this._router.navigate([targetPath], { relativeTo: this._route });
        }
      }
    });
  }

  public ngOnInit(): void {

    const navigationEnd$ = this._router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
    );

    navigationEnd$.pipe(
      map(() => {
        const urlSegments = this._router.url.split('/');
        return urlSegments[2];
      }),
      distinctUntilChanged(),
      filter((slug) => !!slug),
      switchMap((slug) =>
        this._graphqlService.getComponents().pipe(
          map((result) => {
            const typedResult = result as { data: { entries: { data: ComponentEntry[] } } };
            const components = typedResult.data.entries.data;
            return components.find((entry) => entry.slug === slug);
          }),
        ),
      ),
    ).subscribe((component) => {
      if (component) {
        this._updateHeroAndBlocks(component);
      } else {
        this.heroData = undefined;
        this.componentBlocks = [];
      }
    });

    navigationEnd$.subscribe(() => {
      const childRoute = this._route.firstChild?.snapshot.url[0]?.path ?? 'guidelines';

      this.activeTab.set(childRoute);
    });
  }

  private _updateHeroAndBlocks(component: any): void {
    this.heroData = {
      id: Number(component.id),
      title: component.title,
      isBackButton: true,
      description: component.comp_description,
      imageUrl: component.comp_img_light_mode?.[0]?.url ? `${environment.cmsBaseUrl}${component.comp_img_light_mode[0].url}` : '',
      imageUrlLight: component.comp_img_light_mode?.[0]?.url
        ? `${environment.cmsBaseUrl}${component.comp_img_light_mode[0].url}`
        : '',
      imageUrlDark: component.comp_img_dark_mode?.[0]?.url ? `${environment.cmsBaseUrl}${component.comp_img_dark_mode[0].url}` : '',
    };

    const blocks: ComponentBlock[] = [];
    component.componentBlocks?.forEach((block: any) => {
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
          appearance: block.card_properties?.appearance?.value ?? 'filled',
          transparent: block.card_bg_transparent ?? false,
          filledInContainer: block.group_image?.filled_in_container ?? false,
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
        this.componentBlocks = blocks;
      }
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
    return item.type === 'card' ? (item.id ?? `card-${index}`) : `heading-${index}`;
  }

}
