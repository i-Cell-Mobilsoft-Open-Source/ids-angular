import { MessageDemoService } from './message-demo.service';

import { Component, DoCheck, inject, Injectable, signal } from '@angular/core';
import { IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IdsErrorMessageComponent,
  IdsFormFieldVariantType,
  IdsHintMessageComponent,
  IdsMessageSuffixDirective,
  IdsSuccessMessageComponent,
} from '@i-cell/ids-angular/forms';
import {
  IDS_MESSAGE_PARENT_FORM_FIELD,
  IdsMessageParentFormField,
} from '@i-cell/ids-angular/forms/components/message/types/message-parent-form-field';

@Injectable()
class DemoMessageState implements IdsMessageParentFormField {
  public size = signal<IdsSizeType>('compact');
  public variant = signal<IdsFormFieldVariantType>('surface');
  public disabled = signal<boolean>(false);
}

@Component({
  selector: 'app-message-demo-tryout',
  imports: [
    IdsErrorMessageComponent,
    IdsHintMessageComponent,
    IdsMessageSuffixDirective,
    IdsSuccessMessageComponent,
  ],
  templateUrl: './message-demo-tryout.component.html',
  providers: [
    DemoMessageState,
    {
      provide: IDS_MESSAGE_PARENT_FORM_FIELD,
      useExisting: DemoMessageState,
    },
  ],
})
export class MessageDemoTryoutComponent implements DoCheck {
  protected readonly _messageDemoService = inject(MessageDemoService);
  private readonly _demoMessageState = inject(DemoMessageState);

  public ngDoCheck(): void {
    this._demoMessageState.size.set(this._messageDemoService.model.size);
    this._demoMessageState.variant.set(this._messageDemoService.model.variant);
    this._demoMessageState.disabled.set(this._messageDemoService.inputModel.disabled);
  }
}
