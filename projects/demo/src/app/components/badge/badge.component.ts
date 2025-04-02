import { Component, input } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon/icon.component';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent  {

  public state = input<'do' | 'dont' | undefined>();

}
