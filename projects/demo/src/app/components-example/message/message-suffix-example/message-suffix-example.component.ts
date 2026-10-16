import { Component } from '@angular/core';
import {
  IdsErrorMessageComponent,
  IdsHintMessageComponent,
  IdsMessageSuffixDirective,
  IdsSuccessMessageComponent,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-message-suffix-example',
  imports: [
    IdsErrorMessageComponent,
    IdsHintMessageComponent,
    IdsMessageSuffixDirective,
    IdsSuccessMessageComponent,
    TranslateModule,
  ],
  templateUrl: './message-suffix-example.component.html',
})
export class MessageSuffixExampleComponent {}
