import { Component } from '@angular/core';
import { IdsSuccessMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-message-success-example',
  imports: [
    IdsSuccessMessageComponent,
    TranslateModule,
  ],
  templateUrl: './message-success-example.component.html',
})
export class MessageSuccessExampleComponent {}
