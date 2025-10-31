import { ScrollbarDemoService } from './scrollbar-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-scrollbar-demo',
  imports: [
    TryoutComponent,
    TranslateModule,
  ],
  templateUrl: './scrollbar-demo.component.html',
  styleUrl: './scrollbar-demo.component.scss',
})
export class ScrollbarDemoComponent {
  public scrollbarDemoService = inject(ScrollbarDemoService);
}
