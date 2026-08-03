import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY, IdsCheckboxVariant, IdsCheckboxVariantType } from '@i-cell/ids-angular/checkbox';
import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultGroupConfig = IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY();

type CheckboxGroupInputControls = {
  groupLabel: string;
  allowParent: boolean;
  parentLabel: string;
  size: IdsSizeType;
  variant: IdsCheckboxVariantType;
  orientation: IdsOrientationType;
  showAsterisk: boolean;
};

type CheckboxGroupHelperControls = {
  allowHint: boolean;
};

@Injectable()
export class CheckboxGroupDemoService {
  public formGroup = new FormGroup({
    toppings: new FormGroup(
      {
        cheese: new FormControl(false, []),
        ham: new FormControl(false, []),
        corn: new FormControl(false, []),
        mushrooms: new FormControl(false, []),
      },
      { validators: this._minimumCountSelectedValidator(2) },
    ),
    cheeses: new FormGroup(
      {
        cheddar: new FormControl(false, []),
        mozzarella: new FormControl(false, []),
        parmesan: new FormControl(false, []),
      },
      { validators: this._minimumCountSelectedValidator(1) },
    ),
  });

  private _minimumCountSelectedValidator(minimumCount: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;

      const checkedCount = Object.values(group.controls).filter((control) => control.value === true).length;

      return checkedCount >= minimumCount ? null : { minimumCountSelected: true };
    };
  }

  public readonly groupInputControlConfig: DemoControlConfig<CheckboxGroupInputControls> = {
    groupLabel: {
      description: 'Checkbox group\'s label.',
      type: 'string',
      default: '-',
      demoDefault: 'Options',
    },
    allowParent: {
      description: 'Whether to allow parent checkbox or not.',
      type: 'boolean',
      default: defaultGroupConfig.allowParent,
      control: DemoControl.SWITCH,
    },
    parentLabel: {
      description: 'Parent checkbox label.',
      type: 'string',
      default: '-',
      demoDefault: 'Parent options',
    },
    size: {
      description: 'Checkbox group size.',
      type: 'IdsSizeType',
      default: defaultGroupConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Checkbox group variant.',
      type: 'IdsCheckboxVariantType',
      default: defaultGroupConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsCheckboxVariant),
    },
    orientation: {
      description: 'Checkbox group variant.',
      type: 'IdsOrientationType',
      default: defaultGroupConfig.orientation,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOrientation),
    },
    showAsterisk: {
      description: 'Whether to show an asterisk before to the checkbox group label or not. IMPORTANT: This is only for display purposes.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<CheckboxGroupHelperControls> = {
    allowHint: {
      description: 'Allow hint message',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
  };

  public readonly methodControlConfig: DemoMethodConfig = [
    {
      name: 'selectAllChild()',
      description: 'Selects all child checkboxes in the checkbox-group.',
      returnType: 'void',
    },
    {
      name: 'deselectAllChild()',
      description: 'Deselects all child checkboxes in the checkbox-group.',
      returnType: 'void',
    },
  ];

  public defaults = getDefaultFromDemoConfig<CheckboxGroupInputControls>(this.groupInputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<CheckboxGroupHelperControls>(this.helperControlConfig);

  public model: CheckboxGroupInputControls = { ...this.defaults };
  public helperModel: CheckboxGroupHelperControls = { ...this.helperDefaults };

  public group = {
    toothBrushing: true,
    bath: true,
    sleep: false,
  };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };

    this.group = {
      toothBrushing: true,
      bath: true,
      sleep: false,
    };
  }

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.methodControlConfig];
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [this.groupInputControlConfig];
  }
}
