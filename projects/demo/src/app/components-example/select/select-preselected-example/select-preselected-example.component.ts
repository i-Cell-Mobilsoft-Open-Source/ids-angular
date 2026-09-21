import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IdsFormFieldComponent,
  IdsHintMessageComponent,
  IdsLabelDirective,
  IdsOptionComponent,
} from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { delay, of } from 'rxjs';

const ASYNC_OPTIONS_DELAY_MS = 10000;

@Component({
  selector: 'app-select-preselected-example',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsOptionComponent,
    IdsHintMessageComponent,
    TranslateModule,
  ],
  templateUrl: './select-preselected-example.component.html',
})
export class SelectPreselectedExampleComponent implements OnInit {
  private readonly _translate = inject(TranslateService);

  public ngModelValue: string | null = 'APPLE';
  public formControlValue = new FormControl<string | null>('BANANA');
  public asyncNgModelValue: string | null = 'APPLE';
  public asyncFormControlValue = new FormControl<string | null>('BANANA');

  public asyncNgModelOptions = signal<readonly string[]>([]);
  public asyncFormControlOptions = signal<readonly string[]>([]);
  public asyncNgModelLoading = signal(true);
  public asyncFormControlLoading = signal(true);

  public ngOnInit(): void {
    this._loadAsyncOptions(this.asyncNgModelOptions, this.asyncNgModelLoading);
    this._loadAsyncOptions(this.asyncFormControlOptions, this.asyncFormControlLoading);
  }

  public getFruitLabel(key: string): string {
    return this._translate.instant(`EXAMPLES.SELECT.FRUITS.${key}`);
  }

  private _loadAsyncOptions(optionsSignal: WritableSignal<readonly string[]>, loadingSignal: WritableSignal<boolean>): void {
    of([
      'APPLE',
      'BANANA',
      'CHERRY',
      'GRAPE',
      'ORANGE',
    ])
      .pipe(delay(ASYNC_OPTIONS_DELAY_MS))
      .subscribe((keys) => {
        optionsSignal.set(keys);
        loadingSignal.set(false);
      });
  }
}
