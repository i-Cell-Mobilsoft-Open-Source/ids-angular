import { Component } from '@angular/core';
import { IdsAvatarComponent, IdsAvatarImageDirective } from '@i-cell/ids-angular/avatar';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsPrefixDirective } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'app-chip-icon-example',
  imports: [
    IdsAvatarComponent,
    IdsAvatarImageDirective,
    IdsChipComponent,
    IdsPrefixDirective,
    IdsIconComponent,
    IdsIconButtonComponent,
  ],
  templateUrl: './chip-icon-example.component.html',
})
export class ChipIconExampleComponent {}
