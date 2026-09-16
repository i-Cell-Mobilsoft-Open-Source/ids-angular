import { Component } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsTagComponent } from '@i-cell/ids-angular/tag';

@Component({
  selector: 'app-tag-icons-example',
  imports: [
    IdsTagComponent,
    IdsIconComponent,
  ],
  templateUrl: './tag-icons-example.component.html',
})
export class TagIconsExampleComponent {}
