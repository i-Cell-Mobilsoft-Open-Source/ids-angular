import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tryout',
  templateUrl: './tryout.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './tryout.component.scss',
})
export class TryoutComponent {
  public hasDarkBackground = input<boolean>(false);
}
