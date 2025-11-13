import { BadgeDemoService } from './badge-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { IdsBadgeDirective } from '@i-cell/ids-angular/badge';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-badge-demo',
  standalone: true,
  imports: [
    IdsBadgeDirective,
    IdsIconComponent,
    TryoutComponent,
    TranslatePipe,
  ],
  templateUrl: './badge-demo.component.html',
  styleUrl: './badge-demo.component.scss',
})
export class BadgeDemoComponent {
  public badgeDemoService = inject(BadgeDemoService);
}
