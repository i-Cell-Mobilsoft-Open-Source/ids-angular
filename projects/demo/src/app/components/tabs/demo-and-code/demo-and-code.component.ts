import { ComponentDetailsComponent } from '../../../pages/components/component-details/component-details.component';

import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
@Component({
  selector: 'app-demo-and-code',
  imports: [
    IdsChipComponent,
    IdsCardComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsButtonComponent,
  ],
  templateUrl: './demo-and-code.component.html',
})
export class DemoAndCodeComponent {
  @Output() public resetDemo = new EventEmitter<void>();

  private _componentDetails = inject(ComponentDetailsComponent);
  protected _lastModified = this._componentDetails.lastModified;

  public isOpen = signal(false);
  public isDark = signal(false);

  public toggleFooter(): void {
    this.isOpen.update((open) => !open);
  }

  public toggleDark(): void {
    this.isDark.update((dark) => !dark);
  }

  public onResetClick(): void {
    this.resetDemo.emit();
  }
}
