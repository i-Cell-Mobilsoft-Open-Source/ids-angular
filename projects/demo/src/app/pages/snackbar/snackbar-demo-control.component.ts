import { SnackbarDemoService } from './snackbar-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar-demo-control',
  imports: [
    TranslateModule,
    FormsModule,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './snackbar-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './snackbar-demo.component.scss',
  ],
})
export class SnackbarDemoControlComponent {
  public snackbarDemoService = inject(SnackbarDemoService);
  // private readonly _viewContainerRef = inject(ViewContainerRef);

  // public ngOnInit(): void {
  //   // 3. A VCR regisztrálása a service-ben
  //   this.snackbarDemoService.registerViewContainerRef(this._viewContainerRef);
  //   // Az alapértelmezett állapot beállítása
  //   this.snackbarDemoService.setActualViewContainer();
}
