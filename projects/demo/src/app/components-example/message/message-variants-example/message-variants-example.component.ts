import { Component } from '@angular/core';
import { IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-message-variants-example',
  imports: [
    IdsHintMessageComponent,
    TranslateModule,
  ],
  templateUrl: './message-variants-example.component.html',
  styleUrl: './message-variants-example.component.scss',
})
export class MessageVariantsExampleComponent {}
