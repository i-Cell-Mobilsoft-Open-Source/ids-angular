import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tryout',
  templateUrl: './tryout.component.html',
  styleUrl: './tryout.component.scss',
})
export class TryoutComponent {

  public hasDarkBackground = input<boolean>(false);

}
