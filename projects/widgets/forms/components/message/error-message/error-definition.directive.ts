import { IdsErrorMessageMapping } from '../types/error-message-mapping';

import { Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Directive to map an error message to an error code for a form field.
 * Mappings must be defined between the directive element's tags ordered by priority (descending from top to bottom).
 * The error code is provided as an attribute, while the error message will be this directive's text content.
 * The latter can be a plain string literal or even an interpolated string value.
 *
 * @example
 * ```html
 * <ids-form-field>
 *   <ids-label>Input field</ids-label>
 *   <input
 *     idsInput
 *     ngModel
 *     customValidator
 *     required
 *     [minlength]="3"
 *     [maxlength]="10"
 *     [pattern]="validPattern"
 *   >
 *   <ids-error-message>
 *     <ids-error-def code="required">{{ 'ERROR.REQUIRED.CUSTOM' | translate }}</ids-error-def>
 *     <ids-error-def code="minlength">'minLength' error message</ids-error-def>
 *     <ids-error-def code="maxlength">'maxLength' error message</ids-error-def>
 *     <ids-error-def code="pattern">'pattern' error message with interpolation: {{ model.value }}</ids-error-def>
 *     <ids-error-def code="custom">Custom validator error message</ids-error-def>
 *   </ids-error-message>
 * </ids-form-field>
 * ```
 */
@Directive({
  selector: 'ids-error-def',
})
export class IdsErrorDefinitionDirective {
  /**
   * The validation error's identifier code
   */
  public code = input.required<string>();

  private _elementRef = inject(ElementRef);

  /**
   * The validation error's message that will be presented to the user
   */
  get errorMessage(): string {
    return (this._elementRef.nativeElement as HTMLElement).innerText;
  }

  /**
   * Creates a IdsErrorMessageMapping instance based on this directive's state (code, errorMessage)
   * @returns A IdsErrorMessageMapping instance
   */
  public toErrorMessageMapping(): IdsErrorMessageMapping {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return {
      code: this.code(),
      message: () => self.errorMessage,
    };
  }
}
