import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SPINNER_DEFAULT_CONFIG_FACTORY, IdsSpinnerVariant, IdsSpinnerVariantType } from '@i-cell/ids-angular/spinner';
import { TranslateService } from '@ngx-translate/core';

const SPINNER_DOCS_PATH = 'spinner/spinner.component.docs.json';

const defaultConfig = IDS_SPINNER_DEFAULT_CONFIG_FACTORY();

type SpinnerInputControls = {
  size: IdsSizeType,
  variant: IdsSpinnerVariantType,
  sizeCollection: IdsSizeCollectionType,
  isTrack: boolean,
  ariaLabel: string,
};
@Injectable()
export class SpinnerDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly inputControlConfig: DemoControlConfig<SpinnerInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(SPINNER_DOCS_PATH, 'size', 'Spinner size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      list: Object.values(IdsSize),
      control: 'select',
    },
    variant: {
      description: this._widgetDocs.getDescription(SPINNER_DOCS_PATH, 'variant', 'Spinner variant.'),
      type: 'IdsSpinnerVariantType',
      default: defaultConfig.variant,
      list: Object.values(IdsSpinnerVariant),
      control: 'select',
    },
    sizeCollection: {
      description: this._widgetDocs.getDescription(
        SPINNER_DOCS_PATH,
        'sizeCollection',
        'Size collection used together with size to determine the rendered dimensions.',
      ),
      type: 'IdsSizeCollectionType',
      default: defaultConfig.sizeCollection,
      list: Object.values(IdsSizeCollection),
      control: 'select',
    },
    isTrack: {
      description: this._widgetDocs.getDescription(
        SPINNER_DOCS_PATH,
        'isTrack',
        'Whether to show the background track behind the rotating indicator.',
      ),
      type: 'boolean',
      default: defaultConfig.isTrack,
      control: 'switch',
    },
    ariaLabel: {
      description: this._widgetDocs.getDescription(
        SPINNER_DOCS_PATH,
        'ariaLabel',
        'Accessible label of the spinner (rendered as the aria-label attribute).',
      ),
      type: 'string',
      default: 'loading',
      control: 'text',
    },
  };

  public defaults = getDefaultFromDemoConfig<SpinnerInputControls>(this.inputControlConfig);

  public model: SpinnerInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.SPINNER', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig,
      },
    ];
  }

}
