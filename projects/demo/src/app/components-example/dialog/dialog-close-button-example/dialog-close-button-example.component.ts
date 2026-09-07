import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsDialogComponent } from '@i-cell/ids-angular/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-close-button-example',
  imports: [
    IdsButtonComponent,
    IdsDialogComponent,
    TranslateModule,
  ],
  templateUrl: './dialog-close-button-example.component.html',
})
export class DialogCloseButtonExampleComponent {}
