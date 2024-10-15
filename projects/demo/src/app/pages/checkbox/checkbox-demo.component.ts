import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { CheckboxVariant, CheckboxVariantType, IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY, IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY, IdsCheckboxComponent, IdsCheckboxGroupComponent } from '@i-cell/ids-angular/checkbox';
import { Orientation, OrientationType, Size, SizeType } from '@i-cell/ids-angular/core';
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
  allowHint: boolean,
  hintMessage: string,
  disabled: boolean,
  hasRequiredValidator: boolean,
};

type CheckboxGroupPublicApi = {
  groupLabel: string,
  allowParent: boolean,
  parentLabel: string,
  name: string,
  size: SizeType,
  variant: CheckboxVariantType,
  orientation: OrientationType,
};

const defaultConfig = IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY();
const defaultGroupConfig = IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [
    IdsCheckboxComponent,
    IdsCheckboxGroupComponent,
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
  public sizes = Object.values<SizeType>(Size);
  public variants = Object.values<CheckboxVariantType>(CheckboxVariant);
  public orientations = Object.values<OrientationType>(Orientation);

  public defaults: CheckboxPublicApi & CheckboxHelperControls = {
    readonly: false,
    size: defaultConfig.size,
    variant: defaultConfig.variant,
    disabled: false,
    label: 'I accept the terms and conditions',
    allowHint: true,
    hintMessage: 'Hint message',
    hasRequiredValidator: false,
  };

  public groupDefaults: CheckboxGroupPublicApi = {
    groupLabel: 'Everyday todos',
    allowParent: defaultGroupConfig.allowParent,
    parentLabel: 'Parent todo',
    name: 'todo',
    size: defaultGroupConfig.size,
    variant: defaultGroupConfig.variant,
    orientation: defaultGroupConfig.orientation,
  };

  public model: CheckboxPublicApi & CheckboxHelperControls = { ...this.defaults };
  
  public groupModel: CheckboxGroupPublicApi = { ...this.groupDefaults };
  
  public form = new FormGroup({
    unselected: new FormControl(false),
    indeterminate: new FormControl(false),
    selected: new FormControl(true),
  });

  public radioGroupForm = new FormGroup({
    toothBrushing: new FormControl(true),
    bath: new FormControl(true),
    sleep: new FormControl(true),
  });

  public ngOnInit(): void {
    this.setDisabledState(this.model.disabled);
    this.setRequiredValidator(this.model.hasRequiredValidator);
  }
  
  public reset(): void {
    this.model = { ...this.defaults };
    this.groupModel = { ...this.groupDefaults };
    this.setDisabledState(this.model.disabled);
    this.setRequiredValidator(this.model.hasRequiredValidator);
    this.form.reset({ unselected: false, indeterminate: false, selected: true });
    this.radioGroupForm.reset({ toothBrushing: true, bath: true, sleep: true });
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public setRequiredValidator(hasRequiredValidator: boolean): void {
    if (hasRequiredValidator) {
      this.form.controls.unselected.setValidators(IdsValidators.required);
      this.form.controls.indeterminate.setValidators(IdsValidators.required);
      this.form.controls.selected.setValidators(IdsValidators.required);
    } else {
      this.form.controls.unselected.clearValidators();
      this.form.controls.indeterminate.clearValidators();
      this.form.controls.selected.clearValidators();
    }

    this.form.controls.unselected.updateValueAndValidity();
    this.form.controls.indeterminate.updateValueAndValidity();
    this.form.controls.selected.updateValueAndValidity();
  }
}
