import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/card-body.directive';
import { IdsCardFooterDirective } from '@i-cell/ids-angular/card/card-footer.directive';
import { IdsCardHeaderComponent } from '@i-cell/ids-angular/card/card-header.component';
import { IdsCardMediaDirective } from '@i-cell/ids-angular/card/card-media.directive';
import { IdsCardSubtitleDirective } from '@i-cell/ids-angular/card/card-subtitle.directive';
import { IdsCardTitleDirective } from '@i-cell/ids-angular/card/card-title.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-full-composition-example',
  imports: [
    IdsCardComponent,
    IdsCardHeaderComponent,
    IdsCardTitleDirective,
    IdsCardSubtitleDirective,
    IdsCardMediaDirective,
    IdsCardBodyDirective,
    IdsCardFooterDirective,
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './card-full-composition-example.component.html',
})
export class CardFullCompositionExampleComponent {}
