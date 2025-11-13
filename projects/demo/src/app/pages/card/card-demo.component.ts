import { CardDemoService } from './card-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/card-body.directive';
import { IdsCardFooterDirective } from '@i-cell/ids-angular/card/card-footer.directive';
import { IdsCardHeaderComponent } from '@i-cell/ids-angular/card/card-header.component';
import { IdsCardMediaDirective } from '@i-cell/ids-angular/card/card-media.directive';
import { IdsCardSubtitleDirective } from '@i-cell/ids-angular/card/card-subtitle.directive';
import { IdsCardTitleDirective } from '@i-cell/ids-angular/card/card-title.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-demo',
  imports: [
    TryoutComponent,
    IdsCardComponent,
    IdsCardHeaderComponent,
    IdsCardBodyDirective,
    IdsCardMediaDirective,
    IdsCardFooterDirective,
    IdsCardTitleDirective,
    IdsCardSubtitleDirective,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './card-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './card-demo.component.scss',
  ],
})
export class CardDemoComponent {
  public cardDemoService = inject(CardDemoService);
}
