import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-buttons',
  template: `
    <h1>Buttons</h1>
    <button mat-button>Click me!</button>
  `,
})
export class ButtonsComponent {
  // ...
}
