import { CURRENT_DEMO_SERVICE } from '../../../app.routes';
import { ComponentDetailsComponent } from '../../../pages/components/component-details/component-details.component';
import { MethodTableComponent } from '../../method-table/method-table.component';
import { PropTableComponent } from '../../prop-table/prop-table.component';

import { Component, inject, OnInit } from '@angular/core';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';

export interface IComponentDemoService {
  getApiConfig(): DemoControlConfig<unknown>[];
  getMethodConfig?(): DemoMethodConfig[];
  getMethodTitles?(): string[];
}

@Component({
  selector: 'app-api',
  standalone: true,
  imports: [
    MethodTableComponent,
    PropTableComponent,
    IdsChipComponent,
  ],
  templateUrl: './api.component.html',
})
export class ApiComponent implements OnInit {
  protected _propConfig: unknown[] = [];
  protected _methodConfig: DemoMethodConfig[] = [];
  protected _methodTitles: string[] = [];

  private _service = inject(CURRENT_DEMO_SERVICE);

  private _componentDetails = inject(ComponentDetailsComponent);
  protected _lastModified = this._componentDetails.lastModified;

  public ngOnInit(): void {
    this._methodConfig = this._service.getMethodConfig?.() ?? [];
    this._propConfig = this._service.getApiConfig();
    this._methodTitles = this._service.getMethodTitles?.() ?? [];
  }
}
