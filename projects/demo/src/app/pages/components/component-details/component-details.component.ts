/* eslint-disable @stylistic/js/array-element-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IdsTabGroupComponent } from '../../../../../../widgets/tab/tab-group.component';
import { environment } from '../../../../environments/environment.development';
import { ContentCardComponent } from '../../../components/content-card/content-card.component';
import { HeroComponent } from '../../../components/hero/hero.component';
import { ComponentEntry } from '../../../model/componentEntry';
import { ContentCardData } from '../../../model/contentCardData';
import { HeroData } from '../../../model/heroData';
import { GraphqlService } from '../../../services/graphql.service';
import { AccordionDemoControlComponent } from '../../accordion/accordion-demo-control.component';
import { AccordionDemoComponent } from '../../accordion/accordion-demo.component';
import { ButtonDemoControlComponent } from '../../button/button-demo-control.component';
import { ButtonDemoComponent } from '../../button/button-demo.component';

// Static mapping for demo and control components
const DEMO_COMPONENT_MAP: Record<string, Type<any>> = {
  button: ButtonDemoComponent,
  accordion: AccordionDemoComponent,
  // Add more mappings: 'slug': DemoComponent
};
const CONTROL_COMPONENT_MAP: Record<string, Type<any>> = {
  button: ButtonDemoControlComponent,
  accordion: AccordionDemoControlComponent,
  // Add more mappings: 'slug': ControlComponent
};

import { Component, OnInit, Type, ViewChild, ViewContainerRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { IdsTabComponent } from '@i-cell/ids-angular/tab';
import { combineLatest, map } from 'rxjs';

type ComponentBlock = { type: 'heading'; heading: string } | (ContentCardData & { type: 'card' });

@Component({
  selector: 'app-component-details',
  standalone: true,
  imports: [
    HeroComponent,
    ContentCardComponent,
    IdsTabComponent,
    IdsTabGroupComponent,
    IdsChipComponent,
    IdsButtonComponent,
    IdsCardComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
    // ButtonDemoComponent,
    // ButtonDemoControlComponent,
  ],
  templateUrl: './component-details.component.html',
  styleUrl: './component-details.component.scss',
})
export class ComponentDetailsComponent implements OnInit {
  public heroData?: HeroData;
  public componentBlocks: ComponentBlock[] = [];

  @ViewChild('demoHost', { read: ViewContainerRef, static: true }) public demoHost!: ViewContainerRef;
  @ViewChild('controlHost', { read: ViewContainerRef, static: true }) public controlHost!: ViewContainerRef;

  private _currentDemoInstance: any;
  private _currentControlInstance: any;
  private _demoComponentRef: any;
  private _controlComponentRef: any;

  private _graphqlService = inject(GraphqlService);
  private _route = inject(ActivatedRoute);

  public ngOnInit(): void {
    // eslint-disable-next-line @stylistic/js/array-bracket-newline
    combineLatest([this._route.paramMap, this._graphqlService.getComponents()])
      .pipe(
        // eslint-disable-next-line @stylistic/js/array-bracket-newline
        map(([params, result]) => {
          const slug = params.get('slug');
          const typedResult = result as { data: { entries: { data: ComponentEntry[] } } };
          const components = typedResult.data.entries.data;

          let component: ComponentEntry | undefined = undefined;
          if (slug) {
            component = components.find((entry) => entry.slug === slug);
          }
          if (!component) {
            component = components[0];
          }
          if (component) {
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
                  transparent: block.card_properties?.card_bg_transparent ?? false,
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
                  buttonOneUrl: Array.isArray(block.button?.button)
                    ? block.button?.button[0]?.button_url
                    : block.button?.button?.button_url,
                  buttonTwo: Array.isArray(block.button?.button) ? block.button?.button[1]?.button_label : undefined,
                  buttonTwoUrl: Array.isArray(block.button?.button)
                    ? block.button?.button[1]?.button_url
                    : block.button?.button?.button_url,
                });
                this.componentBlocks = blocks;
              }
            });
            this.componentBlocks = blocks;
          }

          return component;
        }),
      )
      .subscribe((component) => {
        if (component && component.slug) {
          this._loadDemoComponent(component.slug);
        } else {
          this._clearHosts();
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

  public isOpen = signal(false);
  public isDark = signal(false);

  public toggleFooter(): void {
    this.isOpen.update((open) => !open);
  }

  public toggleDark(): void {
    this.isDark.update((dark) => !dark);
  }

  private _loadDemoComponent(slug: string): void {
    this._clearHosts();

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const DemoClass = DEMO_COMPONENT_MAP[slug];
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const ControlClass = CONTROL_COMPONENT_MAP[slug];
    if (!DemoClass || !ControlClass) {
      // eslint-disable-next-line no-console
      console.error(`Nem található demo vagy control komponens a slug-hoz: ${slug}`);
      return;
    }

    this._controlComponentRef = this.controlHost.createComponent(ControlClass);
    this._currentControlInstance = this._controlComponentRef.instance;

    this._demoComponentRef = this.demoHost.createComponent(DemoClass);
    this._currentDemoInstance = this._demoComponentRef.instance;

    if (this._currentDemoInstance && this._currentControlInstance) {
      this._currentDemoInstance.model = this._currentControlInstance.model;
      this._currentDemoInstance.helperModel = this._currentControlInstance.helperModel;
      this._currentDemoInstance.groupModel = this._currentControlInstance.groupModel;

      if (this._currentControlInstance.modelChange) {
        this._controlComponentRef.instance.modelChange.subscribe((newModel: any) => {
          this._currentDemoInstance.model = newModel;
        });
      }
      if (this._currentControlInstance.helperModelChange) {
        this._controlComponentRef.instance.helperModelChange.subscribe((newModel: any) => {
          this._currentDemoInstance.helperModel = newModel;
        });
      }
      if (this._currentControlInstance.groupModelChange) {
        this._controlComponentRef.instance.groupModelChange.subscribe((newModel: any) => {
          this._currentDemoInstance.groupModel = newModel;
        });
      }
    }
  }

  private _clearHosts(): void {
    this.demoHost.clear();
    this.controlHost.clear();
    this._currentDemoInstance = null;
    this._currentControlInstance = null;
  }

  public resetDemoControls(): void {
    if (this._currentDemoInstance && this._currentDemoInstance.reset) {
      this._currentDemoInstance.reset();
    }

    if (this._currentControlInstance) {
      this._currentControlInstance.model = { ...this._currentControlInstance.defaults };
      this._currentControlInstance.helperModel = { ...this._currentControlInstance.helperDefaults };
      this._currentControlInstance.groupModel = { ...this._currentControlInstance.groupDefaults };
    }
  }

}
