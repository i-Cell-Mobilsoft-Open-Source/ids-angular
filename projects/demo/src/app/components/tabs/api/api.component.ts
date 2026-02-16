import { CURRENT_DEMO_SERVICE } from '../../../app.routes';
import { MethodTableComponent } from '../../method-table/method-table.component';

import { Component, inject, OnInit } from '@angular/core';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';

export interface IComponentDemoService {
  getApiConfig(): DemoControlConfig<unknown>[];
  getMethodConfig(): DemoMethodConfig<unknown>[];
}

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [MethodTableComponent],
  templateUrl: './api.component.html',
})
export class ApiComponent implements OnInit {
  protected _propConfig: unknown[] = [];
  protected _methodConfig: unknown[] = [];

  private _service = inject(CURRENT_DEMO_SERVICE);

  public ngOnInit(): void {
    this._methodConfig = this._service.getMethodConfig();
  }

}
