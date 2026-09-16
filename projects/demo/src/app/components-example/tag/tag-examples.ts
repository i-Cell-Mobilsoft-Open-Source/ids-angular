import { TagAppearanceExampleComponent } from './tag-appearance-example/tag-appearance-example.component';
import { TagGroupExampleComponent } from './tag-group-example/tag-group-example.component';
import { TagIconsExampleComponent } from './tag-icons-example/tag-icons-example.component';
import { TagInteractiveExampleComponent } from './tag-interactive-example/tag-interactive-example.component';
import { TagSizesExampleComponent } from './tag-sizes-example/tag-sizes-example.component';
import { TagVariantsExampleComponent } from './tag-variants-example/tag-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const TAG_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'tag-appearances',
    title: 'EXAMPLES.TAG.APPEARANCES.TITLE',
    description: 'EXAMPLES.TAG.APPEARANCES.DESCRIPTION',
    component: TagAppearanceExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tag/tag-appearance-example/tag-appearance-example.component.html',
        TSpath: 'assets/examples/tag/tag-appearance-example/tag-appearance-example.component.ts',
      },
    ],
  },
  {
    id: 'tag-variants',
    title: 'EXAMPLES.TAG.VARIANTS.TITLE',
    description: 'EXAMPLES.TAG.VARIANTS.DESCRIPTION',
    component: TagVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tag/tag-variants-example/tag-variants-example.component.html',
        TSpath: 'assets/examples/tag/tag-variants-example/tag-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'tag-sizes',
    title: 'EXAMPLES.TAG.SIZES.TITLE',
    description: 'EXAMPLES.TAG.SIZES.DESCRIPTION',
    component: TagSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tag/tag-sizes-example/tag-sizes-example.component.html',
        TSpath: 'assets/examples/tag/tag-sizes-example/tag-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'tag-interactive',
    title: 'EXAMPLES.TAG.INTERACTIVE.TITLE',
    description: 'EXAMPLES.TAG.INTERACTIVE.DESCRIPTION',
    component: TagInteractiveExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tag/tag-interactive-example/tag-interactive-example.component.html',
        TSpath: 'assets/examples/tag/tag-interactive-example/tag-interactive-example.component.ts',
      },
    ],
  },
  {
    id: 'tag-icons',
    title: 'EXAMPLES.TAG.ICONS.TITLE',
    description: 'EXAMPLES.TAG.ICONS.DESCRIPTION',
    component: TagIconsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tag/tag-icons-example/tag-icons-example.component.html',
        TSpath: 'assets/examples/tag/tag-icons-example/tag-icons-example.component.ts',
      },
    ],
  },
  {
    id: 'tag-group',
    title: 'EXAMPLES.TAG.TAG_GROUP.TITLE',
    description: 'EXAMPLES.TAG.TAG_GROUP.DESCRIPTION',
    component: TagGroupExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tag/tag-group-example/tag-group-example.component.html',
        TSpath: 'assets/examples/tag/tag-group-example/tag-group-example.component.ts',
      },
    ],
  },
];
