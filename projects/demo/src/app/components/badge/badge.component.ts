import { Component, computed, input } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon/icon.component';

@Component({
  selector: 'app-badge',
  imports: [IdsIconComponent],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent  {

  public state = input<'do' | 'dont' | 'no_state' | undefined>();

  public bgClass = computed<string>(() => {
    switch (this.state()) {
      case 'do':
        return 'bg-ids-container-bg-success-default';
      case 'dont':
        return 'bg-ids-container-bg-error-default';
      case 'no_state':
        return '';
      default:
        return '';
    }
  });

}
