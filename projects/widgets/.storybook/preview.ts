import { applicationConfig, type Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { provideHttpClient } from '@angular/common/http';
import { IDS_ICON_DEFAULT_CONFIG, IdsIconDefaultOptions } from '@i-cell/ids-angular/icon';

setCompodocJson(docJson);

const iconDefaultConfig: IdsIconDefaultOptions = {
  iconAssetsPath: 'icons',
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true
    },
    layout: 'centered'
  },
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        { provide: IDS_ICON_DEFAULT_CONFIG, useValue: iconDefaultConfig },
      ]
    })
  ]
};

export default preview;
