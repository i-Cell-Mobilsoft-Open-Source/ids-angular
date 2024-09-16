import { IdsDialogService } from './dialog.service';
import { IdsDialogHeaderDirective } from './ids-dialog-header.directive';
import { IdsDialogComponent } from './ids-dialog.component';

import { selectControlOptions } from '../.storybook/utils';
import { IdsButtonComponent } from '../button/ids-button.component';
import { Size } from '../core';

import { A11yModule } from '@angular/cdk/a11y';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, applicationConfig, argsToTemplate, StoryObj } from '@storybook/angular';

type StoryType = IdsDialogComponent & { dialogContent?: string, showCustomHeader?: boolean };

export default {
  component: IdsDialogComponent,
  title: 'Components/Dialog',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        IdsButtonComponent,
        IdsDialogHeaderDirective,
        A11yModule,
      ],
    }),
    applicationConfig({
      providers: [
        IdsDialogService,
        provideNoopAnimations(),
      ],
    }),
  ],
  render: ({ dialogContent, showCustomHeader, ...props }) => ({
    props: {
      ...props,
    },
    template: `
    <button type="button" idsButton appearance="filled" size="comfortable" variant="primary" (click)="dialog.open()">
      Open Dialog
    </button>
    <dialog 
      #dialog="idsDialog" 
      idsDialog 
      ${argsToTemplate(props)}
    > 
      @if (${showCustomHeader}) {
        <div *idsDialogHeader>
          <h2>This is a custom header!</h2>
        </div>
      }
      <div idsDialogContent>
       ${dialogContent}
      </div>
      <div idsDialogActions class="dialog-with-default-header">
        <button type="button" idsButton appearance="text" size="comfortable" variant="primary" (click)="dialog.close()">
          Cancel
        </button>
        <button
          type="button"
          idsButton
          appearance="filled"
          size="comfortable"
          variant="primary"
          (click)="dialog.close()"
        >
          OK
        </button>
      </div>
    </dialog>
  `,
  }),
  argTypes: {
    size: selectControlOptions(Size),
    mainTitle: { control: 'text' },
    subTitle: { control: 'text' },
    dialogContent: { control: 'text' },
    showCloseButton: { control: 'boolean' },
    showBackdrop: { control: 'boolean' },
    showCustomHeader: { control: 'boolean' },
  },
  args: {
    size: 'comfortable',
    mainTitle: 'Dialog Title',
    subTitle: 'Dialog Subtitle',
    dialogContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac suscipit neque.',
    showCloseButton: true,
    showBackdrop: true,
    showCustomHeader: false,
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CustomHeader: Story = {
  args: {
    showCustomHeader: true,
  },
};
