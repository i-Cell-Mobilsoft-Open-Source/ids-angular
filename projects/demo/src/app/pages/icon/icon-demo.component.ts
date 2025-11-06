import { IconDemoService } from './icon-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon/icon.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-icon-demo',
  imports: [
    TryoutComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './icon-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './icon-demo.component.scss',
  ],
})
export class IconDemoComponent implements OnInit {

  public iconDemoService = inject(IconDemoService);

  public ngOnInit(): void {
    this.iconDemoService.loadIcons();
  }
}
