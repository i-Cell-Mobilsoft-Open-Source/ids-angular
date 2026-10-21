import { Component } from '@angular/core';
import { IdsErrorMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-message-error-example',
  imports: [
    IdsErrorMessageComponent,
    TranslateModule,
  ],
  templateUrl: './message-error-example.component.html',
})
export class MessageErrorExampleComponent {}
