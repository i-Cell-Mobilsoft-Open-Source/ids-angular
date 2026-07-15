import { Component } from '@angular/core';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/card-body.directive';
import { IdsCardMediaDirective } from '@i-cell/ids-angular/card/card-media.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-media-example',
  imports: [
    IdsCardComponent,
    IdsCardBodyDirective,
    IdsCardMediaDirective,
    TranslateModule,
  ],
  templateUrl: './card-media-example.component.html',
})
export class CardMediaExampleComponent {}
