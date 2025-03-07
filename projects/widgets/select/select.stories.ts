import { IdsSelectTriggerDirective } from './select-trigger.directive';
import { IdsSelectComponent } from './select.component';

import { selectControlOptions } from '../.storybook/utils';

import { FormsModule } from '@angular/forms';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsLabelDirective, IdsOptionComponent, IdsOptionGroupComponent, IdsSuccessMessageComponent } from '@i-cell/ids-angular/forms';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

// eslint-disable-next-line @stylistic/js/max-len
type StoryType = IdsSelectComponent & { size?: IdsSizeType, variant?: IdsFormFieldVariantType, 'aria-label': string, 'aria-labelledby': string };

const meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  component: IdsSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [
        IdsFormFieldComponent,
        IdsLabelDirective,
        IdsSelectComponent,
        IdsHintMessageComponent,
        IdsSuccessMessageComponent,
        IdsErrorMessageComponent,
        FormsModule,
        IdsOptionComponent,
        IdsOptionGroupComponent,
        IdsSelectTriggerDirective,
      ],
    }),
  ],
  parameters: {
    controls: {
      include: [
        'size',
        'variant',
        'placeholder',
        'required',
        'readonly',
        'aria-label',
        'aria-labelledby',
        'tabIndex',
        'typeaheadDebounceInterval',
      ],
    },
  },
  argTypes: {
    size: selectControlOptions(IdsSize),
    variant: selectControlOptions(IdsFormFieldVariant),
    placeholder: { control: 'text', type: 'string', description: 'Placeholder text' },
    required: { control: 'boolean', type: 'boolean', description: 'Wether the control is required' },
    readonly: { control: 'boolean', type: 'boolean', description: 'Wether the control is readonly' },
    'aria-label': { control: 'text', type: 'string', description: 'aria-label text' },
    'aria-labelledby': { control: 'text', type: 'string', description: 'aria-labelledby text' },
    tabIndex: { control: 'number', type: 'number', description: 'tabIndex number', min: -1, step: 1 },
    typeaheadDebounceInterval: {
      control: 'number', type: 'number', description: 'typeaheadDebounceInterval number in milliseconds', min: 0, step: 1,
    },
  },
  args: {
    size: 'comfortable',
    variant: 'surface',
    required: false,
    readonly: false,
    'aria-label': 'asda',
    'aria-labelledby': 'erfs',
    tabIndex: 0,
    typeaheadDebounceInterval: 100,
  },
} satisfies Meta<StoryType>;

export default meta;
type Story = StoryObj<StoryType>;

export const singleSelect: Story = {
  name: 'Single selection',
  args: {
    multiSelect: false,
    placeholder: 'Select an animal',
  },
  render: ({ size, variant, placeholder, ...props }) => {
    const singleSelectionValue = 'cat';
    return {
      props: { ...props, singleSelectionValue },
      template: `
        <ids-form-field size="${size}" variant="${variant}">
          <ids-label>Animal</ids-label>
          <ids-select placeholder="${placeholder}" [ngModel]="singleSelectionValue" ${argsToTemplate(props)}>
            <ids-option-group label="Land">
              <ids-option value="dog">Dog</ids-option>
              <ids-option value="cat">Cat</ids-option>
            </ids-option-group>
            <ids-option-group label="Aquatic">
              <ids-option value="crocodile">Crocodile</ids-option>
              <ids-option value="whale">Whale</ids-option>
            </ids-option-group>
          </ids-select>
          <ids-hint-message>Choose an animal</ids-hint-message>
          <ids-error-message>Animal is mandatory</ids-error-message>
        </ids-form-field>
      ` };
  },
};

export const multiSelect: Story = {
  name: 'Multi selection',
  args: {
    multiSelect: true,
    placeholder: 'Select animals',
  },
  render: ({ size, variant, placeholder, ...props }) => {
    const multiSelectionValue: string[] = [
      'cat',
      'whale',
    ];

    return {
      props: { ...props, multiSelectionValue },
      template: `
        <ids-form-field size="${size}" variant="${variant}">
          <ids-label>Animal</ids-label>
          <ids-select placeholder="${placeholder}" [(ngModel)]="multiSelectionValue" [multiSelect]="true" ${argsToTemplate(props)}>
            <ids-option-group label="Land">
              <ids-option value="dog">Dog</ids-option>
              <ids-option value="cat">Cat</ids-option>
            </ids-option-group>
            <ids-option-group label="Aquatic">
              <ids-option value="crocodile">Crocodile</ids-option>
              <ids-option value="whale">Whale</ids-option>
            </ids-option-group>
          </ids-select>
          <ids-hint-message>Choose animals</ids-hint-message>
          <ids-error-message>Animal is mandatory</ids-error-message>
        </ids-form-field>
      ` };
  },
};
