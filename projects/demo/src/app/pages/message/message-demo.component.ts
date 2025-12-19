import { MessageDemoService } from './message-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { CommonModule } from '@angular/common';
import { Component, inject, Injectable, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsHintMessageComponent, IdsErrorMessageComponent, IdsSuccessMessageComponent, IdsErrorDefinitionDirective, IdsFormFieldVariantType, IdsFormFieldComponent, IdsMessageSuffixDirective } from '@i-cell/ids-angular/forms';
import { IDS_MESSAGE_PARENT_FORM_FIELD, IdsMessageParentFormField } from '@i-cell/ids-angular/forms/components/message/types/message-parent-form-field';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

@Injectable()
class DemoMessageState implements IdsMessageParentFormField {
  public size = signal<IdsSizeType>('compact');
  public variant = signal<IdsFormFieldVariantType>('surface');
  public disabled = signal<boolean>(false);
}

@Component({
  selector: 'app-message-demo',
  imports: [
    DemoAndCodeComponent,
    TryoutComponent,
    TranslateModule,
    FormsModule,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    IdsSuccessMessageComponent,
    IdsErrorDefinitionDirective,
    TryoutControlComponent,
    ControlTableComponent,
    IdsErrorDefinitionDirective,
    CommonModule,
    IdsMessageSuffixDirective,
  ],
  providers: [
    MessageDemoService,
    DemoMessageState,
    {
      provide: IDS_MESSAGE_PARENT_FORM_FIELD,
      useExisting: DemoMessageState,
    },
    {
      provide: IdsFormFieldComponent,
      useValue: {
        controlDir: signal({
          control: {
            status: 'INVALID',
            statusChanges: of('INVALID'),
            errors: { custom: true },
          },
        }),
      },
    },
  ],
  templateUrl: './message-demo.component.html',
  styleUrl: './message-demo.component.scss',
})
export class MessageDemoComponent {
  protected _messageDemoService = inject(MessageDemoService);

}
