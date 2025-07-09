import { MenuConfig } from './menu.interface';
import { SectionItemComponent } from './section-item/section-item.component';
import { SectionTitleComponent } from './section-title/section-title.component';

import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ids-side-nav',
  imports: [
    RouterModule,
    TranslateModule,
    SectionItemComponent,
    SectionTitleComponent,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsSideNavComponent {
  public menu = input<MenuConfig>();
}
