import { IconButtonDemoService } from './icon-button-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-icon-button-demo',
  imports: [
    TryoutComponent,
    IdsIconButtonComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './icon-button-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './icon-button-demo.component.scss',
  ],
})
export class IconButtonDemoComponent {
  public iconButtonDemoService = inject(IconButtonDemoService);
}
