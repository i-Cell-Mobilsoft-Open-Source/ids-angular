import { Component } from '@angular/core';
import { IdsBadgeDirective } from '@i-cell/ids-angular/badge';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'app-badge-icon-example',
  imports: [
    IdsBadgeDirective,
    IdsIconComponent,
  ],
  templateUrl: './badge-icon-example.component.html',
})
export class BadgeIconExampleComponent {}
