import { SnackbarDemoService } from './snackbar-demo.service';

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
  ],
  templateUrl: './snackbar-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './snackbar-demo.component.scss',
  ],
})
export class SnackbarDemoComponent implements OnInit {
  public snackbarDemoService = inject(SnackbarDemoService);
  private readonly _viewContainerRef = inject(ViewContainerRef);

  public ngOnInit(): void {

    this.snackbarDemoService.registerViewContainerRef(this._viewContainerRef);
  }
}
