import { AvatarSizeExampleComponent } from './avatar-size-example/avatar-size-example.component';
import { AvatarVariantsExampleComponent } from './avatar-variants-example/avatar-variants-example.component';
import { AvatarWithIconExampleComponent } from './avatar-with-icon-example/avatar-with-icon-example.component';
import { AvatarWithImageExampleComponent } from './avatar-with-image-example/avatar-with-image-example.component';
import { AvatarWithInitialsExampleComponent } from './avatar-with-initials-example/avatar-with-initials-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const AVATAR_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'avatar-sizes',
    title: 'EXAMPLES.AVATAR.SIZES.TITLE',
    description: 'EXAMPLES.AVATAR.SIZES.DESCRIPTION',
    component: AvatarSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/avatar/avatar-size-example/avatar-size-example.component.html',
        TSpath: 'assets/examples/avatar/avatar-size-example/avatar-size-example.component.ts',
      },
    ],
  },
  {
    id: 'avatar-variants',
    title: 'EXAMPLES.AVATAR.VARIANTS.TITLE',
    description: 'EXAMPLES.AVATAR.VARIANTS.DESCRIPTION',
    component: AvatarVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/avatar/avatar-variants-example/avatar-variants-example.component.html',
        TSpath: 'assets/examples/avatar/avatar-variants-example/avatar-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'avatar-with-initials',
    title: 'EXAMPLES.AVATAR.INITIALS.TITLE',
    description: 'EXAMPLES.AVATAR.INITIALS.DESCRIPTION',
    component: AvatarWithInitialsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/avatar/avatar-with-initials-example/avatar-with-initials-example.component.html',
        TSpath: 'assets/examples/avatar/avatar-with-initials-example/avatar-with-initials-example.component.ts',
      },
    ],
  },
  {
    id: 'avatar-with-icon',
    title: 'EXAMPLES.AVATAR.ICONS.TITLE',
    description: 'EXAMPLES.AVATAR.ICONS.DESCRIPTION',
    component: AvatarWithIconExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/avatar/avatar-with-icon-example/avatar-with-icon-example.component.html',
        TSpath: 'assets/examples/avatar/avatar-with-icon-example/avatar-with-icon-example.component.ts',
      },
    ],
  },
  {
    id: 'avatar-with-image',
    title: 'EXAMPLES.AVATAR.IMAGES.TITLE',
    description: 'EXAMPLES.AVATAR.IMAGES.DESCRIPTION',
    component: AvatarWithImageExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/avatar/avatar-with-image-example/avatar-with-image-example.component.html',
        TSpath: 'assets/examples/avatar/avatar-with-image-example/avatar-with-image-example.component.ts',
      },
    ],
  },
];
