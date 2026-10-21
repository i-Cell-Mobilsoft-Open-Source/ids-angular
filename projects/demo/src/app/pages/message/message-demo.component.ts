import { MessageDemoTryoutComponent } from './message-demo-tryout.component';
import { MessageDemoService } from './message-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { MESSAGE_EXAMPLES } from '../../components-example/message/message-examples';
import { IdsExampleViewerComponent } from '../../shared/ids-example-viewer/ids-example-viewer.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-message-demo',
  imports: [
    DemoAndCodeComponent,
    TryoutComponent,
    TranslateModule,
    FormsModule,
    TryoutControlComponent,
    ControlTableComponent,
    IdsExampleViewerComponent,
    MessageDemoTryoutComponent,
  ],
  providers: [MessageDemoService],
  templateUrl: './message-demo.component.html',
  styleUrl: './message-demo.component.scss',
})
export class MessageDemoComponent {
  public readonly messageExamples = MESSAGE_EXAMPLES;

  protected _messageDemoService = inject(MessageDemoService);
}
