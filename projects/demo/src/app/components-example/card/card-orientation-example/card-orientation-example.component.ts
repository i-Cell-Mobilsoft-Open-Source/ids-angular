import { Component } from '@angular/core';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/card-body.directive';
import { IdsCardHeaderComponent } from '@i-cell/ids-angular/card/card-header.component';
import { IdsCardMediaDirective } from '@i-cell/ids-angular/card/card-media.directive';
import { IdsCardSubtitleDirective } from '@i-cell/ids-angular/card/card-subtitle.directive';
import { IdsCardTitleDirective } from '@i-cell/ids-angular/card/card-title.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-orientation-example',
  imports: [
    IdsCardComponent,
    IdsCardHeaderComponent,
    IdsCardBodyDirective,
    IdsCardMediaDirective,
    IdsCardTitleDirective,
    IdsCardSubtitleDirective,
    TranslateModule,
  ],
  templateUrl: './card-orientation-example.component.html',
})
export class CardOrientationExampleComponent {}
