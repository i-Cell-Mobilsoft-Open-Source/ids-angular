import { AbstractControl, ValidationErrors } from '@angular/forms';

function isEmptyInputValue(value: unknown): boolean {
  return (
    value == null || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0)
  );
}

export class IdsValidators {
  public static required(control: AbstractControl): ValidationErrors | null {
    return requiredValidator(control);
  }

  public static requiredTrue(control: AbstractControl): ValidationErrors | null {
    return requiredTrueValidator(control);
  }

  public static requiredFalse(control: AbstractControl): ValidationErrors | null {
    return requiredFalseValidator(control);
  }
}

export function requiredValidator(control: AbstractControl): ValidationErrors | null {
  return isEmptyInputValue(control.value) ? { required: true } : null;
}

export function requiredTrueValidator(control: AbstractControl): ValidationErrors | null {
  return control.value === true ? null : { requiredTrue: true };
}

export function requiredFalseValidator(control: AbstractControl): ValidationErrors | null {
  return control.value === false ? null : { requiredFalse: true };
}
