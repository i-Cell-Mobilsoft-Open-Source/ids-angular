import { Component } from '@angular/core';
import { IdsDividerComponent } from '@i-cell/ids-angular/divider';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-divider-orientation-example',
  imports: [
    IdsDividerComponent,
    TranslateModule,
  ],
  templateUrl: './divider-orientation-example.component.html',
})
export class DividerOrientationExampleComponent {}
