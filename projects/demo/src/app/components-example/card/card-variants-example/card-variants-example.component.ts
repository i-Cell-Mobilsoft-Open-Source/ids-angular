import { Component } from '@angular/core';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/card-body.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-variants-example',
  imports: [
    IdsCardComponent,
    IdsCardBodyDirective,
    TranslateModule,
  ],
  templateUrl: './card-variants-example.component.html',
})
export class CardVariantsExampleComponent {}
