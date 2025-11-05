import { TagDemoService } from './tag-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsTagComponent, IdsTagGroupComponent } from '@i-cell/ids-angular/tag';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tag-demo',
  imports: [
    TryoutComponent,
    IdsTagComponent,
    IdsTagGroupComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './tag-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tag-demo.component.scss',
  ],
})
export class TagDemoComponent {
  public tagDemoService = inject(TagDemoService);
}
