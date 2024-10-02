import { UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { CheckboxVariant, CheckboxVariantType, IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY, IdsCheckboxComponent } from '@i-cell/ids-angular/checkbox';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsErrorMessageComponent, IdsHintMessageComponent, IdsValidators } from '@i-cell/ids-angular/forms';
import { IdsMessageSuffixDirective } from '@i-cell/ids-angular/forms/directives/message-suffix.directive';
import { TranslateModule } from '@ngx-translate/core';

type CheckboxPublicApi = {
  size: SizeType,
  variant: CheckboxVariantType,
  readonly: boolean,
};

type CheckboxHelperControls = {
  label: string,
  hintMessage: string,
  disabled: boolean,
  hasError: boolean,
};

const defaultConfig = IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [
    IdsCheckboxComponent,
    UpperCasePipe,
    ReactiveFormsModule,
    FormsModule,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    IdsMessageSuffixDirective,
    TranslateModule,
    IdsButtonComponent,
  ],
  templateUrl: './checkbox-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './checkbox-demo.component.scss',
  ],
})
export class CheckboxDemoComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(CheckboxVariant) as CheckboxVariantType[];

  public defaults: CheckboxPublicApi & CheckboxHelperControls = {
    readonly: false,
    size: defaultConfig.size,
    variant: defaultConfig.variant,
    disabled: false,
    label: 'I accept the terms and conditions',
    hintMessage: 'Hint message',
    hasError: false,
  };

  public model: CheckboxPublicApi & CheckboxHelperControls = { ...this.defaults };

  public form = new FormGroup({
    unselected: new FormControl(false),
    indeterminate: new FormControl(false),
    selected: new FormControl(true),
  });

  public disabledControl = new FormControl<boolean>(false);
  public hasErrorControl = new FormControl<boolean>(false);

  public ngOnInit(): void {
    this.disabledControl.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((disabled) => {
      if (disabled) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    });
    
    this.hasErrorControl.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((hasError) => {
      if (hasError) {
        this.form.controls.unselected.setValidators([IdsValidators.requiredTrue]);
        this.form.controls.indeterminate.setValidators([IdsValidators.requiredTrue]);
        this.form.controls.selected.setValidators([IdsValidators.requiredTrue]);
        this.form.controls.unselected.updateValueAndValidity();
        this.form.controls.indeterminate.updateValueAndValidity();
        this.form.controls.selected.updateValueAndValidity();
      } else {
        this.form.controls.unselected.clearValidators();
        this.form.controls.indeterminate.clearValidators();
        this.form.controls.selected.clearValidators();
        this.form.controls.unselected.updateValueAndValidity();
        this.form.controls.indeterminate.updateValueAndValidity();
        this.form.controls.selected.updateValueAndValidity();
      }
    });
  }
  
  public reset(): void {
    this.model = { ...this.defaults };
    this.form.controls.unselected.clearValidators();
    this.form.controls.indeterminate.clearValidators();
    this.form.controls.selected.clearValidators();
    this.form.reset({ unselected: false, indeterminate: false, selected: true });
    this.disabledControl.setValue(this.defaults.disabled);
    this.hasErrorControl.setValue(this.defaults.hasError);
  }
}
