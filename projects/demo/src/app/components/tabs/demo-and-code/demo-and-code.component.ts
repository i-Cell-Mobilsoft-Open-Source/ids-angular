import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'app-demo-and-code',
  standalone: true,
  imports: [
    IdsChipComponent,
    IdsCardComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsButtonComponent,
    CommonModule,

  ],
  templateUrl: './demo-and-code.component.html',
})
export class DemoAndCodeComponent {
  @Output() public resetDemo = new EventEmitter<void>();

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
