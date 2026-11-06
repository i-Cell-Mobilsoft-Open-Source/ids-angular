import { OverlayPanelAppearancesExampleComponent } from './overlay-panel-appearances-example/overlay-panel-appearances-example.component';
import { OverlayPanelBasicExampleComponent } from './overlay-panel-basic-example/overlay-panel-basic-example.component';
import { OverlayPanelMenuExampleComponent } from './overlay-panel-menu-example/overlay-panel-menu-example.component';
import { OverlayPanelSizesExampleComponent } from './overlay-panel-sizes-example/overlay-panel-sizes-example.component';
import { OverlayPanelVariantsExampleComponent } from './overlay-panel-variants-example/overlay-panel-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const OVERLAY_PANEL_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'overlay-panel-basic',
    title: 'EXAMPLES.OVERLAY_PANEL.BASIC.TITLE',
    description: 'EXAMPLES.OVERLAY_PANEL.BASIC.DESCRIPTION',
    component: OverlayPanelBasicExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/overlay-panel/overlay-panel-basic-example/overlay-panel-basic-example.component.html',
        TSpath: 'assets/examples/overlay-panel/overlay-panel-basic-example/overlay-panel-basic-example.component.ts',
      },
    ],
  },
  {
    id: 'overlay-panel-appearances',
    title: 'EXAMPLES.OVERLAY_PANEL.APPEARANCES.TITLE',
    description: 'EXAMPLES.OVERLAY_PANEL.APPEARANCES.DESCRIPTION',
    component: OverlayPanelAppearancesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/overlay-panel/overlay-panel-appearances-example/overlay-panel-appearances-example.component.html',
        TSpath: 'assets/examples/overlay-panel/overlay-panel-appearances-example/overlay-panel-appearances-example.component.ts',
      },
    ],
  },
  {
    id: 'overlay-panel-variants',
    title: 'EXAMPLES.OVERLAY_PANEL.VARIANTS.TITLE',
    description: 'EXAMPLES.OVERLAY_PANEL.VARIANTS.DESCRIPTION',
    component: OverlayPanelVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/overlay-panel/overlay-panel-variants-example/overlay-panel-variants-example.component.html',
        TSpath: 'assets/examples/overlay-panel/overlay-panel-variants-example/overlay-panel-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'overlay-panel-sizes',
    title: 'EXAMPLES.OVERLAY_PANEL.SIZES.TITLE',
    description: 'EXAMPLES.OVERLAY_PANEL.SIZES.DESCRIPTION',
    component: OverlayPanelSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/overlay-panel/overlay-panel-sizes-example/overlay-panel-sizes-example.component.html',
        TSpath: 'assets/examples/overlay-panel/overlay-panel-sizes-example/overlay-panel-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'overlay-panel-menu',
    title: 'EXAMPLES.OVERLAY_PANEL.MENU.TITLE',
    description: 'EXAMPLES.OVERLAY_PANEL.MENU.DESCRIPTION',
    component: OverlayPanelMenuExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/overlay-panel/overlay-panel-menu-example/overlay-panel-menu-example.component.html',
        TSpath: 'assets/examples/overlay-panel/overlay-panel-menu-example/overlay-panel-menu-example.component.ts',
      },
    ],
  },
];
