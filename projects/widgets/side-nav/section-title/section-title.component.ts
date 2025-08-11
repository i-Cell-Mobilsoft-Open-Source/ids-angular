import { MenuItem } from '../menu.interface';

import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ids-section-title',
  imports: [
    TranslateModule,
    IdsIconComponent,
  ],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionTitleComponent {
  public titleConfig = input.required<MenuItem>();
}
