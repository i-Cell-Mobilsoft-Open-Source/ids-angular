import { CURRENT_DEMO_SERVICE } from '../../../app.routes';
import { PropTableComponent } from '../../prop-table/prop-table.component';

import { Component, inject, OnInit } from '@angular/core';
import { DemoControlConfig } from '@demo-types/demo-control.type';

export interface IComponentDemoService {
  getApiConfig(): DemoControlConfig<unknown>[];
}

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [PropTableComponent],
  templateUrl: './api.component.html',
})
export class ApiComponent implements OnInit {
  protected _propConfig: unknown[] = [];

  private _service = inject(CURRENT_DEMO_SERVICE);

  public ngOnInit(): void {
    this._propConfig = this._service.getApiConfig();
  }

}
