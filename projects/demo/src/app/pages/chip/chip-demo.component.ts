import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { IdsAvatarComponent } from '@i-cell/ids-angular/avatar';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { ChipAppearance, ChipAppearanceType, SizeType, SurfaceVariant, SurfaceVariantType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { mdiCamera, mdiClose } from '@mdi/js';

@Component({
  selector: 'app-chip-demo',
  standalone: true,
  imports: [
    UpperCasePipe,
    IdsChipComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsAvatarComponent,
  ],
  templateUrl: './chip-demo.component.html',
  styleUrl: './chip-demo.component.scss',
})
export class ChipDemoComponent {
  public label = 'Apple';
  public appearances: ChipAppearanceType[] = Object.values(ChipAppearance);
  public sizes: SizeType[] = [
    'dense',
    'compact',
    'comfortable',
    'spacious',
  ];

  public variants: SurfaceVariantType[] = Object.values(SurfaceVariant);
  public cameraIcon = mdiCamera;
  public closeIcon = mdiClose;
}
