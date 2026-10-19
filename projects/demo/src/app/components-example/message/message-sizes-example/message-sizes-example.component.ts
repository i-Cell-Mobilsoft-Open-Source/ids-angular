import { Component } from '@angular/core';
import { IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-message-sizes-example',
  imports: [
    IdsHintMessageComponent,
    TranslateModule,
  ],
  templateUrl: './message-sizes-example.component.html',
})
export class MessageSizesExampleComponent {}
