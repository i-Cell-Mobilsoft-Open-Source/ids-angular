import { ComponentDetailsComponent } from '../../../pages/components/component-details/component-details.component';
import { ContentCardComponent } from '../../content-card/content-card.component';

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';

@Component({
  selector: 'app-guidelines',
  imports: [
    IdsChipComponent,
    ContentCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './guidelines.component.html',
})
export class GuidelinesComponent {
  private _componentDetails = inject(ComponentDetailsComponent);

  public componentBlocks = this._componentDetails.componentBlocks;
  protected _lastModified = this._componentDetails.lastModified;
}
