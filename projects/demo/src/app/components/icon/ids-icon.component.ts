import { Component, ViewEncapsulation, input } from '@angular/core';

@Component({
  selector: 'ids-icon',
  standalone: true,
  template: `<svg version="1.1" viewBox="0 0 24 24">
    <path [attr.d]="icon()" />
  </svg>`,
  styles: [
    `
      svg {
        color: currentColor;
        stroke: currentColor;
        fill: currentColor;
        display: inline-block;
        width: 1.5rem;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class IdsIconComponent {
  public icon = input.required<string>();
}
