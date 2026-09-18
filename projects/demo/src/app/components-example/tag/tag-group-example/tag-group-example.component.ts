import { Component } from '@angular/core';
import { IdsTagComponent, IdsTagGroupComponent } from '@i-cell/ids-angular/tag';

@Component({
  selector: 'app-tag-group-example',
  imports: [
    IdsTagComponent,
    IdsTagGroupComponent,
  ],
  templateUrl: './tag-group-example.component.html',
})
export class TagGroupExampleComponent {}
