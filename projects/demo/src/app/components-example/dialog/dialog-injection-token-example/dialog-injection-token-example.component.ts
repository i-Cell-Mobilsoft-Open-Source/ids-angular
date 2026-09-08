import { DialogInjectionTokenDynamicDialogComponent } from './dialog-injection-token-dynamic-dialog.component';
import { DIALOG_EXAMPLE_MESSAGE_TOKEN } from './dialog-injection-token.tokens';

import { Component, inject } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsDialogService } from '@i-cell/ids-angular/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-injection-token-example',
  imports: [
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './dialog-injection-token-example.component.html',
})
export class DialogInjectionTokenExampleComponent {
  private readonly _dialogService = inject(IdsDialogService);
  private readonly _translate = inject(TranslateService);

  public openDynamicDialog(): void {
    this._dialogService.open(DialogInjectionTokenDynamicDialogComponent, {
      providers: [
        {
          provide: DIALOG_EXAMPLE_MESSAGE_TOKEN,
          useValue: this._translate.instant('EXAMPLES.DIALOG.INJECTION_TOKEN.CONTENT.MESSAGE'),
        },
      ],
    }).subscribe();
  }
}
