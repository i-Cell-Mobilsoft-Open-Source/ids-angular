import { IDS_ACCORDION_DEFAULT_CONFIG, IDS_ACCORDION_DEFAULT_CONFIG_FACTORY, IdsAccordionDefaultConfig } from './accordion-defaults';
import { IdsAccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionAppearanceType } from './types/accordion-appearance';

import { CdkAccordion } from '@angular/cdk/accordion';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonAppearanceType, IdsButtonComponent } from '@i-cell/ids-angular/button';
import { AllVariantsType, coerceBooleanAttribute, coerceStringAttribute, ComponentBaseWithDefaults, SizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_ACCORDION_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-accordion',
  standalone: true,
  imports: [
    CdkAccordion,
    IdsButtonComponent,
  ],
  templateUrl: './accordion.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(keydown)': '_handleKeyDown($event)',
  },
  hostDirectives: [
    {
      directive: CdkAccordion,
      inputs: ['multi'],
    },
  ],
})
export class IdsAccordionComponent extends ComponentBaseWithDefaults<IdsAccordionDefaultConfig> {
  protected override get _componentName(): string {
    return 'accordion';
  }
  
  private _cdkAccordion = inject(CdkAccordion); 
  private _items = contentChildren<IdsAccordionItemComponent>(IdsAccordionItemComponent);

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_ACCORDION_DEFAULT_CONFIG);
  protected _controlsClass = `${this._componentClass}-controls`;

  public size = input<SizeType>(this._defaultConfig.size);
  public appearance = input<AccordionAppearanceType>(this._defaultConfig.appearance);
  public disabled = input(false, { transform: coerceBooleanAttribute });
  public hasLeadingIcon = input(this._defaultConfig.hasLeadingIcon, { transform: coerceBooleanAttribute });
  public hasTrailingIcon = input(this._defaultConfig.hasTrailingIcon, { transform: coerceBooleanAttribute });
  public multi = input<boolean>(this._defaultConfig.multi);
  public btnSize = input<SizeType>(this._defaultConfig.btnSize);
  public btnAppearance = input<ButtonAppearanceType>(this._defaultConfig.btnAppearance);
  public btnVariant = input<AllVariantsType>(this._defaultConfig.btnVariant);
  public expandBtnLabel = input<string, string>(this._defaultConfig.expandBtnLabel, { transform: coerceStringAttribute });
  public collapseBtnLabel = input<string, string>(this._defaultConfig.collapseBtnLabel, { transform: coerceStringAttribute });

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.appearance(),
    this.disabled() ? 'disabled' : null,
  ]));
  
  public openAll(): void {
    this._cdkAccordion.openAll();
  }
  
  public closeAll(): void {
    this._cdkAccordion.closeAll();
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    const navigationKeys = [
      'Enter',
      ' ',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
    ];
  
    if (!navigationKeys.includes(event.key)) {
      return;
    }
  
    event.preventDefault();
  
    const items = this._items();
    const target = event.target as HTMLButtonElement;
    const accordionId = target.parentElement!.id;
    const index = items.findIndex((item) => item.id() === accordionId);
  
    switch (event.key) {
      case 'ArrowUp': {
        if (index > 0) {
          const prevItem = items[index - 1];
          prevItem.focus();
        }
        break;
      }
      case 'ArrowDown': {
        if (index < items.length - 1) {
          const nextItem = items[index + 1];
          nextItem.focus();
        }
        break;
      }
      case 'Enter':
      case ' ': {
        items[index].toggle();
        break;
      }
      case 'Home': {
        items[0].focus();
        break;
      }
      case 'End': {
        items[items.length - 1].focus();
        break;
      }
      default:
        return;
    }
  }
}
