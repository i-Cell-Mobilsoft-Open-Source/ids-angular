import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType } from '@i-cell/ids-angular/forms';
import { debounceTime, distinctUntilChanged, EMPTY, map, Observable, Subject } from 'rxjs';

const USER_INPUT_DEBOUNCE_TIME = 300;

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
  ariaLabelClearButton: string;
  ariaLabelToggleButton: string;
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
  private _resetSubject = new Subject<void>();
  public reset$ = this._resetSubject.asObservable();

  public readonly inputControlConfig: DemoControlConfig<AutocompleteInputControls> = {
    size: {
      description: 'Size of the auto complete field.',
      type: 'IdsSizeType',
      default: IdsSize.COMPACT,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the auto complete field.',
      type: 'IdsFormFieldVariantType',
      default: IdsFormFieldVariant.SURFACE,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
    disabled: {
      description: 'Whether the field is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    required: {
      description: 'Whether the field is required or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    multiSelect: {
      description: 'Whether the field allows multiple selections.',
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
    ariaLabelClearButton: {
      description: 'Aria label for the clear button',
      type: 'string',
      default: 'Clear',
    },
    ariaLabelToggleButton: {
      description: 'Aria label for the toggle button',
      type: 'string',
      default: 'Toggle',
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
      map((value) => this._fixedOptionsListFilterFn(OPTIONS, value)),
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

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [
      this.inputControlConfig,
      this.helperControlConfig,
    ];
  }

  private _fixedOptionsListFilterFn(options: InputOption[], value: string | null | undefined): InputOption[] {
    const filterValue = value?.toLowerCase() ?? '';
    return (options ?? [])
      .filter((option) => (option?.key as unknown as string).toLowerCase().includes(filterValue))
      .map((option) => ({ key: option.key, value: option.value }) as InputOption);
  }
}
