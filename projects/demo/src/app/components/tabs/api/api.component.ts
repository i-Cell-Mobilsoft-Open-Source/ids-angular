import { CURRENT_DEMO_SERVICE } from '../../../app.routes';
import { ComponentDetailsComponent } from '../../../pages/components/component-details/component-details.component';
import { MethodTableComponent } from '../../method-table/method-table.component';
import { PropTableComponent } from '../../prop-table/prop-table.component';

import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { TranslateService } from '@ngx-translate/core';

export interface IComponentDemoService {
  getApiConfig(): DemoApiControlConfig[];
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
  protected _propConfig: DemoApiControlConfig[] = [];
  protected _methodConfig: DemoMethodConfig[] = [];
  protected _methodTitles: string[] = [];

  private _service = inject(CURRENT_DEMO_SERVICE);

  private _componentDetails = inject(ComponentDetailsComponent);
  private _destroyRef = inject(DestroyRef);
  private _translate = inject(TranslateService);
  protected _lastModified = this._componentDetails.lastModified;

  public ngOnInit(): void {
    this._loadConfigs();
    this._translate.onLangChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this._loadConfigs());
  }

  private _loadConfigs(): void {
    this._methodConfig = this._service.getMethodConfig?.() ?? [];
    this._propConfig = this._service.getApiConfig();
    this._methodTitles = this._service.getMethodTitles?.() ?? [];
  }
}
