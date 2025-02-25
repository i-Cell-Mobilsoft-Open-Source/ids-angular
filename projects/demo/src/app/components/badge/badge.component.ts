import { Badge } from '../../model/badge';

import { Component, Input } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon/icon.component';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent  implements  Badge  {

  @Input()
  public state: 'do' | 'dont' = 'do'; // ✅ Receive state from parent

}
