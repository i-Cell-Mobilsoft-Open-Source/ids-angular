import { Component } from '@angular/core';
import { IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-message-hint-example',
  imports: [
    IdsHintMessageComponent,
    TranslateModule,
  ],
  templateUrl: './message-hint-example.component.html',
})
export class MessageHintExampleComponent {}
