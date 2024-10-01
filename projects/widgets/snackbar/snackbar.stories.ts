import { IdsSnackbarService } from './services/snackbar.service';
import { IDS_SNACKBAR_DEFAULT_OPTIONS, IdsSnackbarDefaultOptions } from './snackbar-defaults';
import { IdsSnackbarComponent } from './snackbar.component';
import { SnackbarVariant } from './types/snackbar-variant.type';

import { selectControlOptions, injectInjectorToProps } from '../.storybook/utils';
import { IdsButtonComponent } from '../button';

import { A11yModule } from '@angular/cdk/a11y';
import { Injector } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';

function dynamicSnackbarOptionsFactory(args: Partial<IdsSnackbarDefaultOptions>): IdsSnackbarDefaultOptions {
  return {
    size: args && args.size ? args.size : 'comfortable',
    variant: args && args.variant ? args.variant : 'dark',
    position: args && args.position ? args.position : 'bottom-center',
    newestAtStartPosition: true,
    viewportMargin: 16,
  };
}

type StoryType = IdsSnackbarComponent;

export default {
  component: IdsSnackbarComponent,
  title: 'Components/Snackbar',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        IdsButtonComponent,
        A11yModule,
      ],
    }),
    applicationConfig({
      providers: [
        IdsSnackbarService,
        provideNoopAnimations(),
      ],
    }),
    injectInjectorToProps(),
  ],
  render: ({ ...props }) => ({
    props: {
      ...props,
      openSnackbar: (injector: Injector): void => {
        const snackbarService = injector.get(IdsSnackbarService);
        snackbarService.add({
          message: props.message,
          variant: props.variant,
          allowDismiss: props.allowDismiss,
          autoClose: props.autoClose,
          actions: props.actions,
          icon: props.icon,
          closeButtonLabel: props.closeButtonLabel,
          urgent: props.urgent,
        });
      },
    },
    template: `
      <button idsButton (click)="openSnackbar(injector)">Open Snackbar</button>
    `,
  }),
  argTypes: {
    message: {
      control: 'text',
    },
    variant: selectControlOptions(SnackbarVariant),
    allowDismiss: {
      control: 'boolean',
    },
    autoClose: {
      control: 'boolean',
    },
    actions: {
      control: 'object',
    },
    icon: {
      control: 'text',
    },
    closeButtonLabel: {
      control: 'text',
    },
    urgent: {
      control: 'boolean',
    },
    newestAtStartPosition: {
      control: 'boolean',
    },
    viewportMargin: {
      control: 'text',
    },
  },
  args: {
    message: 'This is a snackbar!',
    variant: 'dark',
    allowDismiss: true,
    autoClose: true,
    actions: [],
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Info: Story = {
  args: {
    variant: 'info',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Success: Story = {
  args: {
    variant: 'success',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Warning: Story = {
  args: {
    variant: 'warning',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Error: Story = {
  args: {
    variant: 'error',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WithActions: Story = {
  args: {
    variant: 'error',
    // eslint-disable-next-line no-console
    actions: [{ label: 'Log to console', action: () => console.log('This is a test') }],
    closeButtonLabel: 'Close',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BottomLeft: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: IDS_SNACKBAR_DEFAULT_OPTIONS,
          useFactory: () => dynamicSnackbarOptionsFactory({ position: 'bottom-left' }),
          deps: [],
        },
      ],
    }),
  ],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BottomRight: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: IDS_SNACKBAR_DEFAULT_OPTIONS,
          useFactory: () => dynamicSnackbarOptionsFactory({ position: 'bottom-right' }),
          deps: [],
        },
      ],
    }),
  ],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TopCenter: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: IDS_SNACKBAR_DEFAULT_OPTIONS,
          useFactory: () => dynamicSnackbarOptionsFactory({ position: 'top-center' }),
          deps: [],
        },
      ],
    }),
  ],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TopLeft: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: IDS_SNACKBAR_DEFAULT_OPTIONS,
          useFactory: () => dynamicSnackbarOptionsFactory({ position: 'top-left' }),
          deps: [],
        },
      ],
    }),
  ],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TopRight: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: IDS_SNACKBAR_DEFAULT_OPTIONS,
          useFactory: () => dynamicSnackbarOptionsFactory({ position: 'top-right' }),
          deps: [],
        },
      ],
    }),
  ],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Compact: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: IDS_SNACKBAR_DEFAULT_OPTIONS,
          useFactory: () => dynamicSnackbarOptionsFactory({ size: 'compact' }),
          deps: [],
        },
      ],
    }),
  ],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Comfortable: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: IDS_SNACKBAR_DEFAULT_OPTIONS,
          useFactory: () => dynamicSnackbarOptionsFactory({ size: 'comfortable' }),
          deps: [],
        },
      ],
    }),
  ],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Spacious: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: IDS_SNACKBAR_DEFAULT_OPTIONS,
          useFactory: () => dynamicSnackbarOptionsFactory({ size: 'spacious' }),
          deps: [],
        },
      ],
    }),
  ],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Dense: Story = {
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: IDS_SNACKBAR_DEFAULT_OPTIONS,
          useFactory: () => dynamicSnackbarOptionsFactory({ size: 'dense' }),
          deps: [],
        },
      ],
    }),
  ],
};

