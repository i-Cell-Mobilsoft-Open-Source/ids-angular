import { SnackbarDemoService } from './snackbar-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar-demo',
  imports: [
    TryoutComponent,
    IdsButtonComponent,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
  ],
  templateUrl: './snackbar-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './snackbar-demo.component.scss',
  ],
})
export class SnackbarDemoComponent implements OnInit {
  protected _snackbarDemoService = inject(SnackbarDemoService);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  public ngOnInit(): void {

    this._snackbarDemoService.registerViewContainerRef(this._viewContainerRef);
  }
}
