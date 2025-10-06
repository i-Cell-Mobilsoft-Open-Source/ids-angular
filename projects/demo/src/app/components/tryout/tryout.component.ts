import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tryout',
  // imports: [
  //   IdsIconButtonComponent,
  //   IdsIconComponent,
  // ],
  templateUrl: './tryout.component.html',
  styleUrl: './tryout.component.scss',
})
export class TryoutComponent {
  // public title = input.required<string>();
  public hasDarkBackground = input<boolean>(false);

  // public resetted = output<void>();

  // protected _reset(): void {
  //   this.resetted.emit();
  // }
}
