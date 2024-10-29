import { Component, input, output } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'app-tryout',
  standalone: true,
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  templateUrl: './tryout.component.html',
  styleUrl: './tryout.component.scss',
})
export class TryoutComponent {
  public title = input.required<string>();
  public hasDarkBackground = input<boolean>(false);

  public resetted = output<void>();

  protected _reset(): void {
    this.resetted.emit();
  }
}
