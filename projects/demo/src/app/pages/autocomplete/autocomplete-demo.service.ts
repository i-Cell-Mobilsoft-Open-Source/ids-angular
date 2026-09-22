import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType } from '@i-cell/ids-angular/forms';
import { IdsSpinnerVariantType, IdsSpinnerVariant } from '@i-cell/ids-angular/spinner';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, delay, distinctUntilChanged, EMPTY, map, Observable, Subject, tap } from 'rxjs';

const AUTOCOMPLETE_DOCS_PATH = 'forms/components/autocomplete/autocomplete.component.docs.json';
const AUTOCOMPLETE_CHIP_LIST_DOCS_PATH = 'forms/components/autocomplete/autocomplete-chip-list.component.docs.json';
const AUTOCOMPLETE_HINT_DOCS_PATH = 'forms/components/autocomplete/autocomplete-hint.component.docs.json';

const USER_INPUT_DEBOUNCE_TIME = 300;
const SIMULATED_LOADING_TIME = 300;

const OPTIONS = [
  'Accordion',
  'Autocomplete',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Card',
  'Chip',
  'Checkbox',
  'Date Picker',
  'Dialog',
  'Divider',
  'Fieldset',
  'Form Field',
  'Icon',
  'Icon button',
  'Menu Item',
  'Message',
  'Notification',
  'Option',
  'Overlay panel',
  'Paginator',
  'Radio',
  'Scrollbar',
  'Segmented Control',
  'Segmented Control Toggle',
  'Select',
  'Side nav',
  'Side Sheet',
  'Snackbar',
  'Spinner',
  'Switch',
  'Tab',
  'Table',
  'Tag',
  'Tooltip',
].map((option) => ({ key: option, value: option }));

type AutocompleteInputControls = {
  size: IdsSizeType;
  variant: IdsFormFieldVariantType;
  disabled: boolean;
  required: boolean;
  multiSelect: boolean;
};

type AutocompleteHelperControls = {
  placeholder: string;
  minChars: number;
  hint: string;
  limit: number;
  ariaLabelClear: string;
  spinnerVariant: IdsSpinnerVariantType;
  hintLoading: string;
  hintNoResults: string;
  hintMinChars: string;
  hintTooManyResults: string;
};

type InputOption = {
  key: string;
  value: unknown;
};

@Injectable()
export class AutocompleteDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  private _resetSubject = new Subject<void>();
  public reset$ = this._resetSubject.asObservable();

  public readonly inputControlConfig: DemoControlConfig<AutocompleteInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(AUTOCOMPLETE_DOCS_PATH, 'size', 'Size of the auto complete field.'),
      type: 'IdsSizeType',
      default: IdsSize.COMPACT,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(AUTOCOMPLETE_DOCS_PATH, 'variant', 'Variant of the auto complete field.'),
      type: 'IdsFormFieldVariantType',
      default: IdsFormFieldVariant.SURFACE,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
    disabled: {
      description: this._widgetDocs.getDescription(AUTOCOMPLETE_DOCS_PATH, 'disabled', 'Whether the field is disabled or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    required: {
      description: this._widgetDocs.getDescription(AUTOCOMPLETE_DOCS_PATH, 'required', 'Whether the field is required or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    multiSelect: {
      description: this._widgetDocs.getDescription(AUTOCOMPLETE_DOCS_PATH, 'multiSelect', 'Whether the field allows multiple selections.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
      onModelChange: (value) => {
        if (value !== undefined) {
          this.multiSelectSignal.set(value);
        }
      },
    },
  };

  public readonly helperControlConfig: DemoControlConfig<AutocompleteHelperControls> = {
    placeholder: {
      description: 'Placeholder text for the autocomplete input',
      type: 'string',
      default: 'Type to search...',
    },
    minChars: {
      description: 'Minimum number of characters before autocomplete activates',
      type: 'number',
      default: 0,
    },
    hint: {
      description: 'Hint text for the autocomplete input',
      type: 'string',
      default: 'You can narrow suggestions by typing.',
    },
    limit: {
      description: 'Hint shown if the number of suggestions exceeds this limit',
      type: 'number',
      default: 10,
    },
    ariaLabelClear: {
      description: 'Aria label for the clear button',
      type: 'string',
      default: 'Clear',
    },
    spinnerVariant: {
      description: 'Variant of the spinner displayed in the autocomplete field.',
      type: 'IdsSpinnerVariantType',
      default: IdsSpinnerVariant.SURFACE,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSpinnerVariant),
    },
    hintLoading: {
      description: 'Hint text displayed while loading options.',
      type: 'string',
      default: 'Loading...',
    },
    hintNoResults: {
      description: 'Hint text displayed when no results are found.',
      type: 'string',
      default: 'No results found',
    },
    hintMinChars: {
      description: 'Hint text displayed when minimum number of characters before autocomplete activates is not met.',
      type: 'string',
      default: 'Please provide at least 1 characters',
    },
    hintTooManyResults: {
      description: 'Hint text displayed when maximum length of the options is exceeded.',
      type: 'string',
      default: 'Too many results, please refine your search',
    },
  };

  public readonly propControlConfig: DemoControlConfig<unknown> = {
    trigger: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_DOCS_PATH,
        'trigger',
        'The IdsAutocompleteTriggerDirective instance the autocomplete is connected to. Required.',
      ),
      type: 'IdsAutocompleteTriggerDirective',
      default: '-',
    },
    isLoading: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_DOCS_PATH,
        'isLoading',
        'Whether the autocomplete is currently in a loading state (shows the spinner).',
      ),
      type: 'boolean',
      default: false,
    },
    ariaLabel: {
      description: this._widgetDocs.getDescription(AUTOCOMPLETE_DOCS_PATH, 'ariaLabel', 'aria-label for the autocomplete input.'),
      type: 'string',
      default: '',
    },
    ariaLabelledby: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_DOCS_PATH,
        'ariaLabelledby',
        'aria-labelledby for the autocomplete input.',
      ),
      type: 'string',
      default: '',
    },
    ariaLabelLoading: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_DOCS_PATH,
        'ariaLabelLoading',
        'aria-label for the loading spinner shown inside the autocomplete field.',
      ),
      type: 'string',
      default: '',
    },
    tabIndex: {
      description: this._widgetDocs.getDescription(AUTOCOMPLETE_DOCS_PATH, 'tabIndex', 'Tab index of the autocomplete input.'),
      type: 'number',
      default: 0,
    },
    panelClasses: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_DOCS_PATH,
        'panelClasses',
        'Additional CSS class(es) applied to the autocomplete\'s overlay panel.',
      ),
      type: 'string',
      default: '',
    },
    panelOpen: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_DOCS_PATH,
        'panelOpen',
        'Whether the autocomplete\'s suggestion panel is open or not. Two-way bindable.',
      ),
      type: 'boolean',
      default: false,
    },
    appearance: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_DOCS_PATH,
        'appearance',
        'Appearance of the autocomplete\'s clear/dropdown trigger button.',
      ),
      type: 'IdsIconButtonAppearanceType',
      default: 'standard',
    },
    sortCompareFn: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_DOCS_PATH,
        'sortCompareFn',
        'Function used to sort selected options (only relevant when multiSelect is true).',
      ),
      type: '(a: IdsOptionValue, b: IdsOptionValue) => number',
      default: '-',
    },
    valueCompareFn: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_DOCS_PATH,
        'valueCompareFn',
        'Function used to compare option values when determining selection state.',
      ),
      type: '(o1: unknown, o2: unknown) => boolean',
      default: '-',
    },
    errorStateMatcher: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_DOCS_PATH,
        'errorStateMatcher',
        'Matcher instance used to determine whether the autocomplete should show an error state.',
      ),
      type: 'AbstractErrorStateMatcher',
      default: '-',
    },
    successStateMatcher: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_DOCS_PATH,
        'successStateMatcher',
        'Matcher instance used to determine whether the autocomplete should show a success state.',
      ),
      type: 'AbstractSuccessStateMatcher',
      default: '-',
    },
  };

  public readonly chipListPropControlConfig: DemoControlConfig<unknown> = {
    for: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_CHIP_LIST_DOCS_PATH,
        'for',
        'The IdsAutocompleteTriggerDirective to connect the chip list to (typically the same as the autocomplete\'s trigger). Required.',
      ),
      type: 'IdsAutocompleteTriggerDirective',
      default: '-',
    },
    options: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_CHIP_LIST_DOCS_PATH,
        'options',
        'Array of currently selected options rendered as chips (typically bound automatically via the "for" trigger).',
      ),
      type: 'IdsOptionValue[]',
      default: [],
    },
    appearance: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_CHIP_LIST_DOCS_PATH,
        'appearance',
        'Appearance of the chips inside the autocomplete chip list.',
      ),
      type: 'IdsChipAppearanceType',
      default: 'outlined',
    },
    size: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_CHIP_LIST_DOCS_PATH,
        'size',
        'Size of the chips inside the autocomplete chip list.',
      ),
      type: 'IdsSizeType',
      default: IdsSize.DENSE,
    },
    variant: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_CHIP_LIST_DOCS_PATH,
        'variant',
        'Variant of the chips inside the autocomplete chip list.',
      ),
      type: 'IdsChipVariantType',
      default: 'surface',
    },
  };

  public readonly hintPropControlConfig: DemoControlConfig<unknown> = {
    variant: {
      description: this._widgetDocs.getDescription(
        AUTOCOMPLETE_HINT_DOCS_PATH,
        'variant',
        'Variant of the autocomplete hint message.',
      ),
      type: 'IdsMessageVariantType',
      default: 'surface',
    },
    size: {
      description: this._widgetDocs.getDescription(AUTOCOMPLETE_HINT_DOCS_PATH, 'size', 'Size of the autocomplete hint message.'),
      type: 'IdsSizeType',
      default: IdsSize.COMFORTABLE,
    },
  };

  public defaults = getDefaultFromDemoConfig<AutocompleteInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<AutocompleteHelperControls>(this.helperControlConfig);

  public model: AutocompleteInputControls = { ...this.defaults };
  public helperModel: AutocompleteHelperControls = { ...this.helperDefaults };
  public multiSelectSignal = signal(this.model.multiSelect);

  public isLoading = signal(false);
  public options$: Observable<InputOption[]> = EMPTY;
  public input = signal<string>('');
  public input$ = toObservable(this.input);

  constructor() {
    this.options$ = this.input$.pipe(
      distinctUntilChanged(),
      debounceTime(USER_INPUT_DEBOUNCE_TIME),
      tap(() => this.isLoading.set(true)),
      delay(SIMULATED_LOADING_TIME),
      map((value) => this._fixedOptionsListFilterFn(OPTIONS, value)),
      tap(() => this.isLoading.set(false)),
    );
  }

  public inputChange(event: Event): void {
    this.input.set((event.target as HTMLInputElement).value);
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this._resetSubject.next();
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.AUTOCOMPLETE', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.inputControlConfig, ...this.propControlConfig },
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.AUTOCOMPLETE', 'API.PROPERTY_GROUP.CHIP_LIST'),
        config: this.chipListPropControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.AUTOCOMPLETE', 'API.PROPERTY_GROUP.HINT'),
        config: this.hintPropControlConfig,
      },
    ];
  }

  private _fixedOptionsListFilterFn(options: InputOption[], value: string | null | undefined): InputOption[] {
    const filterValue = value?.toLowerCase() ?? '';
    return (options ?? [])
      .filter((option) => (option?.key as unknown as string).toLowerCase().includes(filterValue))
      .map((option) => ({ key: option.key, value: option.value }) as InputOption);
  }
}
