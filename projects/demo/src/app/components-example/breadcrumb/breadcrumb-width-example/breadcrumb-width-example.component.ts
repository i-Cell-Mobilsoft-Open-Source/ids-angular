import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsBreadcrumbComponent } from '@i-cell/ids-angular/breadcrumb';
import { TranslatePipe } from '@ngx-translate/core';

const DEFAULT_WIDTH = 800;
const DEFAULT_MAX_WIDTH = 1000;

@Component({
  selector: 'app-breadcrumb-width-example',
  imports: [
    IdsBreadcrumbComponent,
    FormsModule,
    TranslatePipe,
  ],
  templateUrl: './breadcrumb-width-example.component.html',
})
export class BreadcrumbWidthExampleComponent {
  public width = DEFAULT_WIDTH;
  public maxWidth = DEFAULT_MAX_WIDTH;
}
