import { MenuItem } from '../menu.interface';

import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ids-section-item',
  imports: [
    RouterModule,
    TranslateModule,
    IdsIconComponent,
    IdsIconButtonComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionItemComponent {
  public itemConfig = input.required<MenuItem>();
}
