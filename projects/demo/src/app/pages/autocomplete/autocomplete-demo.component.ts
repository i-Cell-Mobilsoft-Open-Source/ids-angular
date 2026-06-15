import { AutocompleteDemoService } from './autocomplete-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, model, TemplateRef, untracked, viewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsDividerComponent } from '@i-cell/ids-angular/divider/public-api';
import {
  IdsAutocompleteChipListComponent,
  IdsAutocompleteComponent,
  IdsAutocompleteHintComponent,
  IdsAutocompleteTriggerDirective,
  IdsErrorDefinitionDirective,
  IdsErrorMessageComponent,
  IdsFormFieldComponent,
  IdsHintMessageComponent,
  IdsLabelDirective,
  IdsOptionComponent,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-accordion-demo',
  imports: [
    AsyncPipe,
    ControlTableComponent,
    DemoAndCodeComponent,
    FormsModule,
    IdsAutocompleteChipListComponent,
    IdsAutocompleteComponent,
    IdsAutocompleteHintComponent,
    IdsAutocompleteTriggerDirective,
    IdsDividerComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    IdsFormFieldComponent,
    IdsHintMessageComponent,
    IdsLabelDirective,
    IdsOptionComponent,
    TranslateModule,
    TryoutComponent,
    TryoutControlComponent,
  ],
  templateUrl: './autocomplete-demo.component.html',
  styleUrls: ['../demo-page.scss'],
})
export class AutocompleteDemoComponent {
  protected _autocompleteDemoService = inject(AutocompleteDemoService);
  protected _value = model();

  private _viewContainer = viewChild('container', { read: ViewContainerRef });
  private _template = viewChild('template', { read: TemplateRef<unknown> });

  constructor() {
    effect(() => {
      const multiSelect = this._autocompleteDemoService.multiSelectSignal();

      untracked(() => {
        this._value.set(multiSelect ? [] : null);
        this._viewContainer()?.clear();
        this._viewContainer()?.createEmbeddedView(this._template()!);
      });
    });
  }
}
